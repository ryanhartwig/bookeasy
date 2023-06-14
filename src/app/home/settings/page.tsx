import { Header } from "@/components/Header";
import Loading from "./loading";
import { SettingsView } from "./settingsView";

export default function Page() {

  return (
    <>
      <Header text="Settings" />
      <SettingsView />
    </>
  )
}