import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { animated, useTransition } from 'react-spring'
import eyeClose from '../../assets/closed_eye.svg';
import eyeOpen from '../../assets/open_eye.svg';
import useConsumer from '../../hooks/useConsumer';
import api from '../../services/api';
import { setItem } from '../../utils/storage';
import HomeData from '../HomeData';
import './style.css';

const defaultForm = {
    email: '',
    password: ''
}

function FormLogin() {
    const {
        loginForm, setLoginForm,
        emailError, setEmailError,
        passwordError, setPasswordError,
        clearInputError,
        errorMessage, setErrorMessage,
        user, setUser,
        topErrorTransition,
        setActiveStep,
        setSignupForm,
        setDashboardContainer
    } = useConsumer()

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        let formOk = true
        if (!loginForm.email) {
            setEmailError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!loginForm.password) {
            setPasswordError('Este campo deve ser preenchido')
            formOk = false
        }

        if (!formOk) { return }

        setEmailError('')
        setPasswordError('')
        try {
            const response = await api.post('/login', {
                email: loginForm.email,
                senha: loginForm.password
            });

            setUser({
                ...user,
                name: response.data.user,
                email: loginForm.email
            })
            setLoginForm(defaultForm);
            setDashboardContainer(<HomeData />)
            setItem('token', response.data.token);
            setItem('userName', response.data.user)
            navigate('/home');

        } catch (error) {
            setErrorMessage(error.response.data)
        }

    }

    function handleChangeForm({ target }) {
        clearInputError(target.name);
        setLoginForm({ ...loginForm, [target.name]: target.value });
    }

    const loginTinyErrorTransition = useTransition(errorMessage, {
        from: { justifyContent: 'flex-end', opacity: 0, top: '8rem' },
        enter: { justifyContent: 'center', opacity: 1, top: '8rem' },
        leave: { justifyContent: 'flex-end', opacity: 0, top: '8rem' },
        config: { mass: 1, tension: 100, friction: 100, bounce: 4, duration: 100 }
    })

    function toSignup() {
        setSignupForm({ name: '', email: '', password: '', confirmPassword: '' })
        setActiveStep(0)
        clearInputError('name')
        clearInputError('email')
        clearInputError('password')
        clearInputError('confirmPassword')
        navigate('/signup')
    }

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage('')
            }, 2000)
        }
        // eslint-disable-next-line
    }, [errorMessage])

    return (
        <div className='container-login'>
            {topErrorTransition((appear, errorMessage) =>
                errorMessage &&
                <animated.span
                    style={appear}
                    className='error-message'
                >
                    {errorMessage}
                </animated.span>
            )}
            {loginTinyErrorTransition((appear, errorMessage) =>
                errorMessage &&
                <animated.span
                    style={appear}
                    className='tiny-error-message'
                >
                    {errorMessage}
                </animated.span>
            )}
            <form
                onSubmit={handleSubmit}
            >
                <h1>Faça seu login!</h1>
                <div className='content-login-email'>
                    <label htmlFor='email'>Email*</label>
                    <input
                        type='text'
                        name='email'
                        placeholder='Digite seu e-mail'
                        value={loginForm.email}
                        onChange={handleChangeForm}
                        style={emailError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {emailError &&
                        <span className='warning-message'>{emailError}</span>
                    }
                </div>
                <div className='content-login-password'>
                    <div className='content-login-label'>
                        <label htmlFor='password'>Senha*</label>
                        <span>Esqueceu a senha?</span>
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Digite sua senha'
                        value={loginForm.password}
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

                <div className='content-login-enter'>
                    <button
                        className='signup-pink-btn'
                    >Entrar
                    </button>
                    <div className='content-login-login'>
                        Ainda não possui uma conta? <span
                            onClick={() => toSignup()}
                        >
                            Cadastre-se
                        </span>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default FormLogin;