import axiosObj from '@/utils/api/axios';
import { CategoryWithId } from '@/utils/schema-types';
import { useEffect, useState } from 'react';

function useLinkCategories() {
  const [categories, setCategories] = useState<CategoryWithId[]>([]);

  async function getCategories() {
    const res = await axiosObj('/link-categories');
    if (res.status === 200) {
      setCategories(res.data);
    } else {
      setCategories([]);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, getCategories };
}

export default useLinkCategories;
