import './styles.css'
import orderIcon from '../../assets/order_icon.svg'
import editIcon from '../../assets/edit_icon.svg'
import deleteIcon from '../../assets/delete_icon.svg'
import tagVencida from '../../assets/tag_vencida.svg'
import tagPaga from '../../assets/tag_paga.svg'
import tagPendente from '../../assets/tag_pendente.svg'
import NotFound from '../NotFound'
import useConsumer from '../../hooks/useConsumer'
import NumberFormat from 'react-number-format'
import { useEffect } from 'react'
import FormUpdateBilling from '../FormUpdateBilling';
import DetailBilling from '../DetailBilling'
import DeleteConfirmation from '../DeleteConfirmation'

export default function BillingsBoard({ fetchCharges }) {
    const { adjustInvertedDate,
        dashboardContainer,
        arrayBillings, setArrayBillings,
        setModalType, isBillingAdded, setIsBillingAdded,
        billingOrderByClient, setBillingOrderByClient,
        billingOrderById, setBillingOrderById,
        billingsNotFound, setBillingsNotFound,
        seeAllJumper, setSeeAllJumper
    } = useConsumer()


    const getBillIconStatus = (status) => {
        if (status === 'Pago') { return tagPaga }
        if (status === 'Pendente') { return tagPendente }
        if (status === 'Vencido') { return tagVencida }
    }

    function handleOpenDetailBilling(bill) {
        setModalType(
            <DetailBilling
                client={bill}
            />
        );
    }

    function handleEditBilling(bill) {
        setModalType(<FormUpdateBilling
            client={bill}

        />)
    }


    function handleDeleteConfirmation(bill) {
        setModalType(<DeleteConfirmation
            bill={bill}
        />)
    }

    function setOrderByClient() {
        if (billingOrderByClient) {
            arrayBillings.sort((a, b) => {
                return b.cliente.localeCompare(a.cliente)
            })
        } else {
            arrayBillings.sort((a, b) => {
                return a.cliente.localeCompare(b.cliente)
            })
        }
        setBillingOrderByClient(!billingOrderByClient)

    }

    function setOrderById() {
        if (billingOrderById) {
            arrayBillings.sort((a, b) => {
                return a.id - b.id
            })
        } else {
            arrayBillings.sort((a, b) => {
                return b.id - a.id
            })
        }
        setBillingOrderById(!billingOrderById)
    }

    useEffect(() => {
        setBillingOrderByClient(false)
        setBillingOrderById(false)
        setIsBillingAdded(false)

        if (seeAllJumper) { return }

        fetchCharges()
        // eslint-disable-next-line
    }, [dashboardContainer, isBillingAdded])

    useEffect(() => {
        setBillingsNotFound(false)
        return () => {
            setArrayBillings([])
            setSeeAllJumper(false)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        return () => {
        }
    }, [arrayBillings])

    return (
        <div className='billings-board'>
            <div className='billings-list--label'>
                <span className='billings-list--column billings-list--c1'>
                    <img src={orderIcon} alt='order' className='set-billing-order-btn' onClick={() => setOrderByClient()} />
                    Cliente
                </span>
                <span className='billings-list--column billings-list--c2'>
                    <img src={orderIcon} alt='order' className='set-billing-order-btn' onClick={() => setOrderById()} />
                    ID Cob.
                </span>
                <span className='billings-list--column billings-list--c3'>Valor</span>
                <span className='billings-list--column billings-list--c4'>Data de Venc</span>
                <span className='billings-list--column billings-list--c5'>Status</span>
                <span className='billings-list--column billings-list--c6'>Descrição</span>
                <span className='billings-list--column billings-list--c7' />
            </div>
            {billingsNotFound
                ? <NotFound />
                : arrayBillings.map((bill) => (
                    <div className='billings-list--row' key={bill.id}>
                        <span
                            className='billings-list--column billings-list--c1'
                            onClick={() => handleOpenDetailBilling(bill)}
                        >
                            {bill.cliente}
                        </span>
                        <span className='billings-list--column billings-list--c2 billings-list--c2-data'
                        >
                            {bill.id}
                        </span>
                        <NumberFormat
                            value={bill.valor / 100}
                            displayType={'text'}
                            thousandsGroupStyle="thousand"
                            prefix={'R$ '}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            renderText={(value, props) => <span {...props}
                                className='billings-list--column billings-list--c3'
                            >
                                {value}
                            </span>}
                        />
                        <span className='billings-list--column billings-list--c4'>{adjustInvertedDate(bill.vencimento)}</span>
                        <span className='billings-list--column billings-list--c5'>
                            <img
                                className='billing-status'
                                src={getBillIconStatus(bill.status)} alt='status' />
                        </span>
                        <span className='billings-list--column billings-list--c6'>{bill.descricao}</span>

                        <span className='billings-list--column billings-list--c7'>
                            <img
                                className='edit-billing-btn'
                                src={editIcon} alt='add_billing'
                                onClick={() => handleEditBilling(bill)} />
                            <img
                                className='delete-billing-btn'
                                src={deleteIcon} alt='add_billing'
                                onClick={() => handleDeleteConfirmation(bill)} />
                        </span>
                    </div>
                ))
            }
        </div>
    )
}