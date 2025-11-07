'use client';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import store from '@/app/store';
import { type Path, pathsWithoutFooter, pathsWithoutHeader } from '@/shared/const/path';
import { PageFooter } from '@/widgets/footer';
import { PageHeader } from '@/widgets/header';

import cls from './layout.module.scss';

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const path = usePathname() as Path;

  return (
    <Provider store={store}>
      {!pathsWithoutHeader.includes(path) && <PageHeader />}
      <main className={cls.wrapper}>{children}</main>
      {!pathsWithoutFooter.includes(path) && <PageFooter />}
    </Provider>
  );
}
