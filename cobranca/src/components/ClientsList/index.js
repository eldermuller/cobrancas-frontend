import { useEffect } from 'react'
import addBillingIcon from '../../assets/add_billing_icon.svg'
import orderIcon from '../../assets/order_icon.svg'
import statusInDebtClient from '../../assets/status_in_debt_client.svg'
import statusOkClient from '../../assets/status_ok_client.svg'
import useConsumer from '../../hooks/useConsumer'
import api from '../../services/api'
import DetailClient from '../DetailClient'
import FormRegisterBilling from '../FormRegisterBilling'
import NumberFormat from 'react-number-format'
import './styles.css'
import { getItem } from '../../utils/storage'
import NotFound from '../NotFound'


export default function ClientsList({ fetchClients }) {
    const { arrayClients, setArrayClients,
        setModalType,
        setDashboardContainer,
        dashboardContainer,
        setErrorMessage,
        setCurrentClient,
        isClientAdded,
        adjustPhone,
        clientListOrder, setClientListOrder,
        setHomeDataArrays,
        setPhoneValue,
        clientsNotFound, setClientsNotFound,
        seeAllJumper, setSeeAllJumper
    } = useConsumer()
    const token = getItem('token')

    function handleAddNewBilling(client) {
        const translator = {
            id: client.id,
            name: client.nome,
            phone: client.telefone,
            email: client.email,
            cpf: client.cpf,
            status: client.condicao
        }
        setModalType(<FormRegisterBilling client={translator} />)
    }



    async function handleClientDetail(e) {
        try {
            const response = await api.get(`/detalhar-cliente/${e.target.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const client = {
                id: response.data.id,
                name: response.data.nome,
                email: response.data.email,
                cpf: response.data.cpf,
                phone: response.data.telefone,
                address: response.data.logradouro,
                complement: response.data.complemento,
                cep: response.data.cep,
                district: response.data.bairro,
                city: response.data.cidade,
                state: response.data.estado
            }
            setCurrentClient({ ...client })
            setDashboardContainer(<DetailClient />)
        } catch (error) {
            setErrorMessage(error.response.data)
        }

    }

    function setOrder() {
        if (clientListOrder) {
            arrayClients.sort((a, b) => {
                return b.nome.localeCompare(a.nome)
            })
        } else {
            arrayClients.sort((a, b) => {
                return a.nome.localeCompare(b.nome)
            })
        }
        setClientListOrder(!clientListOrder)
    }

    useEffect(() => {
        setClientListOrder(false)
        setPhoneValue('')
        if (seeAllJumper) { return }
        fetchClients()
        // eslint-disable-next-line
    }, [dashboardContainer, isClientAdded])

    useEffect(() => {
        setClientsNotFound(false)
        return () => {
            setArrayClients([])
            setSeeAllJumper(false)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setHomeDataArrays(false)
        return () => {
        }
        // eslint-disable-next-line
    }, [arrayClients])

    return (
        <div className='clients-list'>
            <div className='clients-list--label'>
                <span className='clients-list--column'>
                    <img
                        src={orderIcon}
                        alt='order'
                        className='set-client-order-btn'
                        onClick={() => setOrder()}
                    />
                    Cliente
                </span>
                <span className='clients-list--column'>CPF</span>
                <span className='clients-list--column'>E-mail</span>
                <span className='clients-list--column'>Telefone</span>
                <span className='clients-list--column'>Status</span>
                <span className='clients-list--column'>Criar Cobrança</span>
            </div>
            {clientsNotFound
                ? <NotFound />
                : arrayClients.map((client) => (
                    <div className='clients-list--row' key={client.id}>
                        <span
                            className='clients-list--column client-name-click'
                            id={client.id}
                            onClick={handleClientDetail}
                        >
                            {client.nome}
                        </span>
                        <NumberFormat
                            value={client.cpf}
                            displayType={'text'}
                            format='###.###.###-##'
                            renderText={(value, props) => <span {...props} className='clients-list--column'>{value}</span>}
                        />
                        <span className='clients-list--column'>{client.email}</span>
                        <NumberFormat
                            value={client.telefone}
                            displayType={'text'}
                            format={adjustPhone(client.telefone)}
                            renderText={(value, props) => <span {...props} className='clients-list--column'>{value}</span>}
                        />
                        <span className='clients-list--column'>
                            <img
                                className='client-status'
                                src={client.condicao ? statusOkClient : statusInDebtClient} alt='status' />
                        </span>
                        <span className='clients-list--column'>

                            <img
                                className='add-billing-btn'
                                src={addBillingIcon} alt='add_billing'
                                onClick={() => handleAddNewBilling(client)} />

                        </span>
                    </div>
                ))
            }
        </div>
    )
}