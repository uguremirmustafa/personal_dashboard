import axiosObj from '@/utils/api/axios';
import sleep from '@/utils/helpers/sleep';
import { LinkItemWithCategoryIdList } from '@/utils/schema-types';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

async function getLinksUnderCategory(categoryId: number) {
  const res = await axiosObj<LinkItemWithCategoryIdList[]>(`/link/${categoryId}`);
  await sleep(500);
  return res.data;
}

function useLinks() {
  const router = useRouter();

  const categoryId = router.query.category;

  // Queries
  const result = useQuery(['todos', categoryId], () => getLinksUnderCategory(Number(categoryId)));

  return result;
}

export default useLinks;
