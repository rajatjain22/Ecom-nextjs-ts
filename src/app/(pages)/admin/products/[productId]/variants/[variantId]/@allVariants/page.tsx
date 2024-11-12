import Link from "next/link";
import React from "react";

async function page({ params }: any) {
  await new Promise((resolve) => setTimeout(resolve, 3000)); 
  
  return (
    <div>
      <Link href="1">Link 1</Link>
      <br />
      <Link href="2">Link 2</Link>
      <br />
      <Link href="3">Link 3</Link>
      <br />
      <Link href="4">Link 4</Link>
    </div>
  );
}

export default page;
