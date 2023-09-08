import * as Yup from 'yup'

export interface ICreateCategory {
  [x: string]: any
  name: string
  description: string
  parent_id: number
  image: any 
  // data:{}
}

const createCategorySchema = Yup.object({
  name: Yup.string().required().label('Category Name'),
  description: Yup.string().required().label('Description'),
  parent_id: Yup.number(),
  image: Yup.mixed(),
  // data: Yup.mixed(),
})

const createCategoryInits: ICreateCategory = {
  name: '',
  description: '',
  parent_id: 0,
  image: undefined,
  // data: {},
}

export { createCategorySchema, createCategoryInits }
