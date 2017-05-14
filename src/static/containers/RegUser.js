import RegUserForm from '../components/RegUserForm';
import {storeUser} from '../actions/userActions'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};


const RegUser = connect(mapStateToProps, mapDispatchToProps)(RegUserForm);
export default RegUser;