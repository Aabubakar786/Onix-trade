import React, { FC, useState } from 'react'
import { deleteProduct } from './redux/ProductsCRUD'
import { showErrorMessage } from '../../../setup/utils/messages'
import { toast } from 'react-toastify'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { actions, IProductState } from './redux/ProductRedux'
import { RootState } from '../../../setup'
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModel'

type Props = {
  id: string
}
const ProductDelete: FC<Props> = ({ id }) => {
  const { filters } = useSelector<RootState>(
    ({ products }) => products,
    shallowEqual
  ) as IProductState
  const [visible, setVisible] = useState<boolean>(false)
  const [softDeleteloading, setSoftDeleteloading] = useState<boolean>(false)
  const [hardDeleteloading, setHardDeleteloading] = useState<boolean>(false)

  const dispatch = useDispatch()
  const onClickDelete = () => {
    setVisible(true)
  }
  const handleClose = () => {
    setVisible(false)
  }
  const handleDelete = () => {
    setHardDeleteloading(true)
    deleteProduct(id)
      .then((data) => {
      if (data?.data) {
        toast.success('Product deleted successfully!')
        delete filters.total;
        setTimeout(() => {
          dispatch(actions.getProducts(filters))
        }, 1000);
      }
      else {
        showErrorMessage(data)
      }
      setHardDeleteloading(false)
      setVisible(false)
    })
      .catch((err) => {
        setHardDeleteloading(false)
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
        <DeleteConfirmationModal
          visible={visible}
          hLoading={hardDeleteloading}
          sLoading={softDeleteloading}
          onSDelete={handleDelete}
          onHDelete={handleDelete}
          handleClose={handleClose}
          message='Do you want to Delete this Product?'
          message2='This Operation can be done in two ways.'
          testLine1='If you soft delete the product, you can restore the product anytime.'
          testLine2='If you hard delete the product, then the product cannot be restore again.'
        />
      )}
    </>
  )
}

export default ProductDelete
