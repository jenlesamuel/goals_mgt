import AppUI from './AppUI';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    sidebarVisible: state.sidebarVisible
}); 


const mapDispatchToProps = dispatch => ({});

const App = connect(mapStateToProps, mapDispatchToProps)(AppUI);

export default App;
