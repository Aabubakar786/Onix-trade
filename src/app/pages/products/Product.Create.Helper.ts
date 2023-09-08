import * as Yup from 'yup'

export interface ICreateProduct {
  sku: string
  id: string
  url: string
  title: string
  brand: string
  model: string
  condition: string
  availability: string
  retailer: string
  category: string
  categoryId:number | undefined
  retailerId:number | undefined
  item_attributes: []
  additional_images?: []
  images?: []
  keywords:[]
  price:string,
  short_desc: string | [string]
  long_desc: string | [string]
}

const createProductSchema = Yup.object({
  sku: Yup.string().required().label('Product sku'),
  id: Yup.string().required().label('Product id'),
  url: Yup.string().required().label('Product url'),
  title: Yup.string().required().label('Product Title'),
  // brand: Yup.string().required().label('Product brand'),
  model: Yup.string().required().label('Product model'),
  condition: Yup.string().required().label('Product condition'),
  availability: Yup.string().required().label('Product availability'),
  // retailerId: Yup.string().required().label('Product retailerId'),
  // categoryId: Yup.string().required().label('Product categoryId'),
  item_attributes: Yup.array().required().min(1, 'At least one Feature is required.').label('Product item_attributes'),
  keywords: Yup.array().required().min(1, 'At least one keyword is required.').label('Product keywords'),
  // additional_images: Yup.array().required().label('Product additional_images'),
  images: Yup.array().required().min(1, 'At least one Image is required.').label('Product additional_images'),
  price: Yup.string().required().label('price'),
  long_desc: Yup.string().required().label('Long Description'),
  short_desc: Yup.string().required().label('Short Description'),
});


const createProductInits: ICreateProduct = {
  sku: '',
  id: '',
  url: '',
  title: '',
  brand: '',
  model: '',
  condition: '',
  availability: '',
  retailer: '',
  category: '',
  categoryId:0,
  retailerId:0,
  item_attributes: [],
  // additional_images: [],
  images: [],
  keywords:[],
  price:'',
  short_desc: '',
  long_desc: '',
}

export {
  createProductSchema,
   createProductInits}
