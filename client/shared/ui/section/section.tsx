import { ReactNode } from "react";
import cls from './section.module.scss'
import { mergeClasses } from "@/shared/lib";

type PageSectionProps = {
    header: string;
    children: ReactNode;
    className?: string;
};

export const PageSection = ({
    header,
    children,
    className
}: PageSectionProps) => {
    return (
        <section
            className={mergeClasses(cls.wrapper, className)}
        >
            <h2 className={cls.header}>
                {header}
            </h2>
            {children}
        </section>
    )
}