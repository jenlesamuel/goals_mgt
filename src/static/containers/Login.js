import {connect} from 'react-redux';
import LoginForm from '../components/LoginForm';
import {storeUser} from '../actions/userActions';
import  * as UserActions from '../actions/userActions'


const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps= (dispatch) => {
    return {
        storeUser : (user) => {
            dispatch(storeUser(user));
        }
    }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Login;