import { useState } from "react";
import { useTransition } from 'react-spring'
import { useNavigate } from 'react-router-dom'
import HomeData from "../components/HomeData";
import api from "../services/api";
import { getItem } from "../utils/storage";


function useProvider() {
    const token = getItem('token')
    const navigate = useNavigate()
    const [homeDataArrays, setHomeDataArrays] = useState(false)
    const [okClientsArray, setOkClientsArray] = useState([])
    const [inDebtClientsArray, setInDebtClientsArray] = useState([])
    const [expiredBillsArray, setExpiredBillsArray] = useState([])
    const [paidBillsArray, setPaidBillsArray] = useState([])
    const [futureBillsArray, setFutureBillsArray] = useState([])
    const [phoneValue, setPhoneValue] = useState('')
    const [isPhoneOk, setIsPhoneOk] = useState(true)
    const [cpfValue, setCpfValue] = useState('')
    const [isCpfOk, setIsCpfOk] = useState(true)
    const [isNewClient, setIsNewClient] = useState(true)
    const [modalType, setModalType] = useState('')
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        phone: ''
    })
    const [dashboardContainer, setDashboardContainer] = useState(<HomeData />)
    const [isClientAdded, setIsClientAdded] = useState(false)
    const [currentClient, setCurrentClient] = useState({})
    const [isBillingAdded, setIsBillingAdded] = useState(false)
    const [pageOption, setPageOption] = useState('home')
    const [listType, setListType] = useState(0)
    const [activeStep, setActiveStep] = useState(0);
    const [signupOk, setSignupOk] = useState(false)
    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''

    });
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfError, setPasswordConfError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [tinyModalMessage, setTinyModalMessage] = useState('')
    const [negativeTinyModalMessage, setNegativeTinyModalMessage] = useState('Conta cadastrada com sucesso!!!!')
    const [arrayClients, setArrayClients] = useState([])
    const [arrayBillings, setArrayBillings] = useState([])
    const [chargeStatus, setChargeStatus] = useState('Cobrança Pendente')

    const [clientListOrder, setClientListOrder] = useState(false)
    const [billingOrderByClient, setBillingOrderByClient] = useState(false)
    const [billingOrderById, setBillingOrderById] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState('')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [seeAllJumper, setSeeAllJumper] = useState(false)
    const [clientsNotFound, setClientsNotFound] = useState(false)
    const [billingsNotFound, setBillingsNotFound] = useState(false)


    const topErrorTransition = useTransition(errorMessage, {
        from: { right: '0rem', opacity: 0, top: '8rem' },
        enter: { right: '10.8rem', opacity: 1, top: '8rem' },
        leave: { right: '0rem', opacity: 0, top: '8rem' },
        config: { mass: 1, tension: 100, friction: 100, bounce: 4, duration: 100 }
    })

    const bottomErrorTransition = useTransition(errorMessage, {
        from: { right: '0rem', opacity: 0, bottom: '9rem' },
        enter: { right: '10.8rem', opacity: 1, bottom: '9rem' },
        leave: { right: '0rem', opacity: 0, bottom: '9rem' },
        config: { mass: 1, tension: 600, friction: 10, duration: 100 }
    })

    const bottomTinyModal = useTransition(tinyModalMessage, {
        from: { right: '0rem', opacity: 0, bottom: '6.6rem' },
        enter: { right: '11.2rem', opacity: 1, bottom: '6.6rem' },
        leave: { right: '0rem', opacity: 0, bottom: '6.6rem' },
        config: { mass: 1, tension: 600, friction: 10, duration: 100 }
    })

    const bottomNegativeTinyModal = useTransition(negativeTinyModalMessage, {
        from: { right: '0rem', opacity: 0, bottom: '6.6rem' },
        enter: { right: '11.2rem', opacity: 1, bottom: '6.6rem' },
        leave: { right: '0rem', opacity: 0, bottom: '6.6rem' },
        config: { mass: 1, tension: 600, friction: 10, duration: 100 }
    })

    function clearInputError(value) {
        if (value === 'name') { return setNameError('') }
        if (value === 'email') { return setEmailError('') }
        if (value === 'password') { return setPasswordError('') }
        if (value === 'confirmPassword') { return setPasswordConfError('') }
    }

    function toLogin() {
        setLoginForm({ email: '', password: '' })
        clearInputError('email')
        clearInputError('password')
        navigate('/')
    }



    const adjustValue = (value) => {

        if (!value) { return '' }
        if (value.length === 1) { return `R$ 0,0${value}` }
        if (value.length === 2) { return `R$ 0,${value}` }
        if (value.length >= 3 && value.length < 6) {
            return `R$ ${value.slice(0, -2)},${value.slice(-2)}`
        }
        if (value.length >= 6 && value.length < 9) {
            return `R$ ${value.slice(0, -5)}.${value.slice(-5, -2)},${value.slice(-2)}`
        }
        if (value.length >= 9 && value.length < 12) {
            return `R$ ${value.slice(0, -8)}.${value.slice(-8, -5)}.${value.slice(-5, -2)},${value.slice(-2)}`
        }
    }

    const adjustDate = (date) => {
        return `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4)}`
    }

    const adjustInvertedDate = (date) => {
        if (!date) { return }
        return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(2, 4)}`
    }

    const adjustPhone = (phone) => {
        if (phone.length <= 8) { return '####-####' }
        if (phone.length === 9) { return '#.####-####' }
        if (phone.length === 10) { return '(##) ####-####' }
        if (phone.length === 11) { return '(##) #.####-####' }
    }

    const adjustDynamicPhoneFormat = (val) => {
        if (val.length > 11) return
        const ddd = val.substring(0, 2)
        let nine
        let firstFour = val.substring(2, 6)
        let lastFour = val.substring(6)
        setPhoneValue(val);
        if (val.length === 0) { return console.log('entra aqui'); }
        if (val.length === 1) { return `(${ddd}_) ____-____` }
        if (val.length === 2) { return `(${ddd}) ____-____` }
        if (val.length === 3) { return `(${ddd}) ${firstFour}___-____` }
        if (val.length === 4) { return `(${ddd}) ${firstFour}__-____` }
        if (val.length === 5) { return `(${ddd}) ${firstFour}_-____` }
        if (val.length === 6) { return `(${ddd}) ${firstFour}-____` }
        if (val.length === 7) { return `(${ddd}) ${firstFour}-${lastFour}___` }
        if (val.length === 8) { return `(${ddd}) ${firstFour}-${lastFour}__` }
        if (val.length === 9) { return `(${ddd}) ${firstFour}-${lastFour}_` }
        if (val.length === 10) { return `(${ddd}) ${firstFour}-${lastFour}` }
        if (val.length === 11) {
            nine = val.substring(2, 3)
            firstFour = val.substring(3, 7)
            lastFour = val.substring(7)
            return `(${ddd}) ${nine}.${firstFour}-${lastFour}`
        }
    }

    function handlePhoneFormat(value) {

        if (isNaN(value)) { return setIsPhoneOk(false) }
        if (value.length === 0) { return setIsPhoneOk(true) }

        if (value.length < 8 || value.length > 11) { return setIsPhoneOk(false) }

        if (isNaN(value)) {
            return setIsPhoneOk(false)
        }

        if (value.length === 8) {
            setPhoneValue(`${value.slice(0, 4)} -${value.slice(4)} `)
        }
        if (value.length === 9) {
            setPhoneValue(`${value.slice(0, 1)}.${value.slice(1, 5)} -${value.slice(5)} `)
        }
        if (value.length === 10) {
            setPhoneValue(`(${value.slice(0, 2)}) ${value.slice(2, 6)} -${value.slice(6)} `)
        }
        if (value.length === 11) {
            setPhoneValue(`(${value.slice(0, 2)}) ${value.slice(2, 3)}.${value.slice(3, 7)} -${value.slice(7)} `)
        }

        setIsPhoneOk(true)
    }

    function handleCpfFormat(value) {
        if (isNaN(value)) { return setIsCpfOk(false) }
        if (value.length !== 0 && value.length !== 11) { return setIsCpfOk(false) }
        if (value.length === 11) {
            setCpfValue(`${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`)
        }
        return setIsCpfOk(true)
    }

    async function searchEndpoint(table, input) {

        try {
            const response = await api.get(`/busca?tabela=${table}&input=${input}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (table === 'cliente') {
                setArrayClients(response.data)
            }
            if (table === 'cobranca') {
                setArrayBillings(response.data)
            }
            if (response.data.length === 0) {
                setClientsNotFound(true)
                setBillingsNotFound(true)
                return
            }

            setClientsNotFound(false)
            setBillingsNotFound(false)

        } catch (error) {
            return setErrorMessage(error.response.data)
        }
    }

    return {
        modalType, setModalType,
        user, setUser,
        isClientAdded, setIsClientAdded,
        pageOption, setPageOption,
        listType, setListType,
        activeStep, setActiveStep,
        signupForm, setSignupForm,
        loginForm, setLoginForm,
        nameError, setNameError,
        emailError, setEmailError,
        passwordError, setPasswordError,
        passwordConfError, setPasswordConfError,
        clearInputError,
        errorMessage, setErrorMessage,
        tinyModalMessage, setTinyModalMessage,
        signupOk, setSignupOk,
        arrayClients, setArrayClients,
        arrayBillings, setArrayBillings,
        isBillingAdded, setIsBillingAdded,
        chargeStatus, setChargeStatus,
        topErrorTransition, bottomErrorTransition,
        bottomTinyModal,
        toLogin,
        isNewClient, setIsNewClient,
        adjustValue, adjustDate, adjustInvertedDate,
        adjustPhone, adjustDynamicPhoneFormat,
        dashboardContainer, setDashboardContainer,
        handleCpfFormat, handlePhoneFormat,
        phoneValue, setPhoneValue,
        isPhoneOk, setIsPhoneOk,
        cpfValue, setCpfValue,
        isCpfOk, setIsCpfOk,
        currentClient, setCurrentClient,
        clientListOrder, setClientListOrder,
        billingOrderByClient, setBillingOrderByClient,
        billingOrderById, setBillingOrderById,
        searchEndpoint,
        searchInputValue, setSearchInputValue,
        okClientsArray, setOkClientsArray,
        inDebtClientsArray, setInDebtClientsArray,
        expiredBillsArray, setExpiredBillsArray,
        paidBillsArray, setPaidBillsArray,
        futureBillsArray, setFutureBillsArray,
        homeDataArrays, setHomeDataArrays,
        negativeTinyModalMessage, setNegativeTinyModalMessage, bottomNegativeTinyModal,
        isFilterOpen, setIsFilterOpen,
        seeAllJumper, setSeeAllJumper,
        clientsNotFound, setClientsNotFound,
        billingsNotFound, setBillingsNotFound
    }
}

export default useProvider