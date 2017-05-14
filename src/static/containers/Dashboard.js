import DashboardUI from '../components/DashboardUI';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        userId: state.user.id,
        token:  state.user.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUI);