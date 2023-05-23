'use client';

import { useUser } from "@/app/Providers";
import { Header } from "@/components/Header";
import { TeamsView } from "./teamsView";


export default function Page() {
  const { id } = useUser();
  return (
    <>
      <Header text="Teams" />
      <TeamsView userId={id} />
    </>
  )
}