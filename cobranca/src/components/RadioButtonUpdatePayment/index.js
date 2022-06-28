import greenIconCheck from '../../assets/check_icon_green.svg';
import redIconCheck from '../../assets/check_icon_red.svg';
import './style.css';




function RadioButtonUpdatePayment({ localClient, updateBilling, setUpdateBilling }) {



    return (
        <div className='container-radio-payment'>
            <div className='content-radio-payment'>

                <label className='modal-label' >
                    Status*
                </label>

                <div
                    className='modal-input signup-client-input-large radio-btn'
                    onClick={() => setUpdateBilling({ ...updateBilling, status: true })}

                >

                    {localClient.status === 'Pago' || updateBilling.status === true
                        ? <img src={greenIconCheck} alt='check-icon' />
                        : <div className='no-check' />
                    }
                    Cobrança Paga
                </div>
                <div
                    className='modal-input signup-client-input-large radio-btn'
                    onClick={() => setUpdateBilling({ ...updateBilling, status: false })}
                >
                    {localClient.status === 'Pendente' || localClient.status === 'Vencido' || updateBilling.status === false
                        ? <img src={redIconCheck} alt='check-icon' />
                        : <div className='no-check' />
                    }
                    Cobrança Pendente

                </div>


            </div>
        </div>
    )
}

export default RadioButtonUpdatePayment;