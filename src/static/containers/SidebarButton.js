import {connect} from 'react-redux';
import SidebarButtonUI from '../components/SidebarButtonUI';
import {toggleSidebar} from '../actions/sidebarActions';
import store from '../store';

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onSidebarButtonClicked : () => {
        dispatch(toggleSidebar());
    }
})

const SidebarButton = connect(mapStateToProps, mapDispatchToProps)(SidebarButtonUI);

export default SidebarButton;