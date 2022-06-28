import FormAddNameEmail from '../../components/FormAddNameEmail';
import FormAddSenha from '../../components/FormAddSenha';
import SucessCad from '../../components/SuccessCard';
import SignupStepper from '../../components/Stepper';
import useConsumer from '../../hooks/useConsumer';
import { useTransition } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useEffect } from 'react';

function SignUp() {
    const navigate = useNavigate()
    const {
        activeStep,
        setActiveStep,
        signupOk, setSignupOk,
        setSignupForm,
        errorMessage
    } = useConsumer()

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
            <div className='content-vertical'>
                <SignupStepper />
            </div>
            <div className='content-dados'>
                {
                    activeStep === 0 &&
                    <FormAddNameEmail
                        handleNext={handleNext}
                        signupTinyErrorTransition={signupTinyErrorTransition}

                    />
                }
                {
                    activeStep === 1 &&
                    <FormAddSenha
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        signupTinyErrorTransition={signupTinyErrorTransition}
                    />
                }
                {
                    activeStep === 2 &&
                    <SucessCad />
                }
            </div>
        </div>
    )
}

export default SignUp;