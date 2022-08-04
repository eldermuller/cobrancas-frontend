import FormAddNameEmail from '../../components/FormAddNameEmail';
import FormAddSenha from '../../components/FormAddSenha';
import SucessCard from '../../components/SuccessCard';
import SignupStepper from '../../components/Stepper';
import useConsumer from '../../hooks/useConsumer';
import backButton from '../../assets/back_btn.svg'
import { useTransition, animated } from 'react-spring';
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
                    <div
                        className='signup-carousel'>
                        <FormAddNameEmail
                            handleNext={handleNext}
                            signupTinyErrorTransition={signupTinyErrorTransition}
                        />
                    </div>
                }
                {activeStep === 1 &&
                    <div
                        className='signup-carousel'>
                        <FormAddSenha
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            signupTinyErrorTransition={signupTinyErrorTransition}
                        />
                    </div>
                }
                {activeStep === 2 &&
                    <div className='signup-carousel' >
                        <SucessCard />
                    </div>
                }
                <SignupTab previousStep={previousStep} />
            </div>
        </div>
    )
}

export default SignUp;