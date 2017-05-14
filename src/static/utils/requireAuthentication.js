import React from 'react'
import {browserHistory} from 'react-router'
import {LOGIN_PATH} from '../config'
import {connect} from 'react-redux'


export default function requireAuthentication(Component) {

    class AuthenticationComponent extends React.Component {

        constructor(props){
            super(props)
            this.props = props

            this.checkAuth = this.checkAuth.bind(this)
        }

        static propTypes = {
            token: React.PropTypes.string,
            location: React.PropTypes.shape({
                pathname: React.PropTypes.string.isRequired
            }).isRequired
        }

        checkAuth() {
            if (this.props.token === null) { //redirect to login if user is not authenticated
                const next = this.props.location.pathname
                const redirectPath = `${LOGIN_PATH}?next=${next}`
                browserHistory.replace(redirectPath)
            }
        }

        componentWillMount(){
            this.checkAuth()
        }

        componentWillReceiveProps(nextProps){
            this.checkAuth()
        }

        render(){
            
            return (
                <div>
                    {this.props.token !== null
                    ? <Component {...this.props} />
                    : null}
                </div>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            token: state.user.token,
        }
    }

    const mapDispatchToProps= (dispatch) => {
        return {}
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticationComponent)

}

