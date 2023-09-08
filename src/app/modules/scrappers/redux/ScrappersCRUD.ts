import axios from 'axios'
import { ICreateScrapper } from '../../../pages/scrappers/Scrappers.Create.Helper'
import { IScrapperFilters } from '../../../../setup/interfaces'

const API_URL = process.env.REACT_APP_API_URL
export const SCRAPPER_URL = `${API_URL}/admin/scrapper`

export function getScrappers(filters: IScrapperFilters) {
  return axios.get(`${SCRAPPER_URL}s`, { params: { ...filters } })
}

export function getAllScrappers() {
  return axios.get(`${SCRAPPER_URL}s`)
}

export function getsearchedScrappers(params: IScrapperFilters) {
  return axios.get(`${SCRAPPER_URL}s`, { params })

}
export function getScrapper(id: string) {
  return axios.get(`${SCRAPPER_URL}/${id}`)

}

export function createScrapper(data: ICreateScrapper) {
  var dataForm = data;
  const form = new FormData();
  form.append('name', dataForm.name);
  form.append('description', dataForm.description);
  if (dataForm.imageArray) {
    form.append('logo', dataForm.imageArray[0]);
  }
  const response = axios({
    method: 'post',
    url: SCRAPPER_URL,
    data: form,
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return response
}
export function updateScrapper(data: ICreateScrapper, id?: string) {
  var dataForm = data;
  const form = new FormData();
  form.append('name', dataForm.name);
  form.append('description', dataForm.description);
  if (dataForm.imageArray) {
    form.append('logo', dataForm.imageArray[0]);
  }
  const response = axios({
    method: 'put',
    url: `${SCRAPPER_URL}/${id}`,
    data: form,
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return response
}
export function deleteScrapper(id: string) {
  return axios.delete(`${SCRAPPER_URL}/${id}`)
}
export function suspendScrapper(id: string) {
  const response = axios({
    method: 'put',
    url: `${SCRAPPER_URL}/${id}`,
    data: {'statusId':6},
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return response
}