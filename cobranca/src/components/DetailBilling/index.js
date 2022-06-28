import { useState } from 'react'
import cadIcon from '../../assets/cad_icon.svg'
import closeBtn from '../../assets/close_btn.svg'
import tagPaga from '../../assets/tag_paga.svg'
import tagPendente from '../../assets/tag_pendente.svg'
import tagVencida from '../../assets/tag_vencida.svg'
import useConsumer from '../../hooks/useConsumer'
import './styles.css'


export default function DetailBilling({ client }) {
    const { setModalType,

        adjustValue, adjustInvertedDate

    } = useConsumer()

    // eslint-disable-next-line
    const [currentDetailBilling, setCurrentDetailBilling] = useState({ ...client })

    const getBillIconStatus = (status) => {
        if (status === 'Pago') { return tagPaga }
        if (status === 'Pendente') { return tagPendente }
        if (status === 'Vencido') { return tagVencida }
    }


    return (

        <div className='container-modal-detail-billing'>
            <div className='content-modal-detail-header'>
                <img src={cadIcon} alt='icon detail' />
                <h1 className='title-1'>Detalhe da Cobrança</h1>
                <img src={closeBtn} alt='icon close' className='close-detail-icon' onClick={() => setModalType('')} />
            </div>
            <div className='content-modal-detail-name-description'>
                <h5>Nome</h5>
                <span>{currentDetailBilling.cliente}</span>
                <h5>Descrição</h5>
                <textarea
                    className='modal-input-description add-billing-input-large'
                    type='text'
                    name='descricao'
                    value={currentDetailBilling.descricao}
                    style={{ border: 'none', fontWeight: '400', fontSize: '16px' }}
                />
            </div>
            <div className='content-modal-detail-payment-values'>
                <div>
                    <h5>Vencimento</h5>
                    <span>{adjustInvertedDate(currentDetailBilling.vencimento)}</span>
                    <h5>ID cobrança</h5>
                    <span>{currentDetailBilling.id}</span>
                </div>
                <div>
                    <h5>Valor</h5>
                    <span>{adjustValue((currentDetailBilling.valor).toString())}</span>
                    <h5>Status</h5>
                    <img
                        className='billing-status'
                        src={getBillIconStatus(currentDetailBilling.status)} alt='status'
                    />
                </div>
                <div>

                </div>

            </div>
        </div>
    )
}