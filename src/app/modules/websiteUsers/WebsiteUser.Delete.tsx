import React, {FC, useState} from 'react'
import {deleteUser} from './redux/WebsiteUsersCRUD'
import {showErrorMessage} from '../../../setup/utils/messages'
import {toast} from 'react-toastify'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {actions, IUserState} from './redux/WebsiteUsersRedux'
import {RootState} from '../../../setup'
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModel'

type Props = {
  id: string
}
const WebsiteUserDelete: FC<Props> = ({id}) => {
  const {userFilters} = useSelector<RootState>(({users}) => users, shallowEqual) as IUserState
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

  const handleHardDelete = () => {
    setHardDeleteloading(true)
    deleteUser(id)
      .then(() => {
        toast.success('Product deleted successfully!')
        setHardDeleteloading(false)
        setVisible(false)
        delete userFilters.total
        dispatch(actions.getUsers(userFilters))
      })
      .catch((err) => {
        setHardDeleteloading(false)
        showErrorMessage(err)
      })
  }
  const handleSoftDelete = () => {
    setSoftDeleteloading(true)
    deleteUser(id)
      .then(() => {
        toast.success('Product deleted successfully!')
        setSoftDeleteloading(false)
        setVisible(false)
        delete userFilters.total
        dispatch(actions.getUsers(userFilters))
      })
      .catch((err) => {
        setSoftDeleteloading(false)
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
          onSDelete={handleSoftDelete}
          onHDelete={handleHardDelete}
          handleClose={handleClose}
          message='Do you want to Delete this User?'
          message2='This Operation can be done in two ways.'
          testLine1='If you soft delete the user, you can restore this user anytime.'
          testLine2='If you hard delete the user, then this user cannot be restore again.'
        />
      )}
    </>
  )
}

export default WebsiteUserDelete
