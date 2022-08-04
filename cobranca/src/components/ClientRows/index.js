import './styles.css'
import NumberFormat from 'react-number-format'
import { useEffect, useState } from 'react'
import useConsumer from '../../hooks/useConsumer.js'
import ClientsData from '../ClientsData'
import { useSpring, animated } from 'react-spring'

export default function ClientRows({ data }) {
    const [fiveEntries, setFiveEntries] = useState(data)
    const { homeDataArrays,
        setArrayClients,
        setPageOption,
        setDashboardContainer,
        setSeeAllJumper,
        dissolveSpringTwo
    } = useConsumer()
    const [emptyCells, setEmptyCells] = useState(null)
    const dissolveData = useSpring(dissolveSpringTwo)


    function handleClients() {
        setArrayClients(data)
        setSeeAllJumper(true)
        setPageOption('clients')
        setDashboardContainer(<ClientsData />)
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
        <animated.section style={dissolveData}>
            <div className='client-table-label'>
                <span className='client-column'>Cliente</span>
                <span className='client-column'>ID do clie.</span>
                <span className='client-column'>CPF</span>
            </div>
            {fiveEntries.map((client) => (
                <div className='client-row' key={client.id}>
                    <span className='client-column'>{client.nome}</span>
                    <span className='client-column id-middle-column'>{client.id}</span>
                    <NumberFormat
                        value={client.cpf}
                        displayType={'text'}
                        format='###.###.###-##'
                        renderText={(value, props) =>
                            <span {...props} className='client-column'>{value}</span>
                        }
                    />
                </div>
            ))}
            {emptyCells &&
                emptyCells.map((cell) => (
                    <div key={cell.id} className='billing-row'><span className='billing-column' /></div>
                ))
            }
            <footer className='client-list-footer'>
                <button className='client-footer-list-btn' onClick={handleClients}>
                    Ver todos
                </button>
            </footer>
        </animated.section>
    )
}