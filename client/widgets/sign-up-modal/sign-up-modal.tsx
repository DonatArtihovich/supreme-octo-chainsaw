import { SignUpForm } from '@/features/user/ui/sign-up-form';
import { Modal } from '@/shared/ui/modal';

import cls from './sign-up-modal.module.scss';

type SignUpModalProps = {
  closeModal: () => void;
};

export const SignUpModal = ({ closeModal }: SignUpModalProps) => {
  return (
    <Modal className={cls.wrapper} closeModal={closeModal}>
      <SignUpForm closeModal={closeModal} />
    </Modal>
  );
};
