'use client';

import { signIn, signOut } from "next-auth/react";

export const Login = () => <button onClick={() => signIn()}>Sign in</button>
export const Logout = () => <button onClick={() => signOut()}>Sign out</button>