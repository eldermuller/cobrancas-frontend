import './styles.css'
import { ReactComponent as HomeIcon } from '../../assets/home_icon.svg'
import { ReactComponent as ClientesIcon } from '../../assets/clients_icon_component.svg'
import { ReactComponent as BillingIcon } from '../../assets/billing_icon.svg'
import { useEffect, useState } from 'react'
import useConsumer from '../../hooks/useConsumer'

export default function Sidebar() {
    const { pageOption, setPageOption } = useConsumer()
    const [selectedConfig, setSelectedConfig] = useState({
        barTop: '',
        homeColor: '',
        clientsColor: '',
        billingColor: ''
    })

    function selectContainer() {
        if (pageOption === 'home') {
            return setSelectedConfig({
                barTop: '4.9rem',
                homeColor: 'var(--rosa-medio)',
                clientsColor: 'var(--cinza-100)',
                billingColor: 'var(--cinza-100)'
            })
        }
        if (pageOption === 'clients') {
            return setSelectedConfig({
                barTop: '19.2rem',
                homeColor: 'var(--cinza-100)',
                clientsColor: 'var(--rosa-medio)',
                billingColor: 'var(--cinza-100)'
            })
        }
        if (pageOption === 'billing') {
            return setSelectedConfig({
                barTop: '33.5rem',
                homeColor: 'var(--cinza-100)',
                clientsColor: 'var(--cinza-100)',
                billingColor: 'var(--rosa-medio)'
            })
        }
    }

    useEffect(() => {
        selectContainer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageOption])

    return (
        <div className='sidebar'>
            <nav className='sidebar-container'>
                <div className='sidebar-option' onClick={() => setPageOption('home')}>
                    <HomeIcon className='sidebar-icons' stroke={selectedConfig.homeColor} />
                    <span className='sidebar-tags' style={{ color: selectedConfig.homeColor }}>Home</span>
                </div>
                <div className='sidebar-option' onClick={() => setPageOption('clients')}>
                    <ClientesIcon className='sidebar-icons' stroke={selectedConfig.clientsColor} />
                    <span className='sidebar-tags' style={{ color: selectedConfig.clientsColor }}>Clientes</span>
                </div>
                <div className='sidebar-option' onClick={() => setPageOption('billing')}>
                    <BillingIcon className='sidebar-icons' stroke={selectedConfig.billingColor} />
                    <span className='sidebar-tags' style={{ color: selectedConfig.billingColor }}>Cobranças</span>
                </div>
            </nav>
            <div className='selection-bar'>
                <div className='selected-option' style={{ top: selectedConfig.barTop }} />
            </div>
        </div>
    )
}