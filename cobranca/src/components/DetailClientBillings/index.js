import './styles.css'
import orderIcon from '../../assets/order_icon.svg'
import editIcon from '../../assets/edit_icon.svg'
import deleteIcon from '../../assets/delete_icon.svg'
import useConsumer from '../../hooks/useConsumer'
import NumberFormat from 'react-number-format'
import FormUpdateBilling from '../FormUpdateBilling'
import { useEffect, useState } from 'react'
import tagPaga from '../../assets/tag_paga.svg'
import tagVencida from '../../assets/tag_vencida.svg'
import tagPendente from '../../assets/tag_pendente.svg'
import api from '../../services/api'
import DeleteConfirmation from '../DeleteConfirmation'
import { getItem } from '../../utils/storage'


export default function DetailClientBillings() {
    const { currentClient, setErrorMessage,
        isBillingAdded, setIsBillingAdded,
        setModalType,
        clientListOrder, setClientListOrder } = useConsumer()
    const [clientCharges, setClientCharges] = useState([])
    const token = getItem('token')


    async function fetchDetailClientBillings() {
        try {
            const response = await api.get(`/detalhar-cobrancas/${currentClient.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setClientCharges(response.data);
        } catch (error) {
            setErrorMessage(error.response)
        }
    }

    const getStatus = (status) => {
        switch (status) {
            case 'Vencido':
                return tagVencida
            case 'Pago':
                return tagPaga
            default:
                return tagPendente
        }
    }

    function formatDate(date) {
        return `${date.slice(8, 10)}${date.slice(5, 7)}${date.slice(2, 4)}`
    }

    function handleEditBilling(bill) {
        setModalType(<FormUpdateBilling
            client={bill}
        />

        )
    }
    function handleDeleteBilling(bill) {
        setModalType(<DeleteConfirmation
            bill={bill}
        />

        )
    }

    function setChargesOrder() {
        if (clientListOrder) {
            clientCharges.sort((a, b) => {
                return a.id - b.id
            })
        } else {
            clientCharges.sort((a, b) => {
                return b.id - a.id
            })
        }
        setClientListOrder(!clientListOrder)
    }

    useEffect(() => {
        setClientListOrder(false)

        return () => {
        }
        // eslint-disable-next-line
    }, [clientCharges])

    useEffect(() => {
        if (isBillingAdded) { return setIsBillingAdded(false) }

        fetchDetailClientBillings()

        return () => {
        }
        // eslint-disable-next-line
    }, [currentClient, isBillingAdded])

    return (
        <div className='client-bills--grid'>
            <div className='client-bills--label'>
                <span className='client-bills--column'>
                    <img src={orderIcon} alt='order' className='set-client-order-btn' onClick={() => setChargesOrder()} />
                    ID Cob.
                </span>
                <span className='client-bills--column'>
                    <img src={orderIcon} alt='order' className='set-client-order-btn' onClick={() => setChargesOrder()} />
                    Data de venc.
                </span>
                <span className='client-bills--column'>Valor</span>
                <span className='client-bills--column'>Status</span>
                <span className='client-bills--column'>Descrição</span>
            </div>
            {clientCharges.map((bill) => (
                <div className='client-bills--datas' key={bill.id}>
                    <span className='client-bills-column client-bills--data client-bills--data-id'>{bill.id}</span>
                    <NumberFormat
                        value={formatDate(bill.vencimento)}
                        displayType={'text'}
                        format='##/##/##'
                        renderText={(value, props) =>
                            <span {...props} className='client-bills-column client-bills--data client-bills--data-date'>{value}</span>
                        }
                    />
                    <NumberFormat
                        value={bill.valor / 100}
                        displayType={'text'}
                        decimalSeparator={','}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={'.'}
                        prefix={'R$ '}
                        renderText={(value, props) =>
                            <span {...props} className='client-bills-column client-bills--data'>{value}</span>
                        }
                    />
                    <img src={getStatus(bill.status)} alt='icon' className='client-bills-column client-bills--data' />
                    <span className='client-bills-column client-bills--data-6'>{bill.descricao}</span>
                    <span className='client-bills-column client-bills--data-7'>
                        <img src={editIcon} alt='edit' onClick={() => handleEditBilling(bill)} className='edit-billing-btn' />
                        <img src={deleteIcon} alt='delete' className='client-bills--delete-icon delete-billing-btn' onClick={() => handleDeleteBilling(bill)} />
                    </span>
                </div>
            ))}
        </div>
    )
}