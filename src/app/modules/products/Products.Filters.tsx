import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { KTSVG } from '../../../_metronic/helpers'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import CustomMenu from '../../../_metronic/partials/menu/CustomMenu'
import SearchSelect from '../../../_metronic/partials/search/SearchSelect'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { actions, IProductState } from './redux/ProductRedux'
import { getAllRetailers, getsearchedRetailers } from '../retailers/redux/RetailersCRUD'
import { IProductFilters, IRetailer } from '../../../setup/interfaces'
import { RootState } from '../../../setup'
import { AxiosResponse } from 'axios'
import FormCheckbox from '../../../_metronic/partials/FormCheckbox'
import { Statuses } from '../../../setup/utils'

const ProductsFilters = () => {
  const { filters } = useSelector<RootState>(
    ({ products }) => products,
    shallowEqual
  ) as IProductState
  const [providers, setProviders] = useState<IRetailer[]>([])
  const [providersSearch, setProvidersSearch] = useState('')
  const [loadingRetailers, setloadingRetailers] = useState<boolean>(false)
  const [tempStatus, setTempStatus] = useState<number>()

  const runSearch = useRef<any>()

  const { provider } = useSelector<RootState>(
    ({ products }) => ({ provider: products.filters.provider }),
    shallowEqual
  ) as IProductFilters
  const dispatch = useDispatch()

  useEffect(() => {
    fetchProviders()
  }, [])
  const fetchProviders = () => {
    setloadingRetailers(true)
    getAllRetailers()
      .then((response: AxiosResponse) => {
        setProviders(response.data.response?.data?.data || [])
        setloadingRetailers(false)
      })
      .catch((err) => {
        console.log({ err })
      })
  }
  const fetchSearchedProviders = (text: string) => {
    setloadingRetailers(true)
    try {
      clearInterval(runSearch.current)
    } catch (e) { }
    runSearch.current = setInterval(() => {
      getsearchedRetailers({ q: text })
        .then((response: AxiosResponse) => {
          setProviders(response.data.response?.data?.data || [])
          setloadingRetailers(false)
        })
        .catch((err) => {
          console.log({ err })
        })
      clearInterval(runSearch.current)
    }, 2000)
  }
  const onChangeProvider = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setProvidersSearch(text)
    fetchSearchedProviders(text);
  }
  const filteredProviders = useMemo(
    () =>
      providers?.filter((provider) =>
        provider.name?.toLowerCase().includes(providersSearch?.toLowerCase())
      ),
    [providers, providersSearch]
  )
  const handleSelectProvider = (selected: IRetailer) => {
    dispatch(actions.setFilters({ provider: selected.id }))
  }
  const providerSelected = useMemo(
    () => providers.find((_provider) => _provider.id === provider),
    [provider, providers]
  )
  const applyFilters = () => {
    delete filters.total;
    filters.provider = provider;
    filters.pageNo = 1;
    filters.status = tempStatus;
    dispatch(actions.getProducts(filters))
  }
  const resetFilters = () => {
    delete filters.total;
    delete filters.status;
    delete filters.provider
    setTempStatus(undefined)
    filters.pageNo = 1;
    dispatch(actions.getProducts(filters))
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) { 
      setTempStatus(e.target.name === 'live' ? Statuses.Live :
        e.target.name === 'draft' ? Statuses.Draft :
          e.target.name === 'pending' ? Statuses.Pending :
            e.target.name === 'rejected' ? Statuses.Rejected :
              e.target.name === 'pending' ? Statuses.Pending :
                e.target.name === 'suspended' ? Statuses.Suspended :
                  e.target.name === 'deleted' ? Statuses.Deleted :
                    Statuses.Live)
    } else {
      setTempStatus(undefined)
    }
  }
  return (
    <CustomMenu
      menuToggle={
        <KTSVG path='media/icons/duotune/general/gen031.svg' className='svg-icon svg-icon-3 me-0 mt-n1' />
      }
      menuWidth='w-300px'
      menuBody={
        <CustomCard
          className='px-3'
          title='Filter Option'
          footerClassName='border-0'
          cardFooter={
            <div className='d-flex justify-content-end'>
              <button
                className='btn btn-sm btn-light btn-active-light-primary me-2'
                data-kt-menu-dismiss='true'
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                className='btn btn-sm btn-primary'
                onClick={applyFilters}
                data-kt-menu-dismiss='true'
              >
                Apply
              </button>
            </div>
          }
          size='small'
        >
          <div className='mb-10'>
            <label className='form-label fw-bold'>Providers:</label>

            <div>
              <SearchSelect
                value={providersSearch}
                onChange={onChangeProvider}
                data={filteredProviders}
                placeholder={'Select Provider'}
                displayKey='name'
                onSelect={handleSelectProvider}
                selected={providerSelected}
                loading={loadingRetailers}
              />
            </div>
          </div>
          {/*<div>*/}
          {/* <label className='form-label fw-bold'>Status:</label> */}
          {/* <div>
            <FormCheckbox label='Live'
              value={tempStatus === Statuses.Live}
              name='live'
              onChange={handleChange} />
            <FormCheckbox label='Draft'
              value={tempStatus === Statuses.Draft}
              name='draft'
              onChange={handleChange} />
            <FormCheckbox label='Pending'
              value={tempStatus === Statuses.Pending}
              name='pending'
              onChange={handleChange} />
            <FormCheckbox label='Rejected'
              value={tempStatus === Statuses.Rejected}
              name='rejected'
              onChange={handleChange} />
            <FormCheckbox label='Deleted'
              value={tempStatus === Statuses.Deleted}
              name='deleted'
              onChange={handleChange} />
          </div> */}
          {/* </div> */}
        </CustomCard>
      }
      toggleClassName='btn btn-sm btn-light me-3 h-35px'
    />
  )
}

export default ProductsFilters
