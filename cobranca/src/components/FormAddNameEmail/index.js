import useConsumer from '../../hooks/useConsumer';
import api from '../../services/api';
import { animated, useTransition } from 'react-spring'
import { useEffect } from 'react';
import './style.css';

function FormAddNameEmail({ handleNext, signupTinyErrorTransition }) {
    const {
        signupForm,
        setSignupForm,
        nameError, setNameError,
        emailError, setEmailError,
        clearInputError, toLogin,
        errorMessage, setErrorMessage,
        inputErrorTransition,
        topErrorTransition, activeStep
    } = useConsumer()

    const nameErrorTransition = useTransition(nameError, inputErrorTransition)
    const emailErrorTransition = useTransition(emailError, inputErrorTransition)

    async function handleSubmit(e) {
        e.preventDefault();
        let formOk = true

        if (!signupForm.name) {
            setNameError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!signupForm.email) {
            setEmailError('Este campo deve ser preenchido')
            formOk = false
        }


        if (!formOk) { return }

        setNameError('')
        setEmailError('')

        try {
            await api.post('/validar-email', {
                nome: signupForm.name,
                email: signupForm.email
            })

            handleNext();
        } catch (error) {
            return setErrorMessage(error.response.data)
        }
        handleNext()
    }


    function handleChangeForm({ target }) {
        clearInputError(target.name)
        setSignupForm({ ...signupForm, [target.name]: target.value });
    }



    useEffect(() => {

        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage('')
            }, 2000)
        }
        return () => {
        }
        // eslint-disable-next-line
    }, [errorMessage])

    return (
        <div className='container-add-name'>
            <animated.form
                onSubmit={handleSubmit}
            >
                <h1>Adicione seus dados</h1>
                <div className='content-name'>
                    <label>Nome*</label>
                    <input
                        className='input-name--signup input-global'
                        type='text'
                        name='name'
                        placeholder='Digite seu nome'
                        value={signupForm.name}
                        onChange={handleChangeForm}
                        style={nameError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {nameErrorTransition((styles, nameError) => (
                        <animated.span style={styles} className='warning-message'>{nameError}</animated.span>
                    ))}
                </div>
                <div className='content-email'>
                    <label>E-mail*</label>
                    <input
                        className='input-email--signup input-global'
                        type='text'
                        name='email'
                        placeholder='Digite seu e-mail'
                        value={signupForm.email}
                        onChange={handleChangeForm}
                        style={emailError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {emailErrorTransition((styles, emailError) => (
                        emailError &&
                        <animated.span style={styles} className='warning-message'>{emailError}</animated.span>
                    ))}

                </div>

                <div className='content-continue'>
                    <button
                        className='signup-pink-btn'
                    >
                        Continuar
                    </button>

                    <div className='content-login'>
                        J?? possui uma conta? Fa??a seu <span
                            onClick={() => toLogin()}
                        >Login</span>
                    </div>
                </div>
            </animated.form >
        </div >
    )
}

export default FormAddNameEmail;