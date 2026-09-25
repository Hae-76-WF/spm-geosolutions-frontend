"use client";

import React, { Suspense } from 'react';
import { VerifyEmailView } from '@/views/auth/VerifyEmailView';

export default function AuthVerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading verification page...</div>}>
      <VerifyEmailView />
    </Suspense>
  );
}
