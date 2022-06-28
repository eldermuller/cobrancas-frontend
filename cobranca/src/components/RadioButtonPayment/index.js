import greenIconCheck from '../../assets/check_icon_green.svg';
import redIconCheck from '../../assets/check_icon_red.svg';
import './style.css';


function RadioButtonPayment({ newBilling, setNewBilling }) {


    return (
        <div className='container-radio-payment'>
            <div className='content-radio-payment'>

                <label className='modal-label' >
                    Status*
                </label>
                <div
                    className='modal-input signup-client-input-large radio-btn'
                    onClick={() => setNewBilling({ ...newBilling, status: true })}
                >
                    {newBilling.status
                        ? <img src={greenIconCheck} alt='check-icon' />
                        : <div className='no-check' />
                    }
                    Cobrança Paga
                </div>
                <div
                    className='modal-input signup-client-input-large radio-btn'
                    onClick={() => setNewBilling({ ...newBilling, status: false })}
                >
                    {newBilling.status
                        ? <div className='no-check' />
                        : <img src={redIconCheck} alt='check-icon' />
                    }
                    Cobrança Pendente
                </div>

            </div>
        </div>
    )
}

export default RadioButtonPayment;