import iconSucess from '../../assets/success_icon.svg';
import useConsumer from '../../hooks/useConsumer';
import SignupTab from '../SignupTab';
import './style.css';


function SucessCad() {
    const { toLogin } = useConsumer()


    return (
        <div className='container-sucess'>
            <div className='content-sucess'>
                <img src={iconSucess} alt='icon' />
                <h1>Cadastro realizado com sucesso!</h1>
            </div>

            <button onClick={() => toLogin()}
                className='signup-pink-btn to-login-btn'
            >Ir para o Login</button>
            <SignupTab />
        </div>
    )
}

export default SucessCad;