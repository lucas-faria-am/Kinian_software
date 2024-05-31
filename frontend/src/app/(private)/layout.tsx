import SideMenu from "@/components/SideMenu";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SideMenu />
        {children}
      </body>
    </html>
  );
}
