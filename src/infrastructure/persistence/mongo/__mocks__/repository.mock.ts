import {
  IngredientMongo,
  MealPlannerMongo,
  RecipeMongo,
  UserMongo,
} from '@infrastructure/persistence';

export const ingredientMongo: IngredientMongo = {
  _id: '5f9b9b9b9b9b9b9b9b9b9b9b',
  name: 'Ingredient',
  photoUrl: 'http://photo.com',
  description: 'Description',
};

export const mealPlannerMongo: MealPlannerMongo = {
  _id: '5f9b9b9b9b9b9b9b9b9b9b9b',
  amount: [
    {
      amount: 1,
      ingredientId: '5f9b9b9b9b9b9b9b9b9b9b9b',
    },
  ],
  name: 'MealPlanner',
  notes: 'Notes',
};

export const recipeMongo: RecipeMongo = {
  _id: '5f9b9b9b9b9b9b9b9b9b9b9b',
  ingredients: [
    {
      amount: 1,
      ingredientId: '5f9b9b9b9b9b9b9b9b9b9b9b',
    },
  ],
  name: 'Recipe',
  notes: 'Notes',
  description: 'Description',
  photoUrl: 'http://photo.com',
  servings: 1,
  steps: ['Step 1', 'Step 2'],
  nutritionInfo: 'Nutrition Info',
  userId: '5f9b9b9b9b9b9b9b9b9b9b9b',
};

export const userMongo: UserMongo = {
  email: 'example@gmail.com',
  googleId: 'googleId',
  name: 'Name',
  photoUrl: 'http://photo.com',
  _id: '5f9b9b9b9b9b9b9b9b9b9b9b',
  mealPlannerId: '5f9b9b9b9b9b9b9b9b9b9b9b',
};

export const id = '5f9b9b9b9b9b9b9b9b9b9b9b';
