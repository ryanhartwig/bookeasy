"use client";

import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => router.replace('/home/dashboard'), [router]);

  return <>
    <Header text="" loading />
  </>
}

export default Redirect;