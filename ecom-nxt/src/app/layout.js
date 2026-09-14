import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/themeprovider";




export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       
        <div className="p-10">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >  <Nav/>
            {children}
          </ThemeProvider>
          </div></body>
    </html>
  );
}
