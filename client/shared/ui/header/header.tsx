'use client'

import Link from "next/link";
import cls from "./header.module.scss"
import { headerPaths } from "@/shared/const/path";
import { usePathname } from "next/navigation";
import { mergeClasses } from "@/shared/lib/classnames";

export const PageHeader = () => {
    const pathname = usePathname();

    return (
        <div className={cls.wrapper}>
            <ul className={cls.headerList}>
                {headerPaths.map(path =>
                    <li
                        key={path[0]}
                        className={cls.headerListItem}
                    >
                        <Link
                            href={path[0]}
                            className={mergeClasses(cls.headerLink, pathname == path[0] && cls.headerLinkActive)}
                        >
                            {path[1]}
                        </Link>
                    </li>)}
            </ul>
        </div>
    );
}