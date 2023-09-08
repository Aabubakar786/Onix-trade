import React, { ChangeEvent, MouseEventHandler, useRef, useState } from 'react'
import { KTSVG } from '../../../_metronic/helpers'
import * as productRedux from './redux/ProductRedux'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '../../../setup'

const ProductsSearch = () => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const runSearch = useRef<any>()
  const { filters } = useSelector<RootState>(({ products }) => products, shallowEqual) as productRedux.IProductState
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false);

  const handleSearchClick = () => {
    setExpanded(!expanded);
  };

  const fetchData = (text?: string) => {
    delete filters.total;
    filters.searchKeyword = text;
    filters.pageNo = 1;
    dispatch(
      productRedux.actions.getProducts(filters)
    )
  }

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setSearchText(text)
    search(text)
  }

  const search = (text?: string) => {
    setLoading(true)

    try {
      clearInterval(runSearch.current)
    } catch (e) { }
    runSearch.current = setInterval(() => {
      fetchData(text)
      clearInterval(runSearch.current)
      setLoading(false)
    }, 2000)
  }

  const clearSearch: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    setSearchText('')
    delete filters.total;
    delete filters.searchKeyword;
    filters.pageNo = 1;
    dispatch(
      productRedux.actions.getProducts(filters)
    )
    setExpanded(!expanded);
  }
  return (
    <div className={`main`} data-kt-search-element='wrapper'>
      <div className={`${expanded && 'w-250px d-flex bg-light h-35px overflow-hidden'}`}>
        {expanded && (
          <input
            type='text'
            className='form-control form-control-flush'
            name='search'
            placeholder='Search here...'
            value={searchText}
            onChange={handleChangeSearch}
          />)}
        <div className='btn btn-sm btn-secondary h-35px' onClick={handleSearchClick}>
          {loading && (<span className='spinner-border align-middle text-gray-400 mt-1' style={{ width:"20px", height:"20px" }} />)}
          {(!loading && expanded) && (<span className='text-gray-400' onClick={clearSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className='bi bi-x mt-1' viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </span>)}
          {((!loading && !expanded)) && (<KTSVG path='/media/icons/duotune/general/gen0021.svg' transparent={true} />)}
        </div>
      </div>
    </div>
  )
}

export default ProductsSearch

