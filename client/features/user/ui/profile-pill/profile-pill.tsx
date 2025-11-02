import Image from 'next/image'
import cls from './profile-pill.module.scss'
import defaultAvatarIcon from '@/assets/images/default-avatar.webp'
import { trimText, useAppSelector } from '@/shared/lib';
import { IUser, userSelector } from '@/entities/user';

export const ProfilePill = () => {
    const user = useAppSelector(userSelector);

    return (
        user ? (
            <button className={cls.wrapper}>
                <div className={cls.avatarWrapper}>
                    <Image
                        className={cls.avatarIcon}
                        src={defaultAvatarIcon}
                        alt={user.name}
                    />
                </div>
                <p className={cls.userName}>{trimText(user.name, 10)}</p>
            </button>
        ) :
            (
                <div className={cls.signButtonsWrapper}>
                    <button className={cls.signButton}>Sign in</button>
                    <button className={cls.signButton}>Sign Up</button>
                </div>
            )
    )
}