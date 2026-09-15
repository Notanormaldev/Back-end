import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";
import { Authprovider } from "@/context/aurhcontext";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="p-10">
          <Authprovider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </Authprovider>
        </div>
      </body>
    </html>
  );
}
