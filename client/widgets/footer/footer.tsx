import Image, { type StaticImageData } from 'next/image'
import cls from './footer.module.scss'
import octoImage from '@/assets/images/supreme-octo-chainsaw.webp'
import githubIcon from '@/assets/images/github.webp'
import instagramIcon from '@/assets/images/instagram.webp'
import telegramIcon from '@/assets/images/telegram.webp'
import Link from 'next/link'
import { Path } from '@/shared/const/path'

type FooterLink = {
    href: string;
    icon: StaticImageData;
    alt: string;
};

const footerLinks: FooterLink[] = [
    { href: 'https://github.com/DonatArtihovich', icon: githubIcon, alt: 'GitHub' },
    { href: 'https://www.instagram.com/oniuzhesovsehscheley', icon: instagramIcon, alt: 'Instagram' },
    { href: 'https://t.me/sillyrustacean', icon: telegramIcon, alt: 'Telegram' },
];

export const PageFooter = () => {
    return (
        <footer className={cls.wrapper}>
            <nav className={cls.footerNav}>
                <Link href={'/' as Path}>
                    <Image
                        className={cls.octoImage}
                        src={octoImage}
                        alt='Supreme Octo Chainsaw'
                        draggable={false}
                    />
                </Link>

                <ul className={cls.footerLinksList}>
                    {footerLinks.map(link => (
                        <li key={link.alt}>
                            <Link href={link.href} target={'_blank'}>
                                <Image
                                    className={cls.footerIcon}
                                    src={link.icon}
                                    alt={link.alt}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className={cls.footerText}>2025</p>
            </nav>
        </footer>
    )
}