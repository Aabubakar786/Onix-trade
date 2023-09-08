import React, { FC } from 'react'
import { Button, Modal } from 'react-bootstrap'

type Props = {
    visible: boolean
    hLoading?: boolean
    sLoading?: boolean
    handleClose: () => void
    onSDelete: () => void
    onHDelete: () => void
    message: string
    message2: string
    testLine1: string
    testLine2: string

    opt?: string
}
const DeleteConfirmationModal: FC<Props> = ({ visible, message, message2, testLine1, testLine2, opt, sLoading, hLoading, handleClose, onSDelete, onHDelete }) => {
    return (
        <Modal show={visible} centered onHide={handleClose}>
            <Modal.Body>
                <div style={{ background: 'rgba(255, 21, 6, 0.15)' }} className='swal2-icon d-flex swal2-warning my-5'>
                    {/* <div className='swal2-icon-content'>!</div> */}
                    <span style={{ fontSize: '35px', color: '#FF1506' }} className='bi bi-trash'></span>
                </div>
                <div className='text-center py-5'>
                    <b>{message}
                    </b></div>
                <div className='text-center py-5'>{message2}</div>


                <div className='rounded bg-light py-3'>
                    <div style={{ fontSize: '11px' }} className='text-center'>
                        <span style={{ fontSize: '25px', color: '#8E8E8E', verticalAlign: 'middle' }} className='bi bi-dot'></span>
                        {testLine1}
                    </div>
                    <div style={{ fontSize: '11px' }} className='text-center'>
                        <span style={{ fontSize: '25px', color: '#8E8E8E', verticalAlign: 'middle' }} className='bi bi-dot'></span>
                        {testLine2}
                    </div>
                </div>


                <div className='d-flex justify-content-center mt-5'>

                    <button
                        type='button'
                        onClick={onSDelete}
                        disabled={sLoading}
                        className=' btn fw-bold hotDealBtn'
                    > {sLoading && <span className='spinner-border spinner-border-sm' />}
                        Soft Delete
                    </button>
                    <span className='m-3'>

                    </span>
                    <button
                        type='button'
                        disabled={hLoading}
                        onClick={onHDelete}
                        className=' fw-bold me-3 addedHotDealBtn'
                    >
                        {hLoading && <span className='spinner-border spinner-border-sm' />} Hard Delete {opt} !
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteConfirmationModal
