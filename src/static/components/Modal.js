import React from 'react';
import classNames from 'classnames'

class Modal extends React.Component {

    constructor(props){
        super(props);
        this.props = props;
        this.closeModal = this.closeModal.bind(this);
    }

    static propTypes = {
        header: React.PropTypes.string,
        body: React.PropTypes.any.isRequired,
        footer: React.PropTypes.string
    }

    closeModal = () => {
        const modal = document.getElementsByClassName('g-modal')[0];
        modal.style.display = 'none';
    }

    render() {
        const {header, body, footer} = this.props;
        const modalClassNames = classNames({
            row: true,
            'g-modal': true
        })

        return (
            <div>
                <div className={modalClassNames}>
                    <div className='g-modal-content col-md-10 col-md-offset-1'>
                        <div className='close-btn' onClick={this.closeModal}> &times;</div>
                        <div className='g-modal-header'>{header}</div>
                        <div className='g-modal-body'>{body}</div>
                        <div className='g-modal-footer'>{footer} </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;