import './style.css'
import useConsumer from '../../hooks/useConsumer'
import signupIconOne from '../../assets/signup_icon_one.svg'
import signupIconTwo from '../../assets/signup_icon_two.svg'
import signupIconThree from '../../assets/signup_icon_three.svg'
import { useEffect, useState } from 'react';
import { animated, Spring, easings } from 'react-spring'

export default function SignupStepper({ previousStep, setPreviousStep }) {

    const pulse = async (next) => {
        await next({ transform: 'scale(1.2)' })
        await next({ transform: 'scale(1)' })
    }
    const fastPulse = { duration: 300, easing: easings.easeOutCirc }
    const slowPulse = { duration: 500, easing: easings.easeOutBack }
    const { activeStep } = useConsumer()
    const [steps, setSteps] = useState([
        {
            id: 0,
            label: 'Cadastre-se',
            description: 'Por favor, escreva seu nome e e-mail',
            icon: signupIconOne,
            delay: null,
            config: null,
            pulse: null,
            barHeight: { height: '0%' }
        },
        {
            id: 1,
            label: 'Escolha uma senha',
            description: 'Escolha uma senha segura',
            icon: signupIconThree,
            delay: null,
            config: null,
            pulse: null,
            barHeight: { height: '0%' }
        },
        {
            id: 2,
            label: 'Cadastro realizado com sucesso',
            description: 'E-mail e senha cadastrados com sucesso',
            icon: signupIconThree,
            delay: null,
            config: null,
            pulse: null,
            barHeight: { height: '0%' }
        }
    ])

    function changeStep() {
        if (activeStep === 0 && previousStep === 1) {
            setSteps([
                {
                    ...steps[0],
                    icon: signupIconOne,
                    delay: 500,
                    config: slowPulse,
                    pulse: pulse,
                    barHeight: { height: '0%' }
                },
                {
                    ...steps[1],
                    icon: signupIconThree,
                    delay: 0,
                    config: fastPulse,
                    pulse: pulse
                },
                { ...steps[2] }
            ])
            return setPreviousStep(activeStep)
        }
        if (activeStep === 1 && previousStep === 0) {
            setSteps([
                {
                    ...steps[0],
                    icon: signupIconTwo,
                    delay: 0,
                    config: fastPulse,
                    pulse: pulse,
                    barHeight: { height: '100%' }
                },
                {
                    ...steps[1],
                    icon: signupIconOne,
                    delay: 500,
                    config: slowPulse,
                    pulse: pulse
                },
                { ...steps[2] }
            ])
            return setPreviousStep(activeStep)
        }
        if (activeStep === 2) {
            setSteps([
                { ...steps[0] },
                {
                    ...steps[1],
                    icon: signupIconTwo,
                    delay: 0,
                    config: fastPulse,
                    pulse: pulse,
                    barHeight: { height: '100%' }
                },
                {
                    ...steps[2],
                    icon: signupIconTwo,
                    delay: 500,
                    config: slowPulse,
                    pulse: pulse
                }
            ])
            return setPreviousStep(activeStep)
        }

    }

    function cleanConfigs() {
        setSteps([
            {
                ...steps[0],
                pulse: null,
                config: null
            },
            {
                ...steps[1],
                pulse: null,
                config: null
            },
            {
                ...steps[2],
                pulse: null,
                config: null
            },
        ])
    }

    useEffect(() => {
        cleanConfigs()
        //eslint-disable-next-line
    }, [previousStep])

    useEffect(() => {
        changeStep()
        // eslint-disable-next-line
    }, [activeStep])

    return (
        <div className='stepper-box'>
            {steps.map((step) => (
                <div className='stepper-box-two' key={step.id}>
                    <div className='stepper-icons'>
                        <Spring
                            delay={step.delay}
                            config={step.config}
                            to={step.pulse} from={{ transform: 'scale(1)' }}
                        >
                            {styles => (
                                <animated.img
                                    className='stepper-checks'
                                    style={styles}
                                    src={step.icon} alt='step' />
                            )}
                        </Spring>
                        {step.id < 2 &&
                            <div className='stepper-bar-div'>
                                <div className='stepper-bar-outline'>
                                    <div className='stepper-bar' style={step.barHeight} />
                                </div>
                            </div>
                        }
                    </div>
                    <div className='stepper-texts'>
                        <div className='stepper-labels title-3-bold'>{step.label}</div>
                        <div className='stepper-contents subtitle-1'>{step.description}</div>
                    </div>
                </div>
            ))}


        </div >
    );
}