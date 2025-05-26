import type { Metadata } from "next";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoreDemo - Your Trusted Online Store",
  description: "Quality products at great prices. Shop with confidence at StoreDemo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
