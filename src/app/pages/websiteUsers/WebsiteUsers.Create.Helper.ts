import * as Yup from 'yup'

export interface IEditUser {
  [x: string]: any
  first_name: string
  last_name: string
  email: string
  phone_number: string
  bio: string
  price_alert: boolean | any
  logged_in_date: Date | any
  image: any
  // data:{}
}

const createUserSchema = Yup.object({
  first_name: Yup.string().required('Firstname is required'),
  last_name: Yup.string().required('Lastname is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone_number: Yup.string().required('Phone number is required'),
  bio: Yup.string(),
  price_alert: Yup.boolean(),
  logged_in_date: Yup.date(),
  image: Yup.mixed(),
  // data: Yup.mixed(),
})

const createUserInits: IEditUser = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  bio: '',
  price_alert: false,
  logged_in_date: new Date(),
  image: undefined,
  // data: {},
}

export {createUserSchema, createUserInits}
