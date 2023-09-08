import React, { FC } from 'react'
import { Button, Modal } from 'react-bootstrap'

type Props = {
  visible: boolean
  loading?: boolean
  handleClose: () => void
  onConfirm: () => void
  message: string
  opt?: string
}
const ConfirmationModal: FC<Props> = ({ visible, loading, message,opt, handleClose, onConfirm }) => {
  return (
    <Modal show={visible} centered onHide={handleClose}>
      <Modal.Body>
        <div className='swal2-icon d-flex swal2-warning my-5'>
          <div className='swal2-icon-content'>!</div>
        </div>
        <div className='text-center py-5'>{message}</div>
        <div className='d-flex justify-content-center mt-5'>
          <Button
            type='button'
            disabled={loading}
            onClick={onConfirm}
            variant='danger'
            className=' fw-bold me-3 '
          >
            {loading && <span className='spinner-border spinner-border-sm' /> } Yes {opt} !
          </Button>
          <button
            type='button'
            onClick={handleClose}
            disabled={loading}
            className=' btn fw-bold btn-active-light-primary'
          >
            No, cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmationModal
