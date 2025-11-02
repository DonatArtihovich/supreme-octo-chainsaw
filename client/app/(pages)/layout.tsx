'use client'
import { pathsWithoutHeader } from "@/shared/const/path";
import { PageHeader } from "@/shared/ui/header";
import { usePathname } from "next/navigation";
import { ReactNode } from "react"

type PageLayoutProps = {
    children: ReactNode,
};

export default function PageLayout({ children }: PageLayoutProps) {
    const path = usePathname();

    return (
        <>
            {!pathsWithoutHeader.includes(path) && <PageHeader />}
            {children}
        </>
    )
}