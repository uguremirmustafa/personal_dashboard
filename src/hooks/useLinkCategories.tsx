import { getCategories } from '@/utils/api/link-category.api';
import { CategoryWithIdAndLinkCounts } from '@/utils/schema-types';
import { useQuery } from 'react-query';

function useLinkCategories() {
  const result = useQuery<CategoryWithIdAndLinkCounts[]>('link_categories', getCategories);

  return result;
}

export default useLinkCategories;
