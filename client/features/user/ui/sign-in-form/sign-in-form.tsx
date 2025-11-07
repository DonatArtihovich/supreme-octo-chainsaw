import { Form } from "@/widgets/form"
import { FormEventHandler, useCallback } from "react"

type SignInFormProps = {
    closeModal: () => void;
}

export const SignInForm = ({ closeModal }: SignInFormProps) => {
    const onSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        closeModal();
    }, []);

    return (
        // <Form
        //     headerText="TBD"
        //     submitText="Submit"
        //     onSubmit={onSubmit}
        // >
        <></>
        // </Form>
    )
}