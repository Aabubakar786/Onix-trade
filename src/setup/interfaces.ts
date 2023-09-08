export interface IPrice {
  actualValue: '369.99'
  amount: number
  createdAt: string
  symbol: string
  updatedAt: string
}
export interface ISpecs {
  id: number
  value: string
}
export interface ICategory {
  id: number
  name?: string
  description?: string
  image?: string
  count?: number
  parent_id: number
  status_id: number
  subCats: {
    id?: number
    name?: string
    description?: string
    image?: string
    count?: number
  }[]

}
export interface IProduct {
  id: string
  availability: string
  brand: string
  categoryId: number
  condition: string
  images: { additional_images: string[] }
  isFavourite: boolean
  longDescription: string
  overAllRating: string
  price: IPrice[]
  specs: ISpecs[]
  title: string
  url: string
}
export interface IUser {
  status_id: number
  id: number
  name: string
  description: string
  image?: string
  count: number
  first_name?: string
  last_name?: string
  profile_image?: string 
}
export interface IRetailer {
  id: number
  name: string
  logo: string
  status_id: number
  description: string
}
export interface IScrapper {
  id: number
  name: string
  logo: string
  description: string
}
export interface IFilters {
  pageNo?: number
  perPage?: number
  total?: number
}
export interface IProductFilters extends IFilters {
  provider?: number
  status?: number
  searchKeyword?: string
}
export interface ICategoryFilters extends IFilters {
  status?: number
  q?: string

}
export interface IUserFilters extends IFilters {
  status?: number
  statusId?: number
  q?: string
}
export interface IRetailerFilters extends IFilters {
  statusId?: number
  status?: number | undefined
  q?: string
}
export interface IScrapperFilters extends IFilters {
  status?: number | undefined
  statusId?: number
  q?: string
}
