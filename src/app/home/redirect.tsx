"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => router.replace('/home/dashboard'), [router]);

  return <Loading />
}

export default Redirect;