'use client'
import { type Path, pathsWithoutFooter, pathsWithoutHeader } from "@/shared/const/path";
import { PageFooter } from "@/shared/ui/footer";
import { PageHeader } from "@/shared/ui/header";
import { usePathname } from "next/navigation";
import { ReactNode } from "react"

type PageLayoutProps = {
    children: ReactNode,
};

export default function PageLayout({ children }: PageLayoutProps) {
    const path = usePathname() as Path;

    return (
        <>
            {!pathsWithoutHeader.includes(path) && <PageHeader />}
            {children}
            {!pathsWithoutFooter.includes(path) && <PageFooter />}
        </>
    )
}