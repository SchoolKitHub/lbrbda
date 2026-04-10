import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics Dashboard | LBRBDA 50th Anniversary",
  description: "Live activity explorer and session insights for the LBRBDA Jubilee platform.",
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="analytics-layout">
      {children}
    </div>
  );
}
