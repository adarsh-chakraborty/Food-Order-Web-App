import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	// const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchMeals = async () => {
			const res = await fetch(
				'https://fir-demo-a3f3e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
			);
			const mealsObj = await res.json();

			const loadedMeals = [];

			for (const key in mealsObj) {
				console.log(key);
				loadedMeals.push({
					id: key,
					name: mealsObj[key].name,
					description: mealsObj[key].description,
					price: mealsObj[key].price
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals();
	}, []);

	// useEffect never runs again cuz no dependencies.
	// No props, No external dependencies.
	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}
	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
