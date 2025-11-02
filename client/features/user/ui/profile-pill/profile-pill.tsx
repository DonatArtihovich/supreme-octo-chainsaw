import Image from 'next/image'
import cls from './profile-pill.module.scss'
import defaultAvatarIcon from '@/assets/images/default-avatar.png'
import { trimText } from '@/shared/lib';

export const ProfilePill = () => {
    const username = 'MarkMarkMark';

    return (
        <button className={cls.wrapper}>
            <div className={cls.avatarWrapper}>
                <Image
                    className={cls.avatarIcon}
                    src={defaultAvatarIcon}
                    alt={username}
                />
            </div>
            <p className={cls.userName}>{trimText(username, 10)}</p>
        </button>
    )
}