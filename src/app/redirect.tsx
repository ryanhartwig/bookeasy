"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./page";

const Redirect = () => {
  const router = useRouter();
  useEffect(() => router.replace('/login'), [router]);
  return <Loading />
}

export default Redirect;