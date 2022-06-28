import './styles.css'
import { ReactComponent as ClientsIcon } from '../../assets/clients_icon_component.svg'
import filterBtn from '../../assets/filter_btn.svg'
import searchIcon from '../../assets/search_icon.svg'
import ClientsList from '../ClientsList'
import FormClient from '../FormClient'
import { animated } from 'react-spring'
import useConsumer from '../../hooks/useConsumer'
import closeFeedbackOk from '../../assets/close_feedback_ok.svg'
import positiveFeedback from '../../assets/positive_feedback.svg'
import { useEffect } from 'react'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

export default function ClientsData() {
    const { setModalType,
        setIsNewClient,
        bottomTinyModal,
        tinyModalMessage, setTinyModalMessage,
        searchEndpoint,
        searchInputValue, setSearchInputValue,
        setArrayClients, setErrorMessage,
        setClientsNotFound } = useConsumer()
    const token = getItem('token')

    async function fetchClients() {
        try {
            const response = await api.get('/listar-clientes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setArrayClients(response.data)
        } catch (error) {
            setErrorMessage(error.response.data)
        }
    }

    function handleOpenClientForm() {
        setIsNewClient(true)
        setModalType(<FormClient />)
    }

    function callClientSearch(event, table) {
        if (event.key !== "Enter" && event.type === 'keydown') { return }
        if (searchInputValue === '') {
            setClientsNotFound(false)
            return fetchClients()
        }
        searchEndpoint(table, searchInputValue)
        setSearchInputValue('')
    }

    useEffect(() => {
        setSearchInputValue('')
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (tinyModalMessage) {
            setTimeout(() => {
                setTinyModalMessage('')
            }, 3000)
        }
        //eslint-disable-next-line
    }, [tinyModalMessage])

    return (
        <div className='clients-data'>
            <header className='clients-header'>
                <div className='clients-header--left'>
                    <ClientsIcon
                        style={{ stroke: 'var(--cinza-200', fill: 'none', width: '3.2rem' }}
                    />
                    <h2 className='client-header--tag'>Clientes</h2>
                </div>
                <div className='clients-header--right'>
                    <button className='pink-btn' onClick={() => handleOpenClientForm()}>+ Adicionar Cliente</button>
                    <img src={filterBtn} alt='filter_btn' className='filter-btn' />
                    <input
                        className='search-input'
                        value={searchInputValue}
                        placeholder='Pesquisa'
                        type='text'
                        onChange={(e) => setSearchInputValue(e.target.value)}
                        onKeyDown={(e) => callClientSearch(e, 'cliente')}
                    />
                    <img
                        src={searchIcon}
                        alt='search_icon'
                        className='search-icon'
                        onClick={(e) => callClientSearch(e, 'cliente')} />
                </div>
            </header >
            <ClientsList fetchClients={fetchClients} />
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

        </div >
    )
}