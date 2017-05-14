import {connect} from 'react-redux';
import ProcrastinationForm from '../components/ProcrastinationForm';
import {storeProcEvaluation} from '../actions/evaluationActions';

/*const mapStateToProps = (state) => {
    return {
        username: state.user.username
    };
} */

const mapStateToProps = state => ({username: state.user.username})

const mapDispatchToProps = (dispatch) => ({
    storeAnswers: (answers) => { 
        dispatch(storeProcEvaluation(answers)) 
    }
})

const Procrastination = connect(mapStateToProps, mapDispatchToProps)(ProcrastinationForm);

export default Procrastination;