import React, { ChangeEvent, useState } from 'react'
import { KTSVG } from '../../../_metronic/helpers'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import CustomMenu from '../../../_metronic/partials/menu/CustomMenu'
import * as retailersRedux from './redux/RetailersRedux'
import {
  shallowEqual,
  useDispatch, useSelector,
} from 'react-redux'
import { actions } from '../retailers/redux/RetailersRedux'
import FormCheckbox from '../../../_metronic/partials/FormCheckbox'
import { Statuses } from '../../../setup/utils'
import { RootState } from '../../../setup'

const RetailersFilters = () => {
  const [tempStatus, setTempStatus] = useState<number>()
  const { retailerFilters } = useSelector<RootState>(({ retailers }) => retailers, shallowEqual) as retailersRedux.IRetailerState
  const dispatch = useDispatch()
  const applyFilters = () => {
    delete retailerFilters.total
    retailerFilters.statusId = tempStatus;
    dispatch(actions.getRetailers({...retailerFilters, status: undefined}))
  }
  const resetFilters = () => {
    delete retailerFilters.statusId;
    delete retailerFilters.total;
    setTempStatus(undefined)
    dispatch(actions.getRetailers(retailerFilters))
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTempStatus(e.target.name === 'suspended' ? Statuses.Suspended : Statuses.Live)
    } else {
      setTempStatus(undefined)
    }
  }
  return (
    <CustomMenu
      menuToggle={
        <KTSVG path='media/icons/duotune/general/gen031.svg' className='svg-icon-3 me-0' />
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
          <div>
            <label className='form-label fw-bold'>Status:</label>

            <div>
              <FormCheckbox
                label='Live'
                value={tempStatus === Statuses.Live}
                name='live'
                onChange={handleChange}
              />
              <FormCheckbox
                label='Suspended'
                value={tempStatus === Statuses.Suspended}
                name='suspended'
                onChange={handleChange}
              />
            </div>
          </div>
        </CustomCard>
      }
      toggleClassName='btn btn-sm btn-light me-3 h-35px'
    />
  )
}

export default RetailersFilters
