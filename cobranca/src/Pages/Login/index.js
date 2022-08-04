import './style.css';
import FormLogin from '../../components/FormLogin';
import SideBarLogin from '../../components/SideBarLogin';


function Login() {

    return (
        <div className='container-main-login'>
            <SideBarLogin />
            <FormLogin />
        </div>
    )
}

export default Login;