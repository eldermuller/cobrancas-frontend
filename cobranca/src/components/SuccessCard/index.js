import iconSucess from '../../assets/success_icon.svg';
import useConsumer from '../../hooks/useConsumer';
import { animated, useSpring } from 'react-spring';
import './style.css';


function SucessCard() {
    const { toLogin, dissolveSpring } = useConsumer()
    const dissolveCard = useSpring(dissolveSpring)

    return (
        <animated.div
            className='container-sucess'
            style={dissolveCard}
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