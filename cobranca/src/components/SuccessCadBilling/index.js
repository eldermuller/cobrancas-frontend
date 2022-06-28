import './style.css';
import { useNavigate } from 'react-router-dom'
import feedbackIcon from '../../assets/feedback_icon.svg';
import feedbackClose from '../../assets/feedback_close_icon.svg';



function SuccessCadBilling() {
    const navigate = useNavigate();

    function handleToLogin() {
        navigate('/')
    }


    return (
        <div className='container-sucess-billing'>
            <div className='content-sucess-billing'>
                <img src={feedbackIcon} alt='icon positive' />
                <h1>Cobrança cadastrada com sucesso</h1>
                <img src={feedbackClose} alt='close' />
            </div>
        </div>

    )
}

export default SuccessCadBilling