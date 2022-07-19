import iconSucess from '../../assets/success_icon.svg';
import useConsumer from '../../hooks/useConsumer';
import { useTransition, animated, easings } from 'react-spring';
import './style.css';


function SucessCard() {
    const { toLogin } = useConsumer()

    return (
        <animated.div
            className='container-sucess'
        >
            <animated.div className='content-sucess'>
                <animated.img src={iconSucess} alt='icon' />
                <animated.h1>Cadastro realizado com sucesso!</animated.h1>
            </animated.div>

            <animated.button onClick={() => toLogin()}
                className='signup-pink-btn to-login-btn'
            >Ir para o Login</animated.button>
        </animated.div>

    )
}

export default SucessCard;