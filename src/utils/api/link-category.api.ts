import sleep from '../helpers/sleep';
import { Category, CategoryId, CategoryWithId } from '../schema-types';
import axiosObj from './axios';

export async function getCategories() {
  const res = await axiosObj('/link-categories');
  await sleep(500);
  return res.data;
}

export async function saveCategory(category: Category) {
  const res = await axiosObj<CategoryWithId>('/link-categories', {
    method: 'POST',
    data: category,
  });
  await sleep(500);
  return res.data;
}
