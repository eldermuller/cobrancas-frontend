import { useEffect } from 'react'
import clientIcon from '../../assets/clients_icon.svg'
import editIcon from '../../assets/edit_icon_green.svg'
import useConsumer from '../../hooks/useConsumer'
import DetailClientBillings from '../DetailClientBillings'
import FormRegisterBilling from '../FormRegisterBilling'
import FormClient from '../FormClient'
import ClientsData from '../ClientsData'
import { animated } from 'react-spring'
import positiveFeedback from '../../assets/positive_feedback.svg'
import negativeFeedback from '../../assets/negative_feedback.svg'
import closeFeedbackOk from '../../assets/close_feedback_ok.svg'
import closeFeedbackNegative from '../../assets/close_feedback_negative.svg'
import NumberFormat from 'react-number-format'
import './styles.css'


export default function DetailClient() {
    const { adjustPhone,
        setModalType,
        dashboardContainer, setDashboardContainer,
        setIsNewClient,
        isClientAdded,
        currentClient,
        bottomTinyModal, setTinyModalMessage, tinyModalMessage,
        bottomNegativeTinyModal,
        setNegativeTinyModalMessage, negativeTinyModalMessage
    } = useConsumer()


    function handleOpenClientForm() {
        setIsNewClient(false)
        setModalType(<FormClient />)
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
        return () => {
        }
        //eslint-disable-next-line
    }, [dashboardContainer, isClientAdded, tinyModalMessage, negativeTinyModalMessage])

    return (
        <div className='detail-client--container'>
            <header className='detail-client--header'>
                <h1 className='title-1 detail-client--title'>
                    <img src={clientIcon} alt='client-icon' />
                    {currentClient.name}
                </h1>
                <button
                    className='pink-btn'
                    onClick={() => setDashboardContainer(<ClientsData />)}
                >
                    Voltar para clientes
                </button>
            </header>
            <div className='detail-client--data'>
                <h2 className='title-3-bold'>Dados do cliente</h2>
                <button
                    className='edit-client-btn'
                    onClick={() => handleOpenClientForm(currentClient)}
                >
                    <img src={editIcon} alt='edit-icon' className='edit-client-btn-icon' />
                    Editar Cliente
                </button>
                <div className='client-data--box-1'>
                    <div className='client-data--box-11'>
                        <h4 className='title-4 client-data--h4'>E-mail</h4>
                        <span className='client-data--span'>{currentClient.email}</span>
                    </div>
                    <div className='client-data--box-12'>
                        <h4 className='title-4 client-data--h4'>Telefone</h4>
                        <NumberFormat
                            value={currentClient.phone}
                            displayType={'text'}
                            format={adjustPhone(currentClient.phone)}
                            renderText={(value, props) => <span {...props} className='client-data--span'
                            >
                                {value}
                            </span>}
                        />
                    </div>
                    <div className='client-data--box-13'>
                        <h4 className='title-4 client-data--h4'>CPF</h4>
                        <NumberFormat
                            value={currentClient.cpf}
                            displayType={'text'}
                            format='###.###.###-##'
                            renderText={(value, props) => <span {...props} className='client-data--span'
                            >
                                {value}
                            </span>}
                        />
                    </div>

                </div>
                <div className='client-data--box-2'>
                    <div className='client-data--box-21'>
                        <h4 className='title-4 client-data--h4'>Endereço</h4>
                        <span className='client-data--span'>{currentClient.address}</span>
                    </div>
                    <div className='client-data--box-22'>
                        <h4 className='title-4 client-data--h4'>Bairro</h4>
                        <span className='client-data--span'>{currentClient.district}</span>
                    </div>
                    <div className='client-data--box-23'>
                        <h4 className='title-4 client-data--h4'>Complemento</h4>
                        <span className='client-data--span'>{currentClient.complement}</span>
                    </div>
                    <div className='client-data--box-24'>
                        <h4 className='title-4 client-data--h4'>CEP</h4>
                        <NumberFormat
                            value={currentClient.cep}
                            displayType={'text'}
                            format='##.###-###'
                            renderText={(value, props) => <span {...props} className='client-data--span'
                            >
                                {value}
                            </span>}
                        />
                    </div>
                    <div className='client-data--box-25'>
                        <h4 className='title-4 client-data--h4'>Cidade</h4>
                        <span className='client-data--span'>{currentClient.city}</span>
                    </div>
                    <div className='client-data--box-26'>
                        <h4 className='title-4 client-data--h4'>UF</h4>
                        <span className='client-data--span'>{currentClient.state}</span>
                    </div>
                </div>
            </div>
            <div className='detail-client--billings'>
                <h2 className='title-3-bold'>Cobranças do cliente</h2>
                <button
                    className='pink-btn detail-client--pink-btn'
                    onClick={() => setModalType(<FormRegisterBilling client={currentClient} />)}
                >
                    + Nova Cobrança
                </button>
                <DetailClientBillings />
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
        </div>

    )
}