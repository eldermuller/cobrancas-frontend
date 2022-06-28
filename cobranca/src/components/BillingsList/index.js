import './styles.css'
import BillingRows from '../BillingRows'
import useConsumer from '../../hooks/useConsumer'
import { useEffect } from 'react'



export function ExpiredBillings() {
    const { expiredBillsArray, homeDataArrays } = useConsumer()

    useEffect(() => {
        return () => {
        }
    }, [expiredBillsArray, homeDataArrays])

    return (
        <div className='billing-list'>
            <header className='billing-header'>
                Cobranças Vencidas
                <div className='number-of-billings' style={{ backgroundColor: '#ffefef', color: '#971d1d' }}>08</div>
            </header>
            <BillingRows
                data={expiredBillsArray}
            />
        </div>
    )
}


export function FutureBillings() {
    const { futureBillsArray, homeDataArrays } = useConsumer()

    useEffect(() => {

        return () => {
        }
    }, [futureBillsArray, homeDataArrays])

    return (
        <div className='billing-list'>
            <header className='billing-header'>
                Cobranças Previstas
                <div className='number-of-billings' style={{ backgroundColor: '#fcf6dc', color: '#c5a605' }}>05</div>
            </header>
            <BillingRows
                data={futureBillsArray}
            />
        </div>
    )
}


export function PaidBillings() {
    const { paidBillsArray, homeDataArrays } = useConsumer()

    useEffect(() => {

        return () => {
        }
    }, [paidBillsArray, homeDataArrays])
    return (
        <div className='billing-list'>
            <header className='billing-header'>
                Cobranças Pagas
                <div className='number-of-billings' style={{ backgroundColor: '#eef6f6', color: '#1fa7af' }}>10</div>
            </header>
            <BillingRows
                data={paidBillsArray}
            />
        </div>
    )
}