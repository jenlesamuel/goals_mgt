import NavbarUI from '../components/NavbarUI';
import {connect} from 'react-redux';
import {logoutAndRedirect} from '../actions/userActions';

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        fullname: state.user.fullname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutAndRedirect())
        }
    }
}

const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarUI);

export default Navbar;
