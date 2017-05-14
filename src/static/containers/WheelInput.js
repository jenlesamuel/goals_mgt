import {connect} from 'react-redux';
import WheelInputForm from '../components/WheelInputForm';
import {fetchWheelData} from '../actions/evaluationActions'

const mapStateToProps = (state) => {
    return {
        myToken: state.user.token,
        isFetching: state.wheel.isFetching,
        errorText: state.wheel.errorText,
        //initialValues: state.wheel.item
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        fetchWheelData: (token) => {
            dispatch(fetchWheelData(token))
        }
    };
}

const WheelInput = connect(mapStateToProps, mapDispatchToProps)(WheelInputForm);

export default WheelInput;