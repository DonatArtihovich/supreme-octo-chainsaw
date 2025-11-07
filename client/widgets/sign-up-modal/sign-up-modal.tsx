import { SignUpForm } from '@/features/user/ui/sign-up-form';
import { Modal } from '@/shared/ui/modal';

type SignUpModalProps = {
    closeModal: () => void;
}

export const SignUpModal = ({ closeModal }: SignUpModalProps) => {
    return (
        <Modal closeModal={closeModal}>
            <SignUpForm closeModal={closeModal} />
        </Modal>
    )
}