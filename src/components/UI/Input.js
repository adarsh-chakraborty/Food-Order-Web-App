import classes from './Input.module.css';

const Import = (props) => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input {...props.input} />
		</div>
	);
};
export default Import;
