import FormAddNameEmail from '../../components/FormAddNameEmail';
import FormAddSenha from '../../components/FormAddSenha';
import SucessCard from '../../components/SuccessCard';
import SignupStepper from '../../components/Stepper';
import useConsumer from '../../hooks/useConsumer';
import backButton from '../../assets/back_btn.svg'
import { useTransition, animated, Spring } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useEffect, useState } from 'react';
import SignupTab from '../../components/SignupTab';

function SignUp() {
    const navigate = useNavigate()
    const {
        activeStep,
        setActiveStep,
        signupOk, setSignupOk,
        setSignupForm,
        errorMessage, setErrorMessage,
        topErrorTransition
    } = useConsumer()
    // const [loading, setLoading] = useState(true)
    const [previousStep, setPreviousStep] = useState(activeStep)

    const signupTinyErrorTransition = useTransition(errorMessage, {
        from: { right: '0rem', opacity: 0, top: '0.5rem' },
        enter: { right: '1.8rem', opacity: 1, top: '0.5rem' },
        leave: { right: '0rem', opacity: 0, top: '0.5rem' },
        config: { mass: 1, tension: 100, friction: 100, bounce: 4, duration: 100 }
    })

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handlePrevious = () => {
        setActiveStep(activeStep - 1)
    }


    // CÓDIGO BASE PARA UM LOADING
    // switch (document.readyState) {
    //     case 'loading':
    //         console.log('loading');
    //         break;
    //     case 'interactive':
    //         console.log('interactive');
    //         break;
    //     case 'complete':
    //         setTimeout(() => {
    //             setLoading(false)
    //         }, 4000)
    //         break;
    //     default:
    //         console.log('default')
    // }
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

    useEffect(() => {
        if (signupOk) {
            setSignupOk(false)
            setSignupForm({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            setTimeout(() => {
                setActiveStep(0)
                navigate('/');
            }, 5000);
        }
        return () => {
        }
    });

    return (
        <div className='container-sign-up'>
            {activeStep === 1 &&
                <img className='back-btn' onClick={handlePrevious} src={backButton} alt='back' />
            }
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
            <div className='content-vertical'>
                <SignupStepper previousStep={previousStep} setPreviousStep={setPreviousStep} />
            </div>
            <div className='content-dados'>
                {activeStep === 0 &&
                    <Spring
                        to={{ transform: 'scale(1)', opacity: 1 }}
                        from={{ transform: 'scale(0.97)', opacity: 0 }}
                        delay={0}
                        config={{ duration: 250 }}>
                        {style => (
                            <animated.div style={style} className='signup-carousel'>
                                <FormAddNameEmail
                                    handleNext={handleNext}
                                    signupTinyErrorTransition={signupTinyErrorTransition}
                                />
                            </animated.div>
                        )}
                    </Spring>
                }
                {activeStep === 1 &&
                    <Spring
                        to={{ transform: 'scale(1)', opacity: 1 }}
                        from={{ transform: 'scale(0.97)', opacity: 0 }}
                        delay={0}
                        config={{ duration: 250 }}>
                        {style => (
                            <animated.div style={style} className='signup-carousel'>
                                <FormAddSenha
                                    handleNext={handleNext}
                                    handlePrevious={handlePrevious}
                                    signupTinyErrorTransition={signupTinyErrorTransition}
                                />
                            </animated.div>
                        )}
                    </Spring>
                }
                {activeStep === 2 &&
                    <Spring
                        from={{ transform: 'scale(1)', opacity: 0 }}
                        delay={500}
                        to={{ transform: 'scale(0.97)', opacity: 1 }}
                        config={{ duration: 250 }}
                    >
                        {style => (
                            <animated.div style={style} className='signup-carousel'>
                                <SucessCard />
                            </animated.div>
                        )}
                    </Spring>
                }
                <SignupTab previousStep={previousStep} />
            </div>
        </div>
    )
}

export default SignUp;