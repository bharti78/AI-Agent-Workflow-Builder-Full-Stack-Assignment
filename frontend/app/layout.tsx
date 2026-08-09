import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { OrgProvider } from "@/lib/org-context";
import "./globals.css";

export const metadata = {
  title: "AI Agent Workflow Builder",
  description: "Chain AI-agent workflow steps with approval gates.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <OrgProvider>{children}</OrgProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
