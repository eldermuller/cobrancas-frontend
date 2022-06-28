import './style.css'
import notFoundBig from '../../assets/not_found_big.svg'
import notFoundSmall from '../../assets/not_found_small.svg'

export default function NotFound() {
    return (
        <div className='not-found-container'>
            <div className='not-found-content'>
                <img src={notFoundSmall} alt='not-found' className='not-found-img-small' />
                <img src={notFoundBig} alt='not-found' className='not-found-img-big' />
                <h3 className='not-found-msg-1'>Nenhum resultado foi encontrado!</h3>
                <h4 className='not-found-msg-2'>Verifique se a escrita está correta</h4>
            </div>
        </div>
    )
}