'use client';

import { signOut } from "next-auth/react";

export const Logout = () => <p onClick={() => signOut()}>Logout</p>