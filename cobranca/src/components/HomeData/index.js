import './styles.css'
import { TotalPaidBillings, TotalExpiredBillings, TotalFutureBillings } from '../TotalBoxes'
import { PaidBillings, ExpiredBillings, FutureBillings } from '../BillingsList'
import { ClientsOk, ClientsInDebt } from '../ClientStatusLists'
import { useEffect } from 'react'
import useConsumer from '../../hooks/useConsumer'
import api from '../../services/api'
import { getItem } from '../../utils/storage'
import { animated } from 'react-spring'
import positiveFeedback from '../../assets/positive_feedback.svg'
import closeFeedbackOk from '../../assets/close_feedback_ok.svg'

export default function HomeData() {
    const { dashBoardContainer,
        setErrorMessage,
        setOkClientsArray,
        setInDebtClientsArray,
        setExpiredBillsArray,
        setPaidBillsArray,
        setFutureBillsArray,
        homeDataArrays, setHomeDataArrays,
        bottomTinyModal, setTinyModalMessage, tinyModalMessage
    } = useConsumer()
    const token = getItem('token')

    async function fetchHomeData() {

        try {
            const response = await api.get('/ver-todos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setExpiredBillsArray(response.data.expiradas)
            setPaidBillsArray(response.data.pagas)
            setFutureBillsArray(response.data.previstas)
            setInDebtClientsArray(response.data.clientesInadimplentes)
            setOkClientsArray(response.data.clientesEmDia)
            setHomeDataArrays(true)

        } catch (error) {
            setErrorMessage(error.response.data)
        }
    }

    useEffect(() => {
        return () => {
        }
    }, [homeDataArrays])

    useEffect(() => {
        if (tinyModalMessage) {
            setTimeout(() => {
                setTinyModalMessage('')
            }, 3000)
        }
        //eslint-disable-next-line
    }, [tinyModalMessage])

    useEffect(() => {
        fetchHomeData()
        return () => {
        }
        // eslint-disable-next-line
    }, [dashBoardContainer])
    return (
        <div className='homedata'>
            <div className='homedata-line-1'>
                <TotalPaidBillings />
                <TotalExpiredBillings />
                <TotalFutureBillings />
            </div>
            <div className='homedata-line-2'>
                <ExpiredBillings />
                <FutureBillings />
                <PaidBillings />
            </div>
            <div className='homedata-line-3'>
                <ClientsOk />
                <ClientsInDebt />
            </div>
            {bottomTinyModal((appear, tinyModalMessage) =>
                tinyModalMessage &&
                <animated.div style={appear} className='positive-feedback'>
                    <div className='inner-tiny-modal-container'>
                        <img className='tiny-modal-icon' src={positiveFeedback} alt='success' />
                        <span className='positive-feedback-text'>{tinyModalMessage}</span>
                    </div>
                    <img onClick={() => setTinyModalMessage('')} className='close-feedback tiny-close' src={closeFeedbackOk} alt='close' />
                </animated.div>
            )}
        </div>
    )
}