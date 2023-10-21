import axiosObj from '@/utils/api/axios';
import { CategoryWithId } from '@/utils/schema-types';
import { useQuery } from 'react-query';

async function getCategories() {
  const res = await axiosObj('/link-categories');
  return res.data;
}

function useLinkCategories() {
  const result = useQuery<CategoryWithId[]>('link_categories', getCategories);

  return result;
}

export default useLinkCategories;
