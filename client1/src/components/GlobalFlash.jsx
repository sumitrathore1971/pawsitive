import React from 'react';
import FlashMessage from './FlashMessage.jsx';
import { useAuth } from '@/hooks/useAuth';

export default function GlobalFlash() {
  const { flashMessage } = useAuth();
  return (
    <FlashMessage
      message={flashMessage?.message}
      type={flashMessage?.type}
    />
  );
}


