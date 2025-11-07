'use client';

import { useEffect } from 'react';

import { fetchUser } from '@/entities/user';
import { useAppDispatch } from '@/shared/lib';
import { DecksSection } from '@/widgets/decks-section';
import { RoomsSection } from '@/widgets/rooms-section';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <DecksSection />
      <RoomsSection />
    </>
  );
}
