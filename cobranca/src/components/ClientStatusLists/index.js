import './styles.css'
import clientInDebtIcon from '../../assets/client_in_debt_icon.svg'
import okClientIcon from '../../assets/ok_client_icon.svg'
import ClientRows from '../ClientRows'
import useConsumer from '../../hooks/useConsumer'

export function ClientsOk() {
    const { inDebtClientsArray } = useConsumer()

    const num = () => {
        if (inDebtClientsArray.length < 10) { return `0${inDebtClientsArray.length}` }
        return inDebtClientsArray.length
    }


    return (
        <div className='client-list'>
            <header className='client-header'>
                <div className='icon-name-header'>
                    <img src={clientInDebtIcon} alt='in_debt_client' />
                    Clientes Inadimplentes
                </div>
                <div className='number-of-clients' style={{ backgroundColor: '#ffefef', color: '#971d1d' }}>{num()}</div>
            </header>
            <ClientRows
                data={inDebtClientsArray}
            />
        </div>
    )
}

export function ClientsInDebt() {
    const { okClientsArray } = useConsumer()


    const num = () => {
        if (okClientsArray.length < 10) { return `0${okClientsArray.length}` }
        return okClientsArray.length
    }

    return (
        <div className='client-list'>
            <header className='client-header'>
                <div className='icon-name-header'>
                    <img src={okClientIcon} alt='ok_client' />
                    Clientes em dia
                </div>
                <div className='number-of-clients' style={{ backgroundColor: '#eef6f6', color: '#1fa7af' }}>{num()}</div>
            </header>
            <ClientRows
                data={okClientsArray}
            />
        </div>
    )
}