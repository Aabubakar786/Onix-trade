import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import { ICategoryState } from '../categories/redux/CategoriesRedux'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import { showErrorMessage } from '../../../setup/utils/messages'
import { Statuses } from '../../../setup/utils'
import { actions } from './redux/RetailersRedux'
import { suspendRetailer } from './redux/RetailersCRUD'

type Props = {
  id: string
}
const RetailerSuspend: FC<Props> = ({ id }) => {
  const { categoryFilters } = useSelector<RootState>(
    ({ retailers }) => retailers,
    shallowEqual
  ) as ICategoryState
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const onClickSuspend = () => {
    setVisible(true)
  }
  const handleClose = () => {
    setVisible(false)
  }
  const handleSuspend = () => {
    setLoading(true)
    suspendRetailer({ id, params: { statusId: Statuses.Suspended } })
      .then(() => {
        toast.success('Category Suspended successfully!')
        setLoading(false)
        setVisible(false)
        dispatch(actions.getRetailers(categoryFilters))
      })
      .catch((err) => {
        setLoading(false)
        showErrorMessage(err)
      })
  }
  return (
    <>
      <button
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 '
        onClick={onClickSuspend}
      >
        <i className='bi bi-slash-circle svg-icon-3' />
      </button>
      {visible && (
        <ConfirmationModal
          visible={visible}
          loading={loading}
          handleClose={handleClose}
          onConfirm={handleSuspend}
          message='Are you sure you want to Suspend this Retailer?'
          opt='Suspend'
        />
      )}
    </>
  )
}

export default RetailerSuspend
