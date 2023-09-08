import {toast} from 'react-toastify'

export const showErrorMessage = (err: any, customMsg?: string) => {
  toast.error(err?.response?.data?.response?.message || customMsg || 'Something went wrong!')
}
