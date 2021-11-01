import classes from './Card.module.css';
import Modal from './Modal';

const Card = (props) => {
	return <Modal className={classes.card}>{props.children}</Modal>;
};

export default Card;
