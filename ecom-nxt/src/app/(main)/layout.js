import Nav from "@/components/Nav";

export default function MainLayout({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
