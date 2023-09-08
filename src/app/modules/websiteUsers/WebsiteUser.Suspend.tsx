import React, { FC, useState } from 'react'
import { suspendUser } from './redux/WebsiteUsersCRUD'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import { showErrorMessage } from '../../../setup/utils/messages'
import { toast } from 'react-toastify'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { actions, IUserState } from './redux/WebsiteUsersRedux'
import { RootState } from '../../../setup'
import { BiBlock } from 'react-icons/bi'
import { Statuses } from '../../../setup/utils'
type Props = {
  id: string
  status?: number
  edit?: string
}
const WebsiteUserSuspend: FC<Props> = ({ id, status, edit }) => {
  const { userFilters } = useSelector<RootState>(({ users }) => users, shallowEqual) as IUserState
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
    suspendUser(id, status == Statuses.Suspended ? Statuses.Live : Statuses.Suspended)
      .then(() => {
        toast.success(`User ${status === Statuses.Suspended ? 'Activate' : 'Suspend'} successfully!`)
        setLoading(false)
        setVisible(false)
        setTimeout(() => {
          dispatch(actions.getUsers(userFilters))
        }, 500);
      })
      .catch((err) => {
        setLoading(false)
        showErrorMessage(err)
      })
  }
  return (
    <>
      <button
        className={
          edit
            ? 'btn border border-dark rounded-0 btn-active-color-primary btn-sm me-1'
            : 'btn btn-light btn-bg-light btn-active-color-primary btn-sm me-1'
        }
        onClick={onClickSuspend}
      >
        {edit && <BiBlock />}&nbsp; {status === Statuses.Suspended ? 'Activate' : 'Suspend'} {edit && 'User'}
      </button>
      {visible && (
        <ConfirmationModal
          visible={visible}
          loading={loading}
          handleClose={handleClose}
          onConfirm={handleSuspend}
          message={`Are you sure you want to ${status === Statuses.Suspended ? 'Activate' : 'Suspend'} this User?`}
          opt={status === Statuses.Suspended ? 'Activate' : 'Suspend'}
        />
      )}
    </>
  )
}

export default WebsiteUserSuspend
