import './styles.css'
import closeBtn from '../../assets/close_btn.svg'
import useConsumer from '../../hooks/useConsumer'
import useModalConsumer from '../../hooks/useModalConsumer'
import cadIcon from '../../assets/cad_icon.svg'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import RadioButtonPayment from '../../components/RadioButtonPayment'
import NumberFormat from 'react-number-format'
import { getItem } from '../../utils/storage'



const defaultForm = {
    name: '',
    description: '',
    payment: '',
    value: '',
    status: ''
}

export default function FormRegisterBilling({ client }) {
    const { setModalType,
        setErrorMessage,
        setIsBillingAdded,
        setTinyModalMessage,
        setIsClientAdded,
        setHomeDataArrays
    } = useConsumer()
    const token = getItem('token')
    const [currentValue, setCurrentValue] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const {
        descriptionModalError, setDescriptionModalError,
        paymentModalError, setPaymentModalError,
        valueModalError, setValueModalError,
        clearModalInputError
    } = useModalConsumer()
    const [newBilling, setNewBilling] = useState({
        name: '',
        description: '',
        payment: '',
        value: '',
        status: false
    });
    // eslint-disable-next-line
    const [localClient, setlocalClient] = useState({ ...client })

    function handleReset() {
        setNewBilling(defaultForm);
        setCurrentDate('')
        setCurrentValue('')
    }



    async function handleCreateBilling(e) {
        e.preventDefault()
        let formOk = true

        if (!newBilling.description) {
            setDescriptionModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!newBilling.payment) {
            setPaymentModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!newBilling.value) {
            setValueModalError('Este campo deve ser preenchido')
            formOk = false
        }

        if (!formOk) { return }

        setDescriptionModalError('')
        setPaymentModalError('')
        setValueModalError('')
        const dateToSend = `${newBilling.payment.slice(4)}${newBilling.payment.slice(2, 4)}${newBilling.payment.slice(0, 2)}`
        const valueToSend = parseInt(Number(newBilling.value).toFixed(2) * 100)

        try {
            const response = await api.post('/cadastro-cobranca', {
                id: localClient.id,
                cliente: localClient.name,
                descricao: newBilling.description,
                vencimento: dateToSend,
                valor: valueToSend,
                status: newBilling.status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setIsBillingAdded(true)

            handleReset();
            setHomeDataArrays(false)
            setTinyModalMessage(response.data)
            setIsClientAdded(true)
        } catch (error) {
            return setErrorMessage(error.response.data)
        }
        setModalType('')

    }

    function handleChange({ target }) {
        clearModalInputError(target.name)
        const value = target.value;
        setNewBilling({ ...newBilling, [target.name]: value });
        if (target.name === 'payment') {
            return setCurrentDate(value)
        }
        if (target.name === 'value') {
            return setCurrentValue(value)
        }
    }

    function adjustNumberValues(values, target) {
        const { formattedValue, value } = values;
        clearModalInputError(target)
        setNewBilling({ ...newBilling, [target]: value })
        if (target === 'payment') { return setCurrentDate(formattedValue) }
        if (target === 'value') { return setCurrentValue(formattedValue) }
    }


    useEffect(() => {
        handleReset()
        setNewBilling({ ...newBilling, status: false })
        return () => {
        }
        //eslint-disable-next-line
    }, [])

    return (
        <div className='container-register-billing custom-modal-box'>

            <form className='general-form add-billing-form' onSubmit={handleCreateBilling}>
                <img
                    src={closeBtn}
                    alt='close'
                    onClick={() => setModalType('')}
                    className='close-btn'
                />
                <div className='title-add-billing-form'>
                    <img src={cadIcon} alt='client-icon' />
                    <h1 className='title-1'>Cadastro do Cobrança</h1>
                </div>
                <label className='modal-label'>
                    Nome*
                    <input
                        className='modal-input add-billing-input-large'
                        type='text'
                        name='name'
                        value={localClient.name}
                        style={{ backgroundColor: 'var(--cinza-600)', color: 'var(--cinza-300)' }}
                        disabled={true}
                    />
                </label>
                <label className='modal-label '>
                    Descrição*
                    <textarea
                        className='modal-input-description add-billing-input-large'
                        type='text'
                        placeholder='Digite a descrição'
                        name='description'
                        value={newBilling.description}
                        onChange={handleChange}
                        style={descriptionModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {descriptionModalError &&
                        <span className='modal-warning-message'>{descriptionModalError}</span>
                    }
                </label>

                <div className='register-billing-payment'>
                    <label className='modal-label'>
                        Vencimento*
                        <NumberFormat
                            className='modal-input billing-input-small'
                            placeholder={'Data de Vencimento'}
                            value={currentDate}
                            format='##/##/##'
                            mask={'_'}
                            onValueChange={(values) => adjustNumberValues(values, 'payment')}
                            style={paymentModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                        />
                        {paymentModalError &&
                            <span className='modal-warning-message'>{paymentModalError}</span>
                        }
                    </label>

                    <label className='modal-label'>
                        Valor*
                        <NumberFormat
                            className='modal-input billing-input-small'
                            placeholder={'Digite o valor'}
                            value={currentValue}
                            decimalSeparator={','}
                            fixedDecimalScale={true}
                            allowedDecimalSeparators={[',', '.']}
                            thousandSeparator={'.'}
                            prefix={'R$ '}
                            mask={'_'}
                            onValueChange={(values) => adjustNumberValues(values, 'value')}
                            style={valueModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                        />
                        {valueModalError &&
                            <span className='modal-warning-message'>{valueModalError}</span>
                        }
                    </label>
                </div>
                <RadioButtonPayment
                    newBilling={newBilling}
                    setNewBilling={setNewBilling}
                />

                <div className='btn-line btn-billing'>
                    <button className='signup-client-reset-btn' type='button' onClick={handleReset}>Cancelar</button>
                    <button className='signup-client-submit-btn pink-btn'>Aplicar</button>
                </div>
            </form>

        </div>
    )
}