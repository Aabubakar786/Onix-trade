import React, { useEffect, useState } from 'react'
import PaginationPerPage from '../PaginationPerPage'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import { ICategory } from '../../../setup/interfaces'
import clsx from 'clsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import * as categoryRedux from './redux/CategoriesRedux'
import { ICategoryState } from './redux/CategoriesRedux'
import ProductTableSkeleton from '../../skeletons/ProductTableSkeleton'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { Statuses, numberFormatter } from '../../../setup/utils'
import CategoriesFilters from './Categories.Filters'
import CategoriesSearch from './Categories.Search'
import CategorySuspend from './Category.Suspend'
import CategoryDelete from './Category.Delete'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ArrowDropDown, ArrowRight, Filter } from '@material-ui/icons'
import MuiTableCell from "@material-ui/core/TableCell";
import { withStyles } from '@material-ui/core'

const TableCell = withStyles({
  root: {
    borderBottomStyle: 'dotted',
  }
})(MuiTableCell);
const CategoriesList: React.FC = () => {
  const { categories, loading, categoryFilters } = useSelector<RootState>(
    ({ categories }) => categories,
    shallowEqual
  ) as ICategoryState
  const dispatch = useDispatch()
  useEffect(() => {
    delete categoryFilters.total
    delete categoryFilters.q
    delete categoryFilters.status
    delete categoryFilters.perPage
    delete categoryFilters.pageNo
    dispatch(categoryRedux.actions.getCategories(categoryFilters))
  }, [])

  const onPageChange = (selectedItem: { selected: number }) => {
    delete categoryFilters.total;
    categoryFilters.pageNo = selectedItem.selected + 1;
    dispatch(
      categoryRedux.actions.getCategories(categoryFilters)
    )
  }
  const onPerPageChange = (newPerPage: number) => {
    delete categoryFilters.total;
    categoryFilters.perPage = newPerPage;
    dispatch(categoryRedux.actions.getCategories(categoryFilters))
  }

  function CollapsibleTable() {
    return (
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead style={{ background: 'rgba(66, 64, 62, 0.04)' }}>
            <TableCell align="left" className='tableHeads'>Category Name</TableCell>
            <TableCell align="left" className='tableHeads'>Status</TableCell>
            <TableCell align="left" className='tableHeads'>Description</TableCell>
            <TableCell align="left" className='tableHeads' style={{ width: 200 }}>Sub Category</TableCell>
            <TableCell align="left" className='tableHeads'>Actions</TableCell>
          </TableHead>
          <TableBody>
            {categories.map((row: ICategory) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  function Row(props: { row: ICategory }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow >
          <TableCell style={{ borderBottom: open ? 'none' : '1px lightgrey dotted', width: 250 }}>
            <i onClick={() => setOpen(!open)}>{open ? <ArrowDropDown /> : <ArrowRight />}</i>
            <div className='symbol symbol-45px me-5'>
              <img
                alt=''
                src={row.name || toAbsoluteUrl('/media/logos/defCategory.png')}
                className='mw-100'
                onError={(e: any) => {
                  e.target.onerror = null
                  e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                }} />
            </div>
            <b className='d-inline-block w-100px align-middle'>{row.name}
            </b>
          </TableCell>
          <TableCell align="left" style={{ borderBottom: open ? 'none' : '1px lightgrey dotted' }}>
            <span className='badge badge-light-primary fw-bolder px-4 py-3'>
              {/* {row.count} */}
              {Object.keys(Statuses).find((key) => Statuses[key] === row?.status_id)?.toUpperCase() || "LIVE"}
            </span></TableCell>
          <TableCell align="left" style={{ borderBottom: open ? 'none' : '1px lightgrey dotted' }}>{row.description}</TableCell>
          <TableCell align="left" style={{ borderBottom: open ? 'none' : '1px lightgrey dotted' }}>
            Sub Category &nbsp;
            <span style={{ padding: '5px', background: '#3774EC', color: 'white', borderRadius: '50px' }}>{'+' + 3}</span>
          </TableCell>
          <TableCell align="left" style={{ borderBottom: open ? 'none' : '1px lightgrey dotted' }}>
            <div className='d-flex justify-content-start flex-shrink-0'>
              <Link to={`/categories/${row.id}`}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              >
                <i className='bi bi-eye-fill svg-icon-3' />
              </Link>
              <Link
                to={`/categories/edit/${row.id}`}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              >
                <i className='bi bi-pencil-fill svg-icon-3' />
              </Link>
              {/* <Link
                to={`#`}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              > */}
              { (row.status_id !== Statuses.Suspended) && <CategorySuspend id={JSON.stringify(row.id)} />}
              {/* </Link> */}
              <CategoryDelete id={JSON.stringify(row.id)} />
            </div></TableCell>

        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box className='ms-20' style={{ borderRadius: '4px', borderRight: '1px lightgrey dotted', borderLeft: '1px lightgrey dotted' }} sx={{ margin: 5 }}>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {/* {row.subCats.map(() => ( */}
                    <TableRow style={{ borderTop: '1px lightgrey dotted' }}>
                      <TableCell style={{ width: 170 }}>
                        <div className='symbol symbol-45px me-5'>
                          <img
                            alt=''
                            src={row.name || toAbsoluteUrl('/media/logos/defCategory.png')}
                            className='mw-100'
                            onError={(e: any) => {
                              e.target.onerror = null
                              e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                            }} />
                        </div>
                        <b className='d-inline-block w-60px align-middle'>{row.name}
                        </b>
                      </TableCell>
                      <TableCell align="left">
                        <span className='badge badge-light-primary fw-bolder px-4 py-3'>
                          {row.count}
                        </span></TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        <div className='d-flex justify-content-start flex-shrink-0'>
                          <Link to={`/categories/${row.id}`}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <i className='bi bi-eye-fill svg-icon-3' />
                          </Link>
                          <Link
                            to={`/categories/edit/${row.id}`}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <i className='bi bi-pencil-fill svg-icon-3' />
                          </Link>
                        </div></TableCell>

                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 170 }}>
                        <div className='symbol symbol-45px me-5'>
                          <img
                            alt=''
                            src={row.name || toAbsoluteUrl('/media/logos/defCategory.png')}
                            className='mw-100'
                            onError={(e: any) => {
                              e.target.onerror = null
                              e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                            }} />
                        </div>
                        <b className='d-inline-block w-60px align-middle'>{row.name}
                        </b>
                      </TableCell>
                      <TableCell align="left">
                        <span className='badge badge-light-primary fw-bolder px-4 py-3'>
                          {row.count}
                        </span></TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        <div className='d-flex justify-content-start flex-shrink-0'>
                          <Link to={`/categories/${row.id}`}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <i className='bi bi-eye-fill svg-icon-3' />
                          </Link>
                          <Link
                            to={`/categories/edit/${row.id}`}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <i className='bi bi-pencil-fill svg-icon-3' />
                          </Link>
                        </div></TableCell>

                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 170 }}>
                        <div className='symbol symbol-45px me-5'>
                          <img
                            alt=''
                            src={row.name || toAbsoluteUrl('/media/logos/defCategory.png')}
                            className='mw-100'
                            onError={(e: any) => {
                              e.target.onerror = null
                              e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                            }} />
                        </div>
                        <b className='d-inline-block w-60px align-middle'>{row.name}
                        </b>
                      </TableCell>
                      <TableCell align="left">
                        <span className='badge badge-light-primary fw-bolder px-4 py-3'>
                          {row.count}
                        </span></TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        <div className='d-flex justify-content-start flex-shrink-0'>
                          <Link to={`/categories/${row.id}`}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <i className='bi bi-eye-fill svg-icon-3' />
                          </Link>
                          <Link
                            to={`/categories/edit/${row.id}`}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <i className='bi bi-pencil-fill svg-icon-3' />
                          </Link>
                        </div></TableCell>

                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <>
      <CustomCard
        title='Live and Historical Tradings'
        subtitle={`Over 2 Trading views available`}
        // totalHover={JSON.stringify(categoryFilters.total)}
        headerClassName='border-0 pt-5'
        toolbar={<span className='d-flex align-items-stretch'>
          <div className={clsx('d-flex align-items-stretch h-35px')}>
            <CategoriesFilters />

          </div>
          <div className={clsx('d-flex align-items-stretch')}>
            <CategoriesSearch />
          </div>
        </span>}
      >
        <CollapsibleTable></CollapsibleTable>
        <PaginationPerPage
          perPage={categoryFilters.perPage || 10}
          pageNo={categoryFilters.pageNo || 1}
          onPerPageChange={onPerPageChange}
          onPageChange={onPageChange}
          totalCount={categoryFilters.total || 0}
          dataLength={categories.length} />
        {/* end: pagination */}
      </CustomCard></>
  )
}
export { CategoriesList }

