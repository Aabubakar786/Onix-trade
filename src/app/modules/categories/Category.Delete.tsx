import React, { FC, useState } from 'react'
import { deleteCategory } from './redux/CategoriesCRUD'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import { showErrorMessage } from '../../../setup/utils/messages'
import { toast } from 'react-toastify'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { actions, ICategoryState } from './redux/CategoriesRedux'
import { RootState } from '../../../setup'

type Props = {
  id: string
}
const CategoryDelete: FC<Props> = ({ id }) => {
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
    deleteCategory(id)
      .then(() => {
        toast.success('Category Suspended successfully!')
        setLoading(false)
        setVisible(false)
        dispatch(actions.getCategories(categoryFilters))

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
        onClick={onClickSuspend}
      >
        <i className='bi bi-trash svg-icon-3' />
      </button>
      {visible && (
        <ConfirmationModal
          visible={visible}
          loading={loading}
          handleClose={handleClose}
          onConfirm={handleSuspend}
          message='Are you sure you want to Delete this Category?'
          opt='Delete'
        />
      )}
    </>
  )
}

export default CategoryDelete
