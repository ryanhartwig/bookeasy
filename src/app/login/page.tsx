import Link from "next/link";
import { LocalLogin } from "./locallogin";

export default function Page() {

  return (
    <div>
      <LocalLogin />
      <br />
      <Link href="login/register">
        <p>New user? Click here to register.</p>
      </Link>
    </div>
  )
}