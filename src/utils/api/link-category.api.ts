import { CategoryWithId } from '../schema-types';
import axiosObj from './axios';

export async function getCategories() {
  const res = await axiosObj('/link-categories');
  return res.data;
}

export async function saveCategory(category: CategoryWithId) {
  const endpoint = category.id > 0 ? `/link-categories/${category.id}` : '/link-categories';
  const method = category.id > 0 ? 'PUT' : 'POST';
  const res = await axiosObj<CategoryWithId>(endpoint, {
    method,
    data: category,
  });
  return res.data;
}

export async function deleteCategory(id: CategoryWithId['id']) {
  const endpoint = `/link-categories/${id}`;
  const method = 'DELETE';
  const res = await axiosObj<number>(endpoint, {
    method,
  });
  return res.data;
}
