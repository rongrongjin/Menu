import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [meal, setMeal] = useState([]);

  async function realmUser() {
    let app = new Realm.App({ id: "menu-jghnb" });
    const credentials = Realm.Credentials.anonymous();

    try {
      let user = await app.logIn(credentials);

      let result = user
        .callFunction("getProduct")
        .then((response) => console.log(response));

      setMeal(result);
    } catch (errors) {
      console.log(errors);
    }
  }

  useEffect(() => {
    realmUser();
  }, []);

  const mealsList = meal.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
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
