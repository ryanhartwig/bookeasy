'use client';

import { signOut } from "next-auth/react";

export const Logout = () => <p onClick={() => signOut({callbackUrl: '/'})}>Logout</p>