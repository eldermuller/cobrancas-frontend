import './styles.css'
import BillingRows from '../BillingRows'
import useConsumer from '../../hooks/useConsumer'
import { useSpring, animated } from 'react-spring'



export function ExpiredBillings() {
    const { expiredBillsArray, dissolveSpring } = useConsumer()
    const dissolveLabel = useSpring(dissolveSpring)

    const num = () => {
        if (expiredBillsArray.length < 10) { return `0${expiredBillsArray.length}` }
        return expiredBillsArray.length
    }

    return (
        <div style={dissolveLabel} className='billing-list'>
            <animated.header style={dissolveLabel} className='billing-header'>
                Cobranças Vencidas
                <div className='number-of-billings' style={{ backgroundColor: '#ffefef', color: '#971d1d' }}>{num()}</div>
            </animated.header>
            <BillingRows
                data={expiredBillsArray}
            />
        </div>
    )
}


export function FutureBillings() {
    const { futureBillsArray, dissolveSpring } = useConsumer()
    const dissolveLabel = useSpring(dissolveSpring)

    const num = () => {
        if (futureBillsArray.length < 10) { return `0${futureBillsArray.length}` }
        return futureBillsArray.length
    }


    return (
        <div className='billing-list'>
            <animated.header style={dissolveLabel} className='billing-header'>
                Cobranças Previstas
                <div className='number-of-billings' style={{ backgroundColor: '#fcf6dc', color: '#c5a605' }}>{num()}</div>
            </animated.header>
            <BillingRows
                data={futureBillsArray}
            />
        </div>
    )
}


export function PaidBillings() {
    const { paidBillsArray, dissolveSpring } = useConsumer()
    const dissolveLabel = useSpring(dissolveSpring)

    const num = () => {
        if (paidBillsArray.length < 10) { return `0${paidBillsArray.length}` }
        return paidBillsArray.length
    }

    return (
        <div className='billing-list'>
            <animated.header style={dissolveLabel} className='billing-header'>
                Cobranças Pagas
                <div className='number-of-billings' style={{ backgroundColor: '#eef6f6', color: '#1fa7af' }}>{num()}</div>
            </animated.header>
            <BillingRows
                data={paidBillsArray}
            />
        </div>
    )
}