import { LinkCategory } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useLinks() {
  const [links, setLinks] = useState<LinkCategory[]>([]);
  const router = useRouter();
  const categoryId = router.query['category'];
  async function getData() {
    const res = await axios(`/api/links?categoryId=${categoryId}`);
    if (res.status === 200) {
      setLinks(res.data);
    } else {
      setLinks([]);
    }
  }

  useEffect(() => {
    if (categoryId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return { links };
}

export default useLinks;
