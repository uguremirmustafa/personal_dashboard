import * as z from 'zod';
import {
  BaseIngredient,
  ID,
  CategoryId,
  Ingredient,
  IngredientWithId,
  PartialIngredient,
  PartialIngredientWithId,
  Recipe,
  RecipeAndIngredients,
  RecipeIngredient,
  RecipeIngredientWithId,
  RecipeWithId,
  Search,
  Unit,
  UnitWithId,
  User,
  UserWithId,
  LinkItem,
  LinkWithId,
  LinkItemWithCategoryIdList,
  Credentials,
  Category,
  CategoryWithId,
} from './schemas/schemas';

// id
export type ID = z.infer<typeof ID>;

// categoryId
export type CategoryId = z.infer<typeof CategoryId>;

// search
export type Search = z.infer<typeof Search>;

// user
export type User = z.infer<typeof User>;
export type UserWithId = z.infer<typeof UserWithId>;

// auth
export type Credentials = z.infer<typeof Credentials>;

// food_category
export type Category = z.infer<typeof Category>;
export type CategoryWithId = z.infer<typeof CategoryWithId>;

// ingredient
export type IngredientParams = z.infer<typeof ID>;
export type Ingredient = z.infer<typeof Ingredient>;
export type IngredientWithId = z.infer<typeof IngredientWithId>;
export type BaseIngredient = z.infer<typeof BaseIngredient>;
export type PartialIngredient = z.infer<typeof PartialIngredient>;
export type PartialIngredientWithId = z.infer<typeof PartialIngredientWithId>;

// recipe
export type Recipe = z.infer<typeof Recipe>;
export type RecipeWithId = z.infer<typeof RecipeWithId>;
export type RecipeIngredient = z.infer<typeof RecipeIngredient>;
export type RecipeIngredientWithId = z.infer<typeof RecipeIngredientWithId>;
export type RecipeAndIngredients = z.infer<typeof RecipeAndIngredients>;

// unit
export type Unit = z.infer<typeof Unit>;
export type UnitWithId = z.infer<typeof UnitWithId>;

// link
export type LinkItem = z.infer<typeof LinkItem>;
export type LinkItemWithId = z.infer<typeof LinkWithId>;
export type LinkItemWithCategoryIdList = z.infer<typeof LinkItemWithCategoryIdList>;
