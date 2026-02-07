import { Header } from "@/app/component/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 overflow-hidden">
      <Header />
      <div className="flex-1 flex items-center justify-center overflow-auto">
        {children}
      </div>
    </div>
  );
}
