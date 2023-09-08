import * as Yup from 'yup'

export interface ICreateScrapper {
  [x: string]: any
  name: string
  description: string
  logo: string
}

const createScrapperSchema = Yup.object({
  name: Yup.string().required().label('Scrapper Name'),
  description: Yup.string().required().label('Description'),
  // logo: Yup.shape().required().label('logo'),
  logo: Yup.mixed()
})

const createScrapperInits: ICreateScrapper = {
  name: '',
  description:'',
  logo: ''
}

export {createScrapperSchema, createScrapperInits}
