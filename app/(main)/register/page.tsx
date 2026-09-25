"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainRegisterPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth/register');
  }, [router]);

  return <div>Redirecting to register...</div>;
}
