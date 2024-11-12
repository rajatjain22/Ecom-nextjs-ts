export default function Layout({
  allVariants,
  children,
}: {
  allVariants: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {allVariants}
      {children}
    </>
  );
}
