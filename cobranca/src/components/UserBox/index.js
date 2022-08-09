import './styles.css'
import { ReactComponent as DownArrow } from '../../assets/down_arrow.svg'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import polygon from '../../assets/option_user_polygon.svg'
import editIcon from '../../assets/edit_icon.svg'
import exitIcon from '../../assets/exit_icon.svg'
import useConsumer from '../../hooks/useConsumer'
import FormUpdateUser from '../FormUpdateUser'

export default function UserBox() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [initials, setInitials] = useState('')
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)
    const { pageOption,
        modalType, setModalType,
        clearToken,
        userName } = useConsumer()


    function getInitials(name) {
        const nameArray = name.trim().split(' ')
        const firstLetter = nameArray[0].slice(0, 1)
        const secondLetter = nameArray[nameArray.length - 1].slice(0, 1)
        setFirstName(nameArray[0])
        setInitials(firstLetter.concat(secondLetter))
    }

    function handleLogout() {
        clearToken()
        navigate('/')
    }

    useEffect(() => {
        setIsOptionsOpen(false)
        getInitials(userName)
        // eslint-disable-next-line
    }, [pageOption, modalType, userName])

    return (
        <div className='userbox'>
            <div className='name-initials-userbox'>{initials}</div>
            <div className='name-userbox'>{firstName}</div>
            <DownArrow className='down-arrow-userbox' onClick={() => setIsOptionsOpen(!isOptionsOpen)} />
            {isOptionsOpen &&
                <div className='option-user-box'>
                    <img src={polygon} alt='polygon' className='polygon' />
                    <img src={editIcon} alt='edit' className='edit-icon' onClick={() => setModalType(<FormUpdateUser />)} />
                    <img src={exitIcon} alt='exit' className='exit-icon' onClick={() => handleLogout()} />
                </div>
            }
        </div>
    )
}