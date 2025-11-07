import { SignInForm } from '@/features/user/ui/sign-in-form';
import { Modal } from '@/shared/ui/modal';

type SignInModalProps = {
    closeModal: () => void;
}

export const SignInModal = ({ closeModal }: SignInModalProps) => {
    return (
        <Modal closeModal={closeModal}>
            <SignInForm closeModal={closeModal} />
        </Modal>
    )
}