import axios from 'axios'
import { ICategoryFilters } from '../../../../setup/interfaces'
import { ICreateCategory } from '../../../pages/categories/Categories.Create.Helper'
const API_URL = process.env.REACT_APP_API_URL

export const CATEGORIES_LIST = `${API_URL}/getAllCategories`
export const ADMIN_CATEGORIES_LIST = `${API_URL}/admin/categories`
export const GET_CATEGORY_BY_ID = `${API_URL}/admin/category`
export const SPECIAL_DEALS = `${API_URL}/admin/readSpecialDeal`


export function getAllCategories() {
  return axios.get(CATEGORIES_LIST)
}
export function getAdminCategories(params: ICategoryFilters) {
  return axios.get(ADMIN_CATEGORIES_LIST, { params })
}
export function suspendCategory(data: any) {
  return axios.put(`${GET_CATEGORY_BY_ID}/${data.id}`, {...data.params})
}
export function deleteCategory(id: string) {
  return axios.delete(`${GET_CATEGORY_BY_ID}/${id}`)
}
export function getCategory(id: string) {
  return axios.get(`${GET_CATEGORY_BY_ID}/${id}`)
}
export function createCategory(data: ICreateCategory) {
  var dataForm = data;
  const form = new FormData();
  form.append('name', dataForm.name);
  form.append('description', dataForm.description);
  form.append('parentId', dataForm.parent_id as unknown as Blob);
  if (dataForm.imageArray) {
    form.append('image', dataForm.imageArray[0]);
  }
  const response = axios({
    method: 'post',
    url: GET_CATEGORY_BY_ID,
    data: form,
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return response
}
export function updateCategory(data: ICreateCategory, id?: string) {
  var dataForm = data;
  const form = new FormData();
  form.append('name', dataForm.name);
  form.append('description', dataForm.description);
  form.append('parentId', dataForm.parent_id as unknown as Blob);
  if (dataForm.imageArray) {
    form.append('image', dataForm.imageArray[0]);
  }
  const response = axios({
    method: 'put',
    url: `${GET_CATEGORY_BY_ID}/${id}`,
    data: form,
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return response
}

export function getSpecialDeals(params:any) {
  return axios.get(SPECIAL_DEALS, {params})
}