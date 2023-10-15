import { LinkCategory } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

function useLinkCategories() {
  const [categories, setCategories] = useState<LinkCategory[]>([]);

  async function getCategories() {
    const res = await axios('/api/link_categories');
    if (res.status === 200) {
      setCategories(res.data);
    } else {
      setCategories([]);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return { categories };
}

export default useLinkCategories;
