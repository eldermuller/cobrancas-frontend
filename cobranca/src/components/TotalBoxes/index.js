import './styles.css'
import paidBillingsIcon from '../../assets/paid_billings_icon.svg'
import expiredBillingsIcon from '../../assets/expired_billings_icon.svg'
import futureBillingsIcon from '../../assets/future_billings_icon.svg'
import useConsumer from '../../hooks/useConsumer'
import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

export function TotalPaidBillings() {
    const { paidBillsArray, homeDataArrays } = useConsumer()
    const [localTotal, setLocalTotal] = useState(0)

    useEffect(() => {
        let sum = 0
        if (homeDataArrays) {
            paidBillsArray.forEach((bill) => {
                sum = sum + bill.valor
            })
            setLocalTotal(sum)
        }
        // eslint-disable-next-line
    }, [homeDataArrays])

    return (
        <div className='total-paid'>
            <img src={paidBillingsIcon} alt='cobranças pagas' />
            <div className='total-info'>
                <span className='total-info-tag'>Cobranças Pagas</span>
                <NumberFormat
                    value={localTotal / 100}
                    displayType={'text'}
                    prefix='R$ '
                    thousandsGroupStyle={'thousand'}
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowedDecimalSeparators={true}
                    thousandSeparator='.'
                    renderText={(value, props) => <span  {...props} className='total-info-numbers'>{value}</span>}
                />
            </div>
        </div>
    )
}

export function TotalExpiredBillings() {
    const { expiredBillsArray, homeDataArrays } = useConsumer()
    const [localTotal, setLocalTotal] = useState(0)

    useEffect(() => {
        let sum = 0
        if (homeDataArrays) {
            expiredBillsArray.forEach((bill) => {
                sum = sum + bill.valor
            })
            setLocalTotal(sum)
        }
        // eslint-disable-next-line
    }, [homeDataArrays])
    return (
        <div className='total-expired'>
            <img src={expiredBillingsIcon} alt='cobranças pagas' />
            <div className='total-info'>
                <span className='total-info-tag'>Cobranças Vencidas</span>
                <NumberFormat
                    value={localTotal / 100}
                    displayType={'text'}
                    prefix='R$ '
                    thousandsGroupStyle={'thousand'}
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowedDecimalSeparators={true}
                    thousandSeparator='.'
                    renderText={(value, props) => <span {...props} className='total-info-numbers'>{value}</span>}
                />
            </div>
        </div>
    )
}

export function TotalFutureBillings() {
    const { futureBillsArray, homeDataArrays } = useConsumer()
    const [localTotal, setLocalTotal] = useState(0)

    useEffect(() => {
        let sum = 0
        if (homeDataArrays) {
            futureBillsArray.forEach((bill) => {
                sum = sum + bill.valor
            })
            setLocalTotal(sum)
        }
        // eslint-disable-next-line
    }, [homeDataArrays])
    return (
        <div className='total-future'>
            <img src={futureBillingsIcon} alt='cobranças pagas' />
            <div className='total-info'>
                <span className='total-info-tag'>Cobranças Previstas</span>
                <NumberFormat
                    value={localTotal / 100}
                    displayType={'text'}
                    prefix='R$ '
                    thousandsGroupStyle={'thousand'}
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowedDecimalSeparators={true}
                    thousandSeparator='.'
                    renderText={(value, props) => <span {...props} className='total-info-numbers'>{value}</span>}
                />
            </div>
        </div>
    )
}