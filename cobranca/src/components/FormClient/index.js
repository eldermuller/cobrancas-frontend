import './styles.css'
import closeBtn from '../../assets/close_btn.svg'
import useConsumer from '../../hooks/useConsumer'
import useModalConsumer from '../../hooks/useModalConsumer'
import signupClientIcon from '../../assets/clients_icon.svg'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { getItem } from '../../utils/storage'
import NumberFormat from 'react-number-format'

export default function FormClient() {
    const { modalType, setModalType,
        arrayClients, setArrayClients,
        isNewClient,
        setIsClientAdded,
        setTinyModalMessage,
        handleCpfFormat, adjustPhone,
        phoneValue, setPhoneValue,
        isPhoneOk,
        cpfValue, setCpfValue,
        isCpfOk,
        setErrorMessage,
        currentClient, setCurrentClient,
        setHomeDataArrays,
        adjustDynamicPhoneFormat
    } = useConsumer()
    const token = getItem('token')

    const {
        nameModalError, setNameModalError,
        emailModalError, setEmailModalError,
        cpfModalError, setCpfModalError,
        phoneModalError, setPhoneModalError,
        clearModalInputError
    } = useModalConsumer()
    const [cepValue, setCepValue] = useState('')
    const [localTitle, setLocalTitle] = useState('')
    const [clientData, setClientData] = useState('')
    const [formFilled, setFormFilled] = useState()


    function handleCep(value) {
        if (value.toString().length !== 8) { return }
        fetch(`https://viacep.com.br/ws/${value}/json/`).then((response) => {
            const promiseBody = response.json()
            promiseBody.then((data) => {
                if (data.erro) { return }
                if (isNewClient) {
                    return setClientData({
                        ...clientData,
                        address: data.logradouro,
                        complement: data.complemento,
                        district: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    })
                }

                setClientData({
                    ...currentClient,
                    address: data.logradouro,
                    complement: data.complemento,
                    district: data.bairro,
                    city: data.localidade,
                    state: data.uf
                })
            })
        })
    }

    async function handleSubmitClient(e) {
        e.preventDefault()
        let formOk = true

        if (!clientData.name) {
            setNameModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!clientData.email) {
            setEmailModalError('Este campo deve ser preenchido')
            formOk = false
        }

        if (!isCpfOk) {
            setCpfModalError('CPF inválido')
            formOk = false
        }
        if (!clientData.cpf) {
            setCpfModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!isPhoneOk) {
            setPhoneModalError('Telefone inválido')
            formOk = false
        }
        if (!clientData.phone) {
            setPhoneModalError('Este campo deve ser preenchido')
            formOk = false
        }

        if (!formOk) { return }

        if (isNewClient) {

            try {
                const response = await api.post('/cadastro', {
                    nome: clientData.name,
                    email: clientData.email,
                    cpf: clientData.cpf,
                    telefone: clientData.phone,
                    cep: clientData.cep,
                    logradouro: clientData.address,
                    complemento: clientData.complement,
                    bairro: clientData.district,
                    cidade: clientData.city,
                    estado: clientData.state
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setArrayClients([...arrayClients, clientData])
                setTimeout(() => {
                    setTinyModalMessage(response.data)
                }, 1000)
                setIsClientAdded(true)
                setHomeDataArrays(false)
                setModalType('')
            } catch (error) {
                return setErrorMessage(error.response.data)
            }
        } else {
            try {
                const response = await api.patch(`/atualizar-cliente/${currentClient.id}`, {
                    nome: clientData.name,
                    email: clientData.email,
                    cpf: clientData.cpf,
                    telefone: clientData.phone,
                    cep: clientData.cep,
                    logradouro: clientData.address,
                    complemento: clientData.complement,
                    bairro: clientData.district,
                    cidade: clientData.city,
                    estado: clientData.state
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCurrentClient({ ...clientData })
                setTinyModalMessage(response.data)
                setModalType('')
                setHomeDataArrays(false)
                setIsClientAdded(true)
            } catch (error) {
                return setErrorMessage(error.response.data)
            }
        }

    }

    function handleChange(e) {
        clearModalInputError(e.target.name)
        const value = e.target.value;
        setClientData({ ...clientData, [e.target.name]: value })
        if (e.target.name === 'phone') { return setPhoneValue(value) }
        if (e.target.name === 'cpf') { return setCpfValue(value) }
        if (e.target.name === 'cep') { return setCepValue(value) }
    }

    function adjustNumberValues(values, target) {
        const { formattedValue, value } = values;
        clearModalInputError(target)
        setClientData({ ...clientData, [target]: value })
        if (target === 'cpf') { return setCpfValue(formattedValue) }
        if (target === 'cep') { return setCepValue(formattedValue) }
    }

    function handleReset() {
        setClientData({
            name: '',
            email: '',
            cpf: '',
            phone: '',
            address: '',
            complement: '',
            cep: '',
            district: '',
            city: '',
            state: ''
        })
        setCepValue('')
        setCpfValue('')
        setPhoneValue('')
    }

    function fillForm() {
        setClientData({ ...currentClient })
        setCpfValue(currentClient.cpf)
        setPhoneValue(currentClient.phone)
        setCepValue(currentClient.cep)
        setFormFilled(true)
    }

    function handleResetBtn() {
        setFormFilled(false)
        if (isNewClient) {
            handleReset()

        } else {
            fillForm()
        }
    }

    useEffect(() => {
    }, [formFilled])

    useEffect(() => {
        if (!isNewClient) {
            fillForm()
            setLocalTitle('Editar Cliente')
        } else {
            handleReset()
            setLocalTitle('Cadastro do Cliente')
        }

        return () => {
            setPhoneValue('')
        }
        // eslint-disable-next-line
    }, [modalType])


    return (
        <form className='general-form signup-client-form' onSubmit={(e) => handleSubmitClient(e)}>
            <img
                src={closeBtn}
                alt='close'
                onClick={() => setModalType('')}
                className='close-btn'
            />
            <div className='title-signup-client-form'>
                <img src={signupClientIcon} alt='client-icon' />
                <h1 className='title-1'>{localTitle}</h1>
            </div>
            <label className='modal-label'>
                Nome*
                <input
                    className='modal-input signup-client-input-large'
                    type='text'
                    placeholder='Digite seu nome'
                    name='name'
                    value={clientData.name}
                    onChange={(e) => handleChange(e)}
                    style={nameModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                />
                {nameModalError &&
                    <span className='modal-warning-message'>{nameModalError}</span>
                }
            </label>
            <label className='modal-label'>
                E-mail*
                <input
                    className='modal-input signup-client-input-large'
                    type='text'
                    placeholder='Digite seu e-mail'
                    name='email'
                    value={clientData.email}
                    onChange={(e) => handleChange(e)}
                    style={emailModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                />
                {emailModalError &&
                    <span className='modal-warning-message'>{emailModalError}</span>
                }
            </label>
            <div className='signup-client-input-line'>
                <label className='modal-label'>
                    CPF*
                    <NumberFormat
                        className='modal-input update-user-small'
                        format='###.###.###-##'
                        mask={'_'}
                        placeholder={'Digite seu CPF'}
                        value={cpfValue}
                        onValueChange={(values) => adjustNumberValues(values, 'cpf')}
                        style={cpfModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {cpfModalError &&
                        <span className='modal-warning-message'>{cpfModalError}</span>
                    }
                </label>
                <label className='modal-label'>
                    Telefone*
                    <NumberFormat
                        className='modal-input update-user-small'
                        mask={'_'}
                        placeholder={'Digite seu Telefone'}
                        format={(val) => adjustDynamicPhoneFormat(val)}
                        value={phoneValue}
                        onValueChange={(values) => adjustNumberValues(values, 'phone')}
                        style={phoneModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {phoneModalError &&
                        <span className='modal-warning-message'>{phoneModalError}</span>
                    }
                </label>
            </div>
            <label className='modal-label'>
                Endereço
                <input
                    className='modal-input signup-client-input-large'
                    type='text'
                    placeholder='Digite o endereço'
                    name='address'
                    value={clientData.address}
                    onChange={(e) => handleChange(e)}
                />
            </label>
            <label className='modal-label'>
                Complemento
                <input
                    className='modal-input signup-client-input-large'
                    type='text'
                    placeholder='Digite o complemento'
                    name='complement'
                    value={clientData.complement}
                    onChange={(e) => handleChange(e)}
                />
            </label>
            <div className='signup-client-input-line'>
                <label className='modal-label'>
                    CEP
                    <NumberFormat
                        className='modal-input update-user-small'
                        format='##.###-###'
                        mask={'_'}
                        placeholder={'Digite o CEP'}
                        value={cepValue}
                        onValueChange={(values) => adjustNumberValues(values, 'cep')}
                        onBlur={() => handleCep(clientData.cep)}
                    />
                </label>
                <label className='modal-label'>
                    Bairro
                    <input
                        className='modal-input signup-client-input-small'
                        type='text'
                        placeholder='Digite o bairro'
                        name='district'
                        value={clientData.district}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='signup-client-input-line'>
                <label className='modal-label'>
                    Cidade
                    <input
                        className='modal-input signup-client-input-cidade'
                        type='text'
                        placeholder='Digite o Cidade'
                        name='city'
                        value={clientData.city}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
                <label className='modal-label'>
                    UF
                    <input
                        className='modal-input signup-client-input-uf'
                        type='text'
                        placeholder='Digite a UF'
                        name='state'
                        value={clientData.state}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='btn-line'>
                <button className='signup-client-reset-btn' type='button' onClick={() => handleResetBtn()}>Cancelar</button>
                <button className='signup-client-submit-btn pink-btn'>Aplicar</button>
            </div>
        </form>
    )
}