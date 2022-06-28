import useConsumer from '../../hooks/useConsumer';
import api from '../../services/api';
import SignupTab from '../SignupTab';
import { animated } from 'react-spring'
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
        topErrorTransition
    } = useConsumer()

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
            {topErrorTransition((appear, errorMessage) =>
                errorMessage &&
                <animated.span
                    style={appear}
                    className='error-message signup-error-message'
                >
                    {errorMessage}
                </animated.span>

            )}
            {signupTinyErrorTransition((appear, errorMessage) =>
                errorMessage &&
                <animated.span
                    style={appear}
                    className='signup-tiny-error-message'
                >
                    {errorMessage}
                </animated.span>
            )}
            <form
                onSubmit={handleSubmit}
            >
                <h1>Adicione seus dados</h1>
                <div className='content-name'>
                    <label htmlFor='input-password'>Nome*</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Digite seu nome'
                        value={signupForm.name}
                        onChange={handleChangeForm}
                        style={emailError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {nameError &&
                        <span className='warning-message'>{nameError}</span>
                    }
                </div>
                <div className='content-email'>
                    <label htmlFor='input-repeat'>E-mail*</label>
                    <input
                        type='text'
                        name='email'
                        placeholder='Digite seu e-mail'
                        value={signupForm.email}
                        onChange={handleChangeForm}
                        style={emailError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {emailError &&
                        <span className='warning-message'>{emailError}</span>
                    }
                </div>

                <div className='content-continue'>
                    <button
                        className='signup-pink-btn'
                    >
                        Continuar
                    </button>

                    <div className='content-login'>
                        Já possui uma conta? Faça seu <span
                            onClick={() => toLogin()}
                        >Login</span>
                    </div>
                </div>
            </form>
            <SignupTab />
        </div>
    )
}

export default FormAddNameEmail;