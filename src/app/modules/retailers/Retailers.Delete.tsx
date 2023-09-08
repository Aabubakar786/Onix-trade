import React, { FC, useState } from 'react'
import { deleteRetailer } from './redux/RetailersCRUD'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import { showErrorMessage } from '../../../setup/utils/messages'
import { toast } from 'react-toastify'
import { actions } from './redux/RetailersRedux'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import * as retailersRedux from './redux/RetailersRedux'

type Props = {
  id: any
}
const RetailerDelete: FC<Props> = ({ id }) => {
  const { retailerFilters } = useSelector<RootState>(({ retailers }) => retailers, shallowEqual) as retailersRedux.IRetailerState
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const onClickDelete = () => {
    setVisible(true)
  }
  const handleClose = () => {
    setVisible(false)
  }
  const dispatch = useDispatch();
  const handleDelete = () => {
    setLoading(true)
    deleteRetailer(id)
      .then(() => {
        toast.success('Retailer deleted successfully!')
        setLoading(false)
        setVisible(false)
        delete retailerFilters.total;
        dispatch(actions.getRetailers(retailerFilters))
      })
      .catch((err) => {
        setLoading(false)
        showErrorMessage(err)
      })
  }
  return (
    <>
      <button
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        onClick={onClickDelete}
      >
        <i className='bi bi-trash svg-icon-3' />
      </button>
      {visible && (
        <ConfirmationModal
          visible={visible}
          loading={loading}
          handleClose={handleClose}
          onConfirm={handleDelete}
          message='Are you sure you want to delete this Retailer?'
        />
      )}
    </>
  )
}

export default RetailerDelete
