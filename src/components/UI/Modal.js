import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
	return <div className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElemet = document.getElementById('overlays');

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElemet)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElemet
			)}
		</>
	);
};

export default Modal;
