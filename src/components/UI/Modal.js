import classes from './Modal.module.css';
import React from 'react';
import ReactDOM from 'react-dom';

const BackDrops = (props) => {
    return <div className={classes.backdrop}
        onClick={() => props.onHideCart()}>
        {/* {props.children} */}
    </div>
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>
            {props.children}
        </div>
    </div>
}

const Modal = props => {
    const PortalEl = document.getElementById('modal-root');

    return <React.Fragment>
        {ReactDOM.createPortal(<BackDrops onHideCart={props.onHideCart} />, PortalEl)}

        {ReactDOM.createPortal(<ModalOverlay>
            {props.children}
        </ModalOverlay>, PortalEl)}

    </React.Fragment>
}

export default Modal;