import {connect} from 'react-redux';
import ProcrastinationResultUI from '../components/ProcrastinationResultUI';

const mapStateToProps = (state) => {
    return {
        answers: state.procrastination.answers
    }
}

const mapDispatchToProps = (dispatch) => ({})

const ProcrastinationResult = connect(mapStateToProps, mapDispatchToProps)(ProcrastinationResultUI);

export default ProcrastinationResult;
