import './styles.css'
import useConsumer from '../../hooks/useConsumer'

export default function ModalSucess() {
    const { modalType } = useConsumer()

    return (
        <div className='backdrop'>
            <div className='modal-box'>
                <div className='modal-container'>
                    {modalType}
                </div>
            </div>
        </div>
    )
}