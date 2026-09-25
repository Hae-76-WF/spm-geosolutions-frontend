"use client";

import React, { Suspense } from 'react';
import { ResetPasswordView } from '@/views/auth/ResetPasswordView';

export default function AuthResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading password reset page...</div>}>
      <ResetPasswordView />
    </Suspense>
  );
}
