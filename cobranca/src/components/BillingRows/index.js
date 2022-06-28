import './styles.css'
import NumberFormat from 'react-number-format'
import { useState, useEffect } from 'react'
import useConsumer from '../../hooks/useConsumer.js'
import BillingsData from '../BillingsData'

export default function BillingRows({ data }) {
    const [fiveEntries, setFiveEntries] = useState([])
    const { homeDataArrays, setDashboardContainer, setArrayBillings, setPageOption, setSeeAllJumper } = useConsumer()
    const [emptyCells, setEmptyCells] = useState(null)

    function handleBillings() {
        setArrayBillings(data)
        setSeeAllJumper(true)
        setPageOption('billing')
        setDashboardContainer(<BillingsData />)
    }

    function handleEmptyCells() {
        let counter = 5 - data.length
        let local = []
        while (counter > 0) {
            local.push({ id: counter })
            counter--
        }
        setEmptyCells(local)
    }

    useEffect(() => {
        setFiveEntries(data.slice(0, 5))

        if (data.length < 5) {
            handleEmptyCells()
        }

        return () => {
            setFiveEntries([])
            setEmptyCells(null)
        }
        // eslint-disable-next-line
    }, [homeDataArrays])

    return (
        <>
            <div className='billing-table-label'>
                <span className='billing-column'>Cliente</span>
                <span className='billing-column'>ID da cob.</span>
                <span className='billing-column'>Valor</span>
            </div>
            {
                fiveEntries.map((bill) => (
                    <div className='billing-row' key={bill.id}>
                        <span className='billing-column'>{bill.cliente}</span>
                        <span className='billing-column id-middle-column'>{bill.id}</span>
                        <NumberFormat
                            value={bill.valor / 100}
                            displayType={'text'}
                            prefix='R$ '
                            thousandsGroupStyle={'thousand'}
                            decimalSeparator=','
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowedDecimalSeparators={true}
                            thousandSeparator='.'
                            renderText={(value, props) => <span {...props} className='billing-column'>{value}</span>}
                        />
                    </div>
                ))
            }
            {emptyCells &&
                emptyCells.map((cell) => (
                    <div key={cell.id} className='billing-row'><span className='billing-column' /></div>
                ))
            }
            <footer className='billing-footer'>
                <button className='billing-footer-list-btn' onClick={handleBillings}>
                    Ver todos
                </button>
            </footer>
        </>
    )
}

