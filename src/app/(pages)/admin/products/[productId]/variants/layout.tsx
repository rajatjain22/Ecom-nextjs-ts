export default async function Layout({
  team,
  children,
}: {
  team: React.ReactNode;
  children: React.ReactNode;
}) {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  return (
    <>
      {team}
      {children}
    </>
  );
}
