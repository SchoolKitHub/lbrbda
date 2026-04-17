import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectID = "385403";

  if (!apiKey) {
    return NextResponse.json({ error: "Backend configuration missing" }, { status: 500 });
  }

  try {
    // Fetch recent events from PostHog
    const response = await fetch(
      `https://us.i.posthog.com/api/projects/${projectID}/events/?limit=50`,
      {
        headers: { 
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 10 } // Cache for 10 seconds
      }
    );

    if (!response.ok) {
        const error = await response.text();
        console.error("PostHog API Error:", error);
        return NextResponse.json({ error: "Upstream failure" }, { status: response.status });
    }

    const data = await response.json();
    
    // Distill unique visitors from the last 50 events
    const visitorsMap = new Map();
    
    data.results.forEach((event: any) => {
      const distinctId = event.distinct_id;
      if (!visitorsMap.has(distinctId)) {
        const props = event.properties || {};
        
        visitorsMap.set(distinctId, {
          id: distinctId.slice(0, 8),
          ip: props.$ip || '0.0.0.0',
          country: props.$country_name || 'Unknown',
          countryCode: props.$country_code || 'UN',
          device: props.$device_type === 'mobile' ? 'Mobile' : props.$device_type === 'tablet' ? 'Tablet' : 'Desktop',
          browser: props.$browser || 'Browser',
          os: props.$os || 'OS',
          lastActive: formatTimeAgo(event.timestamp),
          status: isRecentlyActive(event.timestamp) ? 'online' : 'idle'
        });
      }
    });

    return NextResponse.json(Array.from(visitorsMap.values()));
  } catch (e) {
    console.error("Analytics Route Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function formatTimeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1m ago';
  return `${minutes}m ago`;
}

function isRecentlyActive(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  return diff < 300000; // 5 minutes
}
