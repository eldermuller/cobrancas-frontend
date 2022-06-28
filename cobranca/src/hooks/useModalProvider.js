import { useState } from "react";

function useModalProvider() {

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
    const [nameModalError, setNameModalError] = useState('')
    const [emailModalError, setEmailModalError] = useState('')
    const [passwordModalError, setPasswordModalError] = useState('')
    const [descriptionModalError, setDescriptionModalError] = useState('')
    const [paymentModalError, setPaymentModalError] = useState('')
    const [valueModalError, setValueModalError] = useState('')
    const [passwordConfModalError, setPasswordConfModalError] = useState('')
    const [cpfModalError, setCpfModalError] = useState('')
    const [phoneModalError, setPhoneModalError] = useState('')



    function clearModalInputError(value) {
        if (value === 'name') { return setNameModalError('') }
        if (value === 'email') { return setEmailModalError('') }
        if (value === 'cpf') { return setCpfModalError('') }
        if (value === 'phone') { return setPhoneModalError('') }
        if (value === 'password') { return setPasswordModalError('') }
        if (value === 'confirm-password') { return setPasswordConfModalError('') }
        if (value === 'description') { return setDescriptionModalError('') }
        if (value === 'payment') { return setPaymentModalError('') }
        if (value === 'value') { return setValueModalError('') }
    }

    return {
        showPassword, setShowPassword,
        showPasswordConfirmation, setShowPasswordConfirmation,
        nameModalError, setNameModalError,
        emailModalError, setEmailModalError,
        passwordModalError, setPasswordModalError,
        passwordConfModalError, setPasswordConfModalError,
        cpfModalError, setCpfModalError,
        phoneModalError, setPhoneModalError,
        clearModalInputError,
        descriptionModalError, setDescriptionModalError,
        paymentModalError, setPaymentModalError,
        valueModalError, setValueModalError,

    }
}

export default useModalProvider