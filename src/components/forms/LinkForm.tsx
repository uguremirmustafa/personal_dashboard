import React, { ReactNode, useState } from 'react';
import Modal from '../modal/Modal';
import Form from '../atoms/Form';
import { Controller, useForm } from 'react-hook-form';
import Input from '../atoms/Input';
import SelectField from '../atoms/SelectField';
import useLinkCategories from '@/hooks/useLinkCategories';
import { LinkItemWithCategoryIdList, LinkItemWithId } from '@/utils/schema-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinkItemWithCategoryIdList as schema } from '@/utils/schemas/schemas';
import axiosObj from '@/utils/api/axios';
import SaveButton from '../atoms/SaveButton';
import ImageUploader from '../atoms/ImageUploader';

interface IProps {
  onSuccess?: (p?: any) => void;
  initialValues: LinkItemWithCategoryIdList;
  id?: LinkItemWithCategoryIdList['id'];
}

function LinkForm(props: IProps) {
  const { onSuccess, initialValues, id } = props;
  const { data: categories } = useLinkCategories();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
  } = useForm<LinkItemWithCategoryIdList>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
    mode: 'all',
  });
  const [loading, setLoading] = useState(false);
  async function saveLink(data: LinkItemWithCategoryIdList) {
    setLoading(true);
    try {
      const body = { ...data, id: null };
      const res = await axiosObj(id ? `/link/${id}` : '/link', {
        method: id ? 'PUT' : 'POST',
        data: body,
      });
      console.log(res);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  const options = categories?.map((x) => ({ value: x.id, label: x.name }));

  return (
    <Form onSubmit={handleSubmit(saveLink)} autoComplete="off">
      <Controller
        control={control}
        name="icon"
        render={({ field, fieldState: { error } }) => (
          <div className="flex gap-2">
            <ImageUploader
              {...field}
              // value={field.value ?? ''}
              label="Image Upload"
              imageClass="h-auto md:h-[200px] !object-contain"
              imageUrl={watch('icon')}
              setImageUrl={(url: string) => setValue('icon', url)}
            />
            <div className="divider divider-horizontal pt-8"></div>
            <Input
              {...field}
              label="Image Url"
              type="url"
              error={error}
              placeholder="Paste image url here..."
            />
          </div>
        )}
      />
      <p className="text-xs text-neutral-400">You can upload an icon or just paste the url.</p>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input {...field} label="Name" error={error} placeholder="that cool website..." />
        )}
      />
      <Controller
        name="path"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="URL"
            type="url"
            error={error}
            placeholder="https://awesome.website.com"
          />
        )}
      />
      <Controller
        name="categoryIds"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectField
            {...field}
            isMulti
            label="Categories"
            options={options}
            error={error}
            menuPortalTarget={document.getElementById('link_form')}
          />
        )}
      />
      <SaveButton loading={loading} disabled={!isValid} />
    </Form>
  );
}

export default LinkForm;
