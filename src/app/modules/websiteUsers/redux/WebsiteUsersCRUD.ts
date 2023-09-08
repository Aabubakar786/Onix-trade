import axios from 'axios'
import {IUserFilters} from '../../../../setup/interfaces'
import {IEditUser} from '../../../pages/websiteUsers/WebsiteUsers.Create.Helper'
const API_URL = process.env.REACT_APP_API_URL

export const USERS_LIST = `${API_URL}/admin/accounts`
export const ADMIN_USERS_LIST = `${API_URL}/admin/accounts`
export const GET_USER_BY_ID = `${API_URL}/admin/account`
// export const SPECIAL_DEALS = `${API_URL}/admin/readSpecialDeal`

export function getAllUsers() {
  return axios.get(USERS_LIST)
}
export function getAdminUsers(params: IUserFilters) {
  return axios.get(ADMIN_USERS_LIST, {params})
}
export function suspendUser(id: string,status_id:number) {
  const response = axios({
    method: 'put',
    url: `${GET_USER_BY_ID}/${id}`,
    data: {statusId:status_id},
  })
  return response
}
export function deleteUser(id: string) {
  return axios.delete(`${GET_USER_BY_ID}/${id}`)
}
export function getUser(id: string) {
  return axios.get(`${GET_USER_BY_ID}/${id}`)
}
// export function createUser(data: IEditUser) {
//   var dataForm = data
//   const form = new FormData()
//   form.append('name', dataForm.name)
//   form.append('description', dataForm.description)
//   form.append('parentId', dataForm.parent_id as unknown as Blob)
//   if (dataForm.imageArray) {
//     form.append('image', dataForm.imageArray[0])
//   }
//   const response = axios({
//     method: 'post',
//     url: GET_USER_BY_ID,
//     data: form,
//     headers: {
//       'Content-Type': `multipart/form-data`,
//     },
//   })
//   return response
// }
export function updateUser(data: IEditUser, id?: string) {
  var dataForm = data
  const form = new FormData()
  form.append('first_name', dataForm.first_name)
  form.append('last_name', dataForm.last_name)
  form.append('email', data.email)
  form.append('phone_number', data.phone_number)
  form.append('bio', data.bio)
  form.append('price_alert', data.price_alert)
  form.append('logged_in_date', data.logged_in_date)

  if (dataForm.image) {
    form.append('image', dataForm.image[0])
  }
  const response = axios({
    method: 'put',
    url: `${GET_USER_BY_ID}/${id}`,
    data: form,
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  })
  return response
}

// export function getSpecialDeals(params: any) {
//   return axios.get(SPECIAL_DEALS, {params})
// }
