import './style.css'
import deleteConfirmation from '../../assets/delete_confirmation.svg'
import closeBtn from '../../assets/close_btn.svg'
import useConsumer from '../../hooks/useConsumer'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

export default function DeleteConfirmation({ bill }) {
    const { setModalType, setErrorMessage, setTinyModalMessage, setNegativeTinyModalMessage, setIsBillingAdded } = useConsumer()
    const token = getItem('token')

    async function handleDeleteConfirm() {
        if (bill.status !== 'Pendente') {
            setModalType('')
            setNegativeTinyModalMessage('Esta cobrança não pode ser excluída');
            return
        }

        try {
            await api.delete(`/excluir-cobranca/${bill.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setModalType('')
            setIsBillingAdded(true)
            setTinyModalMessage('Cobrança excluída com sucesso')
        } catch (error) {
            setErrorMessage(error.response)
        }

    }

    return (
        <div className='delete-confirmation'>
            <img src={closeBtn} alt='close-btn' onClick={() => setModalType('')} className='close-btn' />
            <img className='delete-confirmation-icon' src={deleteConfirmation} alt='delete-confirmation' />
            <span className='delete-confirmation-question'>Tem certeza que deseja excluir essa cobrança?</span>
            <div className='delete-confirmation-buttons'>
                <button
                    className='delete-confirmation-button confirmation-button-no'
                    onClick={() => setModalType('')}
                >Não</button>
                <button
                    className='delete-confirmation-button confirmation-button-yes'
                    onClick={() => handleDeleteConfirm()}
                >Sim</button>
            </div>
        </div>
    )
}