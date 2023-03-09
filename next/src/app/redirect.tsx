"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => router.replace('/dashboard'), [router]);

  return <></>
}

export default Redirect;