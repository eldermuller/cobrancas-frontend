import useConsumer from '../../hooks/useConsumer';
import './style.css';

function SignupTab() {

    const { activeStep } = useConsumer()

    return (
        <div className='container-tab'>
            <div className={activeStep === 0 ? 'green' : 'grey'} />
            <div className={activeStep === 1 ? 'green' : 'grey'} />
            <div className={activeStep === 2 ? 'green' : 'grey'} />
        </div>
    )
}

export default SignupTab;