import './styles.css'
import { ReactComponent as BillingIcon } from '../../assets/billing_icon.svg'
import filterBtn from '../../assets/filter_btn.svg'
import searchIcon from '../../assets/search_icon.svg'
import BillingsBoard from '../BillingsBoard'
import useConsumer from '../../hooks/useConsumer'
import { animated } from 'react-spring'
import positiveFeedback from '../../assets/positive_feedback.svg'
import negativeFeedback from '../../assets/negative_feedback.svg'
import closeFeedbackOk from '../../assets/close_feedback_ok.svg'
import closeFeedbackNegative from '../../assets/close_feedback_negative.svg'
import { useEffect } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api'

export default function BillingsData() {
    const { bottomTinyModal, setTinyModalMessage, tinyModalMessage,
        negativeTinyModalMessage, setNegativeTinyModalMessage, bottomNegativeTinyModal,
        setSearchInputValue, searchInputValue,
        searchEndpoint,
        setHomeDataArrays, setErrorMessage,
        setArrayBillings, arrayBillings,
        setBillingsNotFound, setSeeAllJumper } = useConsumer()
    const token = getItem('token')

    async function fetchCharges() {
        try {
            const response = await api.get('/listagem-cobrancas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setArrayBillings(response.data)
        } catch (error) {
            setErrorMessage(error.response.data)
        }
    }

    function openBillingFilter() {
        console.log('calma');
    }

    function callBillingSearch(event, table) {
        if (event.key !== "Enter" && event.type === 'keydown') { return }
        if (searchInputValue === '') {
            setBillingsNotFound(false)
            return fetchCharges()
        }
        searchEndpoint(table, searchInputValue)
        setSearchInputValue('')
    }

    useEffect(() => {
        if (tinyModalMessage) {
            setTimeout(() => {
                setTinyModalMessage('')
            }, 3000)
        }
        if (negativeTinyModalMessage) {
            setTimeout(() => {
                setNegativeTinyModalMessage('')
            }, 3000)
        }

        // eslint-disable-next-line
    }, [tinyModalMessage, negativeTinyModalMessage])

    useEffect(() => {
        setHomeDataArrays(false)

        // eslint-disable-next-line
    }, [arrayBillings])

    return (
        <div className='billings-data'>
            <header className='billings-header'>
                <div className='billings-header--left'>
                    <BillingIcon
                        style={{ stroke: 'var(--cinza-200', fill: 'none', width: '3.2rem' }}
                    />
                    <h2 className='billings-header--tag'>Cobranças</h2>
                </div>
                <div className='billings-header--right'>
                    <img src={filterBtn} alt='filter_btn' onClick={openBillingFilter} className='filter-btn' />
                    <input
                        className='search-input'
                        value={searchInputValue}
                        placeholder='Pesquisa'
                        type='text'
                        onChange={(e) => setSearchInputValue(e.target.value)}
                        onKeyDown={(e) => callBillingSearch(e, 'cobranca')}
                    />
                    <img
                        src={searchIcon}
                        alt='search_icon'
                        className='search-icon'
                        onClick={(e) => callBillingSearch(e, 'cobranca')} />
                </div>
            </header >
            <BillingsBoard fetchCharges={fetchCharges} />

            {bottomTinyModal((appear, tinyModalMessage) =>
                tinyModalMessage &&
                <animated.div style={appear} className='positive-feedback'>
                    <div className='inner-tiny-modal-container'>
                        <img className='tiny-modal-icon' src={positiveFeedback} alt='client added' />
                        <span className='positive-feedback-text'>{tinyModalMessage}</span>
                    </div>
                    <img onClick={() => setTinyModalMessage('')} className='close-feedback tiny-close' src={closeFeedbackOk} alt='close' />
                </animated.div>
            )}
            {bottomNegativeTinyModal((appear, negativeTinyModalMessage) =>
                negativeTinyModalMessage &&
                <animated.div style={appear} className='negative-feedback'>
                    <div className='inner-tiny-modal-container'>
                        <img className='tiny-modal-icon' src={negativeFeedback} alt='cant-delete' />
                        <span className='negative-feedback-text tiny-modal-text'>{negativeTinyModalMessage}</span>
                    </div>
                    <img onClick={() => setNegativeTinyModalMessage('')} className='close-feedback tiny-modal-close' src={closeFeedbackNegative} alt='close' />
                </animated.div>
            )}
        </div >
    )
}