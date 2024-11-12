export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-6 rounded-lg">{children}</div>
}
