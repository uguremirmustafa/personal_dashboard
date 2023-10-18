import { LinkCategory } from '@/types';
import axiosObj from '@/utils/api/axios';
import { LinkItem, LinkItemWithCategoryIdList } from '@/utils/schema-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useLinks() {
  const [links, setLinks] = useState<LinkItemWithCategoryIdList[]>([]);
  const router = useRouter();
  const categoryId = router.query['category'];
  async function getData() {
    const res = await axiosObj(`/link/${categoryId}`);
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

  return { links, getData };
}

export default useLinks;
