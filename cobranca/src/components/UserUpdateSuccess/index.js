import './styles.css'
import successIcon from '../../assets/success_icon.svg'
import useConsumer from '../../hooks/useConsumer'
import { useEffect } from 'react'

export default function UserUpdateSuccess() {
    const { modalType, setModalType } = useConsumer()

    useEffect(() => {
        setTimeout(() => {
            if (modalType === <UserUpdateSuccess />) {
                setModalType('')
            }
        }, 3000)
    })

    return (
        <div className='success-card' onClick={() => setModalType('')}>
            <img src={successIcon} alt='success' />
            <h3>Cadastro Alterado com sucesso!</h3>
        </div>
    )
}