'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ProfilePill } from '@/features/user/ui/profile-pill';
import { headerPaths } from '@/shared/const/path';
import { mergeClasses } from '@/shared/lib';

import cls from './header.module.scss';

export const PageHeader = () => {
  const pathname = usePathname();

  return (
    <header className={cls.wrapper}>
      <nav>
        <ul className={cls.headerList}>
          {headerPaths.map((path) => (
            <li key={path[0]} className={cls.headerListItem}>
              <Link
                href={path[0]}
                className={mergeClasses(
                  cls.headerLink,
                  pathname == path[0] && cls.headerLinkActive,
                )}
              >
                {path[1]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ProfilePill />
    </header>
  );
};
