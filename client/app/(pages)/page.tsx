'use client'

import { fetchUser } from '@/entities/user';
import { useAppDispatch } from '@/shared/lib';
import { DecksSection } from '@/widgets/decks-section';
import { RoomsSection } from '@/widgets/rooms-section';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <DecksSection />
      <RoomsSection />
    </>
  );
}
