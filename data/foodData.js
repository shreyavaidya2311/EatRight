import { icons, images } from "../constants";

export const mealData = [
  {
    id: 1,
    label: "breakfast",
    name: "Breakfast",
    icon: icons.breakfast,
  },
  {
    id: 2,
    label: "lunch",
    name: "Lunch",
    icon: icons.lunch,
  },
  {
    id: 3,
    label: "snacks",
    name: "Snacks",
    icon: icons.snacks,
  },
  {
    id: 4,
    label: "dinner",
    name: "Dinner",
    icon: icons.dinner,
  },
];

export const foodData = {
  dinner: [
    {
      id: 5,
      name: "Chicken Burger",
      photo: images.crispy_chicken_burger,
      calories: 200,
      carbohydrates: 100,
      protein: 10,
      fat: 110,
      fiber: 231,
      date: "26-01-2022",
    },
    {
      id: 6,
      name: "Tomato & Basil Pizza",
      photo: images.pizza,
      calories: 250,
      carbohydrates: 100,
      protein: 10,
      fat: 110,
      fiber: 231,
      date: "29-01-2022",
    },
  ],
  snacks: [
    {
      id: 7,
      name: "Hot Dog",
      photo: images.chicago_hot_dog,
      calories: 100,
      carbohydrates: 100,
      protein: 10,
      fat: 110,
      fiber: 231,
      date: "22-01-2022",
    },
  ],
  lunch: [
    {
      id: 9,
      name: "Salad",
      photo: images.salad,
      calories: 50,
      carbohydrates: 100,
      protein: 10,
      fat: 110,
      fiber: 231,
      date: "27-01-2022",
    },
    {
      id: 10,
      name: "Sushi",
      photo: images.sushi,
      calories: 150,
      carbohydrates: 100,
      protein: 10,
      fat: 110,
      fiber: 231,
      date: "29-01-2022",
    },
  ],
  breakfast: [
    {
      id: 11,
      name: "Veg Sandwich",
      photo: images.sandwich,
      calories: 190,
      carbohydrates: 100,
      protein: 10,
      fat: 110,
      fiber: 231,
      date: "28-01-2022",
    },
  ],
};

export default {
  mealData,
  foodData,
};
