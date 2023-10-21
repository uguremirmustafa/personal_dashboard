import * as z from 'zod';

export const ID = z.object({
  id: z.coerce.number(),
});

export const CategoryId = z.object({
  categoryId: z.coerce.number(),
});

export const Search = z.object({
  q: z.string(),
});

export const Credentials = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const User = Credentials.merge(
  z.object({
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
  })
);

export const UserWithId = User.merge(ID);

export const Category = z.object({
  name: z.string(),
});

export const CategoryLinkCount = z.object({
  _count: z.object({ links: z.number() }),
});

export const CategoryWithLinkCounts = Category.merge(CategoryLinkCount);
export const CategoryWithId = Category.merge(ID);
export const CategoryWithIdAndLinkCounts = Category.merge(ID).merge(CategoryLinkCount);

export const Ingredient = z.object({
  name: z.string(),
  image: z.string().nullish(),
  description: z.string().nullish(),
  food_category_id: z.number(),
});

export const LinkItem = z.object({
  name: z.string().min(3, 'Come on dude, at least 3 chars 😒'),
  path: z.string().url('I think this is not a proper URL 👨‍💻'),
  icon: z.string().default(''),
});

const CategoryIdList = z.object({
  categoryIds: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      })
    )
    .min(1, 'I need at least one category dude!'),
});
export const LinkItemWithCategoryIdList = LinkItem.merge(CategoryIdList).merge(ID);

export const IngredientWithId = Ingredient.merge(ID);
export const LinkWithId = LinkItem.merge(ID);
export const BaseIngredient = IngredientWithId.pick({ id: true, name: true });
export const PartialIngredient = Ingredient.partial();
export const PartialIngredientWithId = IngredientWithId.partial();

export const Recipe = z.object({
  name: z.string(),
  description: z.string().nullish(),
  image: z.string().nullish(),
  users_id: z.number().nullish(),
  for_x_person: z.number().nullish(),
  prep_time: z.number().nullish(),
  cooking_time: z.number().nullish(),
});
export const RecipeWithId = Recipe.merge(ID);

export const RecipeIngredient = z.object({
  recipe_id: z.number(),
  ingredient_id: z.number(),
  amount: z.number(),
  unit_id: z.number(),
});
export const RecipeIngredientWithId = RecipeIngredient.merge(ID);

export const RecipeAndIngredients = Recipe.merge(
  z.object({
    ingredients: RecipeIngredient.omit({ recipe_id: true }).array(),
  })
);

export const Unit = z.object({
  code: z.string(),
});
export const UnitWithId = Unit.merge(ID);
