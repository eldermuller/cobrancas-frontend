import './style.css'
import useConsumer from '../../hooks/useConsumer'
import signupIconOne from '../../assets/signup_icon_one.svg'
import signupIconTwo from '../../assets/signup_icon_two.svg'
import signupIconThree from '../../assets/signup_icon_three.svg'

export default function SignupStepper() {
    const { activeStep } = useConsumer()
    const steps = [
        {
            id: 0,
            label: 'Cadastre-se',
            description: 'Por favor, escreva seu nome e e-mail'
        },
        {
            id: 1,
            label: 'Escolha uma senha',
            description: 'Escolha uma senha segura'
        },
        {
            id: 2,
            label: 'Cadastro realizado com sucesso',
            description: 'E-mail e senha cadastrados com sucesso'
        },
    ]

    function getIcon(id) {
        if (id === activeStep && activeStep !== 2) return signupIconOne
        if (id > activeStep && activeStep !== 2) return signupIconThree
        if (id < activeStep && activeStep !== 2) return signupIconTwo
        return signupIconTwo
    }

    function Step({ step }) {
        return (
            <div className='stepper-step'>
                <div className='stepper-content'>
                    <div className='icon-box'>
                        <img
                            src={getIcon(step.id)}
                            alt='step-icon'
                            className='stepper-icon'
                        />
                        {step.id !== 2 &&
                            <div className='horizontal-line'/>
                        }
                    </div>
                    <div className='text-box'>
                        <div className='stepper-label'>{step.label}</div>
                        <div className='stepper-description'>{step.description}</div>
                    </div>
                </div>
                {step.id !== 2 &&
                    <div className='vertical-line' />
                }

            </div>
        )
    }

    return (
        <div className='stepper-box'>
            {steps.map((step) => (
                <Step
                    key={step.id}
                    step={step}
                />
            ))
            }
        </div>
    )
}