import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="home-layout">
      {/* Agar koi common header/sidebar/wrapper chahiye home pages ke liye toh yahan add kar sakte hain */}
      {children}
    </div>
  );
}
