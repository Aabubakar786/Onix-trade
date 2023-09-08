import axios from 'axios'
import { IProductFilters } from '../../../../setup/interfaces'

const API_URL = process.env.REACT_APP_API_URL

export const PRODUCT_URL = `${API_URL}/admin/product`
export const BRANDS_URL = `${API_URL}/brand`
export const SPECIAL_DEALS = `${API_URL}/readSpecialDeal`
export function getProducts(filters?: IProductFilters) {
  return axios.get(`${PRODUCT_URL}s`, { params: { ...filters } })
}
export function getProduct(id: string) {
  return axios.get(`${PRODUCT_URL}/${id}`)
}
export function createProduct(data: any) {
  return axios.post(PRODUCT_URL, data)
}
export function updateProduct(data: any, id?: string) {
  return axios.put(`${PRODUCT_URL}/${id}`, data)
}
export function deleteProduct(id: string) {
  return axios.delete(`${PRODUCT_URL}/${id}`)
}
export function getAllBrands() {
  return axios.get(`${BRANDS_URL}s`)
}
export function getAdminSpecialDeals(deal: any) {
  return axios.get(`${SPECIAL_DEALS}`, deal)
}