import axios from 'axios'
import { ICreateRetailer } from '../../../pages/retailers/Retailers.Create.Helper'
import { IRetailerFilters } from '../../../../setup/interfaces'

const API_URL = process.env.REACT_APP_API_URL
export const RETAILER_URL = `${API_URL}/admin/retailer`

export function getRetailers(filters: IRetailerFilters) {
  return axios.get(`${RETAILER_URL}s`, { params: { ...filters } })
}

export function getAllRetailers() {
  return axios.get(`${RETAILER_URL}s`)
}

export function getsearchedRetailers(params: IRetailerFilters) {
  return axios.get(`${RETAILER_URL}s`, { params })

}
export function getRetailer(id: string) {
  return axios.get(`${RETAILER_URL}/${id}`)

}

export function suspendRetailer(data: any) {
  return axios.put(`${RETAILER_URL}/${data.id}`, {...data.params})
}

export function createRetailer(data: ICreateRetailer) {
  var dataForm = data;
  const form = new FormData();
  form.append('name', dataForm.name);
  form.append('description', dataForm.description);
  if (dataForm.imageArray) {
    form.append('logo', dataForm.imageArray[0]);
  }
  const response = axios({
    method: 'post',
    url: RETAILER_URL,
    data: form,
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return response
}
export function updateRetailer(data: ICreateRetailer, id?: string) {
  var dataForm = data;
  const form = new FormData();
  form.append('name', dataForm.name);
  form.append('description', dataForm.description);
  if (dataForm.imageArray) {
    form.append('logo', dataForm.imageArray[0]);
  }
  const response = axios({
    method: 'put',
    url: `${RETAILER_URL}/${id}`,
    data: form,
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return response
}
export function deleteRetailer(id: string) {
  return axios.delete(`${RETAILER_URL}/${id}`)
}
