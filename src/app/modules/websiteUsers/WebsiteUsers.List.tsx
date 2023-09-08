import React, {useEffect} from 'react'
import PaginationPerPage from '../PaginationPerPage'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import {IUser} from '../../../setup/interfaces'
import clsx from 'clsx'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import * as WebsiteUsersRedux from './redux/WebsiteUsersRedux'
import {IUserState} from './redux/WebsiteUsersRedux'
import ProductTableSkeleton from '../../skeletons/ProductTableSkeleton'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {numberFormatter} from '../../../setup/utils'
import WebsiteUsersFilters from './WebsiteUsers.Filters'
import WebsiteUsersSearch from './WebsiteUsers.Search'
import WebsiteUserSuspend from './WebsiteUser.Suspend'
import WebsiteUserDelete from './WebsiteUser.Delete'

const WebsiteUsers: React.FC = () => {
  const {users, loading, userFilters} = useSelector<RootState>(
    ({users}) => users,
    shallowEqual
  ) as IUserState
  const dispatch = useDispatch()

  useEffect(() => {
    delete userFilters?.total
    delete userFilters?.q
    delete userFilters?.status
    delete userFilters?.perPage
    delete userFilters?.pageNo
    dispatch(WebsiteUsersRedux.actions.getUsers(userFilters))
  }, [])

  const data = [
    {id: 1, name: 'Zeeshan', login_status: 'Force Login'},
    {id: 2, name: 'Ali', login_status: 'Force Login'},
    {id: 3, name: 'Umer', login_status: 'Force Login'},
  ]
  const onPageChange = (selectedItem: {selected: number}) => {
    delete userFilters.total
    userFilters.pageNo = selectedItem.selected + 1
    dispatch(WebsiteUsersRedux.actions.getUsers(userFilters))
  }
  const onPerPageChange = (newPerPage: number) => {
    delete userFilters.total
    userFilters.perPage = newPerPage
    dispatch(WebsiteUsersRedux.actions.getUsers(userFilters))
  }
  interface IDummyUser {
    id: number
    name: string
    // count: number
    login_status: string
  }
  return (
    <CustomCard
      title='Profile and  Billing Area'
      // subtitle={`${numberFormatter.format(userFilters?.total || 0)} New User Added`}
      // totalHover={JSON.stringify(userFilters?.total)}
      headerClassName='border-0 pt-5'
      // toolbar={
      //   <span className='d-flex align-items-stretch'>
      //     <div className={clsx('d-flex align-items-stretch h-35px')}>
      //       <WebsiteUsersFilters />
      //     </div>
      //     <div className={clsx('d-flex align-items-stretch')}>
      //       <WebsiteUsersSearch />
      //     </div>
      //   </span>
      // }
    >
      {/* begin::Table container */}
      {/* <div className='table-responsive'>
       
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
     
          <thead className='bg-light'>
            <tr className='fw-bolder text-muted'>
              <th className='min-w-150px ms-2'>User ID</th>
              <th className='min-w-150px'>Username</th>
              <th className='min-w-150px ' align='center'>
                Login Status
              </th>
              <th className='min-w-150px'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <ProductTableSkeleton columns={4} />
            ) : (
              users?.map((user: IUser) => (
                <tr key={user.id}>
                  <td>
                    <div className='d-flex align-items-center '>
                      <div className='symbol symbol-45px me-5'>
                        <img
                          alt=''
                          src={user.profile_image || ""}
                          className='mw-100 rounded-circle'
                          onError={(e: any) => {
                            e.target.onerror = null
                            e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                          }}
                        />
                      </div>
                      <div className='d-flex flex-column min-w-0'>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {user.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='text-muted'>
                    <span className='text-dark fw-bolder text-hover-primary fs-6 mw-200px text-truncate'>
                   
                      {user.first_name ?? ''} { user.last_name ?? ""}
                    </span>
                  </td>
                  <td className='text-muted'>
                    <span className='user-login-status'>{user.count}</span>
                  </td>
                  <td>
                    <div className='d-flex justify-content-start flex-shrink-0'>
                      <Link
                        to={`/users/${user.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-eye-fill svg-icon-3' />
                      </Link>
                      <Link
                        to={`/users/edit/${user.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill svg-icon-3' />
                      </Link>
                      <WebsiteUserDelete id={JSON.stringify(user.id)} /> &nbsp;
                      <WebsiteUserSuspend status={user?.status_id} id={JSON.stringify(user.id)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <PaginationPerPage
        perPage={userFilters?.perPage || 10}
        pageNo={userFilters?.pageNo || 1}
        onPerPageChange={onPerPageChange}
        onPageChange={onPageChange}
        totalCount={userFilters?.total || 0}
        dataLength={users?.length}
      /> */}
      {/* end: pagination */}
    </CustomCard>
  )
}

export {WebsiteUsers}
