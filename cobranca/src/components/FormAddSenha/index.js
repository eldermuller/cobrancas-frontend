import { useEffect, useState } from 'react';
import eyeClose from '../../assets/closed_eye.svg';
import eyeOpen from '../../assets/open_eye.svg';
import useConsumer from '../../hooks/useConsumer';
import { animated, useSpring, useTransition } from 'react-spring'
import './style.css';
import api from '../../services/api';

function FormAddSenha({ handleNext, signupTinyErrorTransition }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

    const {
        signupForm, setSignupForm,
        inputErrorTransition,
        passwordError, setPasswordError,
        passwordConfError, setPasswordConfError,
        clearInputError,
        errorMessage, setErrorMessage,
        setSignupOk,
        toLogin, dissolveSpring
    } = useConsumer()

    const passwordErrorTransition = useTransition(passwordError, inputErrorTransition)
    const passwordConfErrorTransition = useTransition(passwordConfError, inputErrorTransition)
    const dissolveCard = useSpring(dissolveSpring)
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
        <animated.div style={dissolveCard} className='container-add-senha'>

            <animated.form
                onSubmit={handleSubmit}
            >
                <animated.h1>Escolha uma senha</animated.h1>
                <animated.div className='content-password'>
                    <animated.label htmlFor='input-password'>Senha*</animated.label>
                    <animated.input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='********'
                        value={signupForm.password}
                        onChange={handleChangeForm}
                        style={passwordError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    <animated.img
                        src={showPassword ? eyeOpen : eyeClose}
                        alt='exibir senha'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    {passwordErrorTransition((styles, passwordError) => (
                        passwordError &&
                        <animated.span style={styles} className='warning-message'>{passwordError}</animated.span>
                    ))}
                </animated.div>
                <animated.div className='content-repeat'>
                    <animated.label htmlFor='input-repeat'>Repetir a senha*</animated.label>
                    <animated.input
                        type={showPasswordRepeat ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder='********'
                        value={signupForm.confirmPassword}
                        onChange={handleChangeForm}
                        style={passwordConfError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    <animated.img
                        src={showPasswordRepeat ? eyeOpen : eyeClose}
                        alt='exibir senha'
                        onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                    />
                    {passwordConfErrorTransition((styles, passwordConfError) => (
                        passwordConfError &&
                        <animated.span style={styles} className='warning-message'>{passwordConfError}</animated.span>
                    ))}
                </animated.div>
                <animated.div className='content-entrar'>
                    <animated.button
                        className='signup-pink-btn'
                    >
                        Entrar
                    </animated.button>

                    <animated.div className='content-login'>
                        Já possui uma conta? Faça seu <animated.span
                            onClick={() => toLogin()}
                        >Login</animated.span>

                    </animated.div>
                </animated.div>
            </animated.form>
        </animated.div >
    )
}

export default FormAddSenha;