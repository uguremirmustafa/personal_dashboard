import Form from '@/components/atoms/Form';
import Input from '@/components/atoms/Input';
import SaveButton from '@/components/atoms/SaveButton';
import SelectField from '@/components/atoms/SelectField';
import LinksLayout from '@/components/layout/LinksLayout';
import MainLayout from '@/components/layout/MainLayout';
import useLinkCategories from '@/hooks/useLinkCategories';
import useLinks from '@/hooks/useLinks';
import axiosObj from '@/utils/api/axios';
import { LinkItemWithCategoryIdList } from '@/utils/schema-types';
import { LinkItemWithCategoryIdList as schema } from '@/utils/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';

function Page(): JSX.Element {
  const { links } = useLinks();
  const { categories } = useLinkCategories();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LinkItemWithCategoryIdList>({
    defaultValues: { name: '', path: '', categoryIds: [] },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  async function saveLink(data: LinkItemWithCategoryIdList) {
    try {
      const res = await axiosObj.post('/link', data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  const options = categories.map((x) => ({ value: x.id, label: x.name }));

  return (
    <div>
      <Form onSubmit={handleSubmit(saveLink)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="Name" error={error} />
          )}
        />
        <Controller
          name="path"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="URL" type="url" error={error} />
          )}
        />
        <Controller
          name="categoryIds"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField {...field} isMulti label="Categories" options={options} error={error} />
          )}
        />
        <SaveButton className="mt-4" loading={false} disabled={!isValid} />
      </Form>
      {links.map((link) => {
        return <div key={link.id}>{link.name}</div>;
      })}
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LinksLayout>{page}</LinksLayout>
    </MainLayout>
  );
};

export default Page;
