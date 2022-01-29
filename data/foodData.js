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
    },
    {
      id: 6,
      name: "Tomato & Basil Pizza",
      photo: images.pizza,
      calories: 250,
    },
  ],
  snacks: [
    {
      id: 7,
      name: "Hot Dog",
      photo: images.chicago_hot_dog,
      calories: 100,
    },
    {
      id: 8,
      name: "Ice Kacang",
      photo: images.ice_kacang,
      calories: 100,
    },
  ],
  lunch: [
    {
      id: 9,
      name: "Salad",
      photo: images.salad,
      calories: 50,
    },
    {
      id: 10,
      name: "Sushi",
      photo: images.sushi,
      calories: 150,
    },
  ],
  breakfast: [
    {
      id: 11,
      name: "Veg Sandwich",
      photo: images.sandwich,
      calories: 190,
    },
  ],
};

export default {
  mealData,
  foodData,
};
