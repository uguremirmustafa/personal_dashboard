import axiosObj from './axios';

export async function uploadImage(formData: any) {
  const res = await axiosObj.post('image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
}
