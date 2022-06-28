import { useEffect, useState } from 'react';
import eyeClose from '../../assets/closed_eye.svg';
import eyeOpen from '../../assets/open_eye.svg';
import backButton from '../../assets/back_btn.svg'
import useConsumer from '../../hooks/useConsumer';
import { animated } from 'react-spring'
import './style.css';
import api from '../../services/api';
import SignupTab from '../SignupTab'

function FormAddSenha({ handleNext, handlePrevious, signupTinyErrorTransition }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

    const {
        signupForm, setSignupForm,
        passwordError, setPasswordError,
        passwordConfError, setPasswordConfError,
        clearInputError,
        errorMessage, setErrorMessage,
        setSignupOk,
        topErrorTransition,
        toLogin
    } = useConsumer()

    async function handleSubmit(e) {
        e.preventDefault();
        let formOk = true
        if (!signupForm.password) {
            setPasswordError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!signupForm.confirmPassword) {
            setPasswordConfError('Este campo deve ser preenchido')
            formOk = false
        }

        if (signupForm.password !== signupForm.confirmPassword) {
            setPasswordConfError('As senhas não coincidem')
            formOk = false
        }

        if (!formOk) { return }

        setPasswordError('')
        setPasswordConfError('')

        try {
            await api.post('/cadastro-usuario', {
                nome: signupForm.name,
                email: signupForm.email,
                senha: signupForm.password
            });
            setSignupOk(true)
            handleNext();

        } catch (error) {
            setErrorMessage(error.response.data)
        }

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
        <div className='container-add-senha'>
            {topErrorTransition((appear, errorMessage) =>
                errorMessage &&
                <animated.span
                    style={appear}
                    className='error-message'
                >
                    {errorMessage}
                </animated.span>

            )}
            {signupTinyErrorTransition((appear, errorMessage) =>
                errorMessage &&
                <animated.span
                    style={appear}
                    className='tiny-error-message'
                >
                    {errorMessage}
                </animated.span>
            )
            }
            <img className='signup--back-btn' onClick={handlePrevious} src={backButton} alt='back' />
            <form
                onSubmit={handleSubmit}
            >
                <h1>Escolha uma senha</h1>
                <div className='content-password'>
                    <label htmlFor='input-password'>Senha*</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='********'
                        value={signupForm.password}
                        onChange={handleChangeForm}
                        style={passwordError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    <img
                        src={showPassword ? eyeOpen : eyeClose}
                        alt='exibir senha'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    {passwordError &&
                        <span className='warning-message'>{passwordError}</span>
                    }
                </div>
                <div className='content-repeat'>
                    <label htmlFor='input-repeat'>Repetir a senha*</label>
                    <input
                        type={showPasswordRepeat ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder='********'
                        value={signupForm.confirmPassword}
                        onChange={handleChangeForm}
                        style={passwordConfError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    <img
                        src={showPasswordRepeat ? eyeOpen : eyeClose}
                        alt='exibir senha'
                        onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                    />
                    {passwordConfError &&
                        <span className='warning-message'>{passwordConfError}</span>
                    }
                </div>
                <div className='content-entrar'>
                    <button
                        className='signup-pink-btn'
                    >
                        Entrar
                    </button>

                    <div className='content-login'>
                        Já possui uma conta? Faça seu <span
                            onClick={() => toLogin()}
                        >Login</span>

                    </div>
                </div>
            </form>
            <SignupTab />
        </div >
    )
}

export default FormAddSenha;