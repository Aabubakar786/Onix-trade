import React, { FC, useState } from 'react'
import { deleteScrapper, suspendScrapper } from './redux/ScrappersCRUD'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import { showErrorMessage } from '../../../setup/utils/messages'
import { toast } from 'react-toastify'
import { actions } from './redux/ScrappersRedux'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import * as scrappersRedux from './redux/ScrappersRedux'

type Props = {
  id: any
}
const ScrapperSuspend: FC<Props> = ({ id }) => {
  const { scrapperFilters } = useSelector<RootState>(({ scrappers }) => scrappers, shallowEqual) as scrappersRedux.IScrapperState
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const onClickSuspend = () => {
    setVisible(true)
  }
  const handleClose = () => {
    setVisible(false)
  }
  const dispatch = useDispatch();
  const handleSuspend = () => {
    setLoading(true)
    suspendScrapper(id)
      .then(() => {
        toast.success('Scrapper Suspended successfully!')
        setLoading(false)
        setVisible(false)
        delete scrapperFilters.total;
        dispatch(actions.getScrappers(scrapperFilters))
      })
      .catch((err) => {
        setLoading(false)
        showErrorMessage(err)
      })
  }
  return (
    <>
      <button
        className='btn btn-bg-light btn-active-color-primary btn-sm'
        onClick={onClickSuspend}
      >
        <span className='text-muted fw-bold text-muted '>
          Suspend
        </span>
      </button>
      {visible && (
        <ConfirmationModal
          visible={visible}
          loading={loading}
          handleClose={handleClose}
          onConfirm={handleSuspend}
          message='Are you sure you want to Suspend this Scrapper?'
        />
      )}
    </>
  )
}

export default ScrapperSuspend
