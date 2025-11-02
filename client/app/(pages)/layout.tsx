'use client'
import { type Path, pathsWithoutFooter, pathsWithoutHeader } from "@/shared/const/path";
import { PageFooter } from "@/shared/ui/footer";
import { PageHeader } from "@/shared/ui/header";
import { usePathname } from "next/navigation";
import { ReactNode } from "react"
import cls from './layout.module.scss'
import { Provider } from "react-redux";
import store from "@/app/store";

type PageLayoutProps = {
    children: ReactNode,
};

export default function PageLayout({ children }: PageLayoutProps) {
    const path = usePathname() as Path;

    return (
        <Provider store={store}>
            {!pathsWithoutHeader.includes(path) && <PageHeader />}
            <main className={cls.wrapper}>
                {children}
            </main>
            {!pathsWithoutFooter.includes(path) && <PageFooter />}
        </Provider>
    )
}