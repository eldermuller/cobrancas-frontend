import './styles.css'
import closeBtn from '../../assets/close_btn.svg'
import useConsumer from '../../hooks/useConsumer'
import useModalConsumer from '../../hooks/useModalConsumer'
import cadIcon from '../../assets/cad_icon.svg'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import RadioButtonUpdatePayment from '../RadioButtonUpdatePayment'
import { getItem } from '../../utils/storage'
import NumberFormat from 'react-number-format'



export default function FormUpdateBilling({ client }) {
    const { setModalType,
        setErrorMessage,
        adjustValue, adjustInvertedDate,
        setIsBillingAdded,
        setTinyModalMessage,
        setIsClientAdded
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




    const [localBilling, setlocalBilling] = useState({ ...client })
    const [formFiled, setFormFiled] = useState(false)

    async function handleCreateBilling(e) {
        e.preventDefault()
        let formOk = true

        if (!localBilling.descricao) {
            setDescriptionModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!localBilling.vencimento) {
            setPaymentModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!localBilling.valor) {
            setValueModalError('Este campo deve ser preenchido')
            formOk = false
        }

        if (!formOk) { return }

        setDescriptionModalError('')
        setPaymentModalError('')
        setValueModalError('')

        const dateToSend = `${localBilling.vencimento.slice(4)}${localBilling.vencimento.slice(2, 4)}${localBilling.vencimento.slice(0, 2)}`;

        const valueToSend = parseInt(Number(localBilling.valor).toFixed(2) * 100)

        const turnedCorrectStatus = () => {
            if (localBilling.status === 'Pago') {
                localBilling.status = true
            }
            if (localBilling.status === 'Vencido' || localBilling.status === 'Pendente') {
                localBilling.status = false
            }
        }

        turnedCorrectStatus()


        try {
            const response = await api.patch('/atualizar-cobranca', {
                id: localBilling.id,
                id_cliente: localBilling.id_cliente,
                descricao: localBilling.descricao,
                status: localBilling.status,
                valor: valueToSend,
                vencimento: typeof dateToSend !== 'number' ? localBilling.vencimento : dateToSend

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            setTimeout(() => {
                setIsBillingAdded(true)
            }, 1000)
            // handleReset();

            setTinyModalMessage(response.data)
            setIsClientAdded(true)
        } catch (error) {
            return setErrorMessage(error.response.data)
        }
        setModalType('')

    }

    function adjustNumberValues(values, target) {

        const { formattedValue, value } = values;
        clearModalInputError(target)
        setlocalBilling({ ...localBilling, [target]: value })
        if (target === 'vencimento') { return setCurrentDate(formattedValue) }
        if (target === 'valor') { return setCurrentValue(formattedValue) }
    }

    function handleChange({ target }) {
        clearModalInputError(target.name)
        const value = target.value;
        setlocalBilling({ ...localBilling, [target.name]: value });
        if (target.name === 'vencimento') {
            return setCurrentDate(value)
        }
        if (target.name === 'valor') {
            return setCurrentValue(value)
        }

    }

    function fillForm() {
        setCurrentDate(adjustInvertedDate(localBilling.vencimento))
        setCurrentValue(adjustValue((localBilling.valor).toString()))
        setFormFiled(!formFiled)
    }

    useEffect(() => {


        return () => {
        }
        // eslint-disable-next-line
    }, [formFiled])

    useEffect(() => {
        fillForm()
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
                    <h1 className='title-1'>Edição de Cobrança</h1>
                </div>
                <label className='modal-label'>
                    Nome*
                    <input
                        className='modal-input add-billing-input-large'
                        type='text'
                        name='name'
                        value={localBilling.cliente}
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
                        name='descricao'
                        value={localBilling.descricao}
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
                            onValueChange={(values) => adjustNumberValues(values, 'vencimento')}
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
                            onValueChange={(values) => adjustNumberValues(values, 'valor')}
                            style={valueModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                        />

                        {valueModalError &&
                            <span className='modal-warning-message'>{valueModalError}</span>
                        }
                    </label>
                </div>
                <RadioButtonUpdatePayment
                    localClient={localBilling}
                    updateBilling={localBilling}
                    setUpdateBilling={setlocalBilling}
                />

                <div className='btn-line btn-billing'>
                    <button className='signup-client-reset-btn' type='button'>Cancelar</button>
                    <button className='signup-client-submit-btn pink-btn'>Aplicar</button>
                </div>
            </form>

        </div>
    )
}