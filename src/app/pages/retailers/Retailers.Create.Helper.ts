import * as Yup from 'yup'

export interface ICreateRetailer {
  [x: string]: any
  name: string
  description: string
  logo: string
}

const createRetailerSchema = Yup.object({
  name: Yup.string().required().label('Retailer Name'),
  description: Yup.string().required().label('Description'),
  // logo: Yup.shape().required().label('logo'),
  logo: Yup.mixed()
})

const createRetailerInits: ICreateRetailer = {
  name: '',
  description:'',
  logo: ''
}

export {createRetailerSchema, createRetailerInits}
