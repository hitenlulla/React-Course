import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  const responseHandler = (data) => {
    const loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }

    setMeals(loadedMeals);
  };

  useEffect(() => {
    sendRequest(
      {
        url: "https://react-http-5463b-default-rtdb.firebaseio.com/meals.json",
      },
      responseHandler
    );
  }, []);

  if (isLoading) {
    return <p className={classes["meals-loading"]}>Loading...</p>;
  }

  if (error) {
    return (
      <p className={classes["meals-error"]}>Something went wrong: {error}</p>
    );
  }

  const mealList = meals.map((meal) => (
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
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}
