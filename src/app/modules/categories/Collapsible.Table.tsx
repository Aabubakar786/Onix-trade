import * as React from 'react';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import AddAlarm, { AccessAlarm } from '@material-ui/icons'
// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
//     price: number,
// ) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//         price,
//         history: [
//             {
//                 date: '2020-01-05',
//                 customerId: '11091700',
//                 amount: 3,
//             },
//             {
//                 date: '2020-01-02',
//                 customerId: 'Anonymous',
//                 amount: 1,
//             },
//         ],
//     };
// }

// function Row(props: { row: ReturnType<typeof createData> }) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);

//     return (
//         <React.Fragment>
//             <TableRow>
//                 <TableCell>
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <AccessAlarm /> : <AccessAlarm />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.calories}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//                 <TableCell align="right">{row.carbs}</TableCell>
//                 <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 History
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Customer</TableCell>
//                                         <TableCell align="right">Amount</TableCell>
//                                         <TableCell align="right">Total price ($)</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.history.map((historyRow) => (
//                                         <TableRow key={historyRow.date}>
//                                             <TableCell component="th" scope="row">
//                                                 {historyRow.date}
//                                             </TableCell>
//                                             <TableCell>{historyRow.customerId}</TableCell>
//                                             <TableCell align="right">{historyRow.amount}</TableCell>
//                                             <TableCell align="right">
//                                                 {Math.round(historyRow.amount * row.price * 100) / 100}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//     createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

// export default function CollapsibleTable(props: { row: ReturnType<typeof createData> }) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);

//     return (
//         <TableContainer component={Paper}>
//             <Table aria-label="collapsible table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell />
//                         <TableCell>Category Name</TableCell>
//                         <TableCell align="right">Total Products</TableCell>
//                         <TableCell align="right">Description&nbsp;(g)</TableCell>
//                         <TableCell align="right">Actions&nbsp;(g)</TableCell>
//                         <TableCell align="right">Ations&nbsp;(g)</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row) => (
//                         <Row key={row.name} row={row} />
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }





















//         {/* begin::Table container */}
//         <div className='table-responsive'>
//           {/* begin::Table */}
//           <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
//             {/* begin::Table head */}
//             <thead>
//               <tr className='fw-bolder text-muted'>
//                 <th className='min-w-150px'>Category Name</th>
//                 <th className='min-w-150px ' align='center'>
//                   Total Products
//                 </th>
//                 <th className='min-w-140px'>Description</th>
//                 <th className='min-w-150px'>Actions</th>
//               </tr>
//             </thead>
//             {/* end::Table head */}
//             {/* begin::Table body */}
//             <tbody>
//               {loading ? (
//                 <ProductTableSkeleton columns={4} />
//               ) : (
//                 categories?.map((category: ICategory) => (
//                   <><tr key={category.id}>
//                     <td>
//                       <div className='d-flex align-items-center '>
//                         <i className='bi bi-arrow-right-circle-fill me-3 pe-3' style={{ display: 'block' }} id="showBtn" onClick={() => {
//                           showDiv('box')
//                         }}></i><i className='bi bi-arrow-down-circle-fill me-3 pe-3' style={{ display: 'none' }} id="hideBtn" onClick={() => {
//                           hideDiv('box')
//                         }}></i>
//                         <div className='symbol symbol-45px me-5'>
//                           <img
//                             alt=''
//                             src={category.image || toAbsoluteUrl('/media/logos/defCategory.png')}
//                             className='mw-100'
//                             onError={(e: any) => {
//                               e.target.onerror = null
//                               e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
//                             }} />
//                         </div>
//                         <div className='d-flex flex-column min-w-0'>
//                           <span className='text-dark fw-bolder text-hover-primary fs-6 mw-200px text-truncate'>
//                             <Link to={`/categories/${category.id}`}>
//                               {category.name}
//                             </Link>

//                           </span>

//                           <span className='text-muted fw-bold text-muted d-block fs-7'>
//                             {category.id}
//                           </span>
//                         </div>
//                       </div>
//                     </td>
//                     <td align='center' className='text-muted'>
//                       <span title={JSON.stringify(category.count.toLocaleString())}>
//                         {numberFormatter.format(category.count || 0)}
//                       </span>
//                     </td>
//                     <td className='text-muted'>
//                       <span className='text-truncate-2'>{category.description}</span>
//                     </td>

//                     <td>
//                       <div className='d-flex justify-content-start flex-shrink-0'>
//                         <Link to={`/categories/${category.id}`}
//                           className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
//                         >
//                           <i className='bi bi-eye-fill svg-icon-3' />
//                         </Link>
//                         <Link
//                           to={`/categories/edit/${category.id}`}
//                           className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
//                         >
//                           <i className='bi bi-pencil-fill svg-icon-3' />
//                         </Link>
//                         <CategorySuspend id={JSON.stringify(category.id)} />
//                         <CategoryDelete id={JSON.stringify(category.id)} />
//                       </div>
//                     </td>
//                   </tr>

//                     <div id="box" className='ms-20 mt-2 mb-2' style={{ borderStyle: 'dotted', borderWidth: '2px', borderRadius: '2%', background: 'light', width: '110vh', height: '225px', display: 'none', overflowY: 'scroll' }}>
//                       {/* begin::Table container */}
//                       <div className='table-responsive ps-0 pe-0'>
//                         {/* begin::Table */}
//                         <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
//                           <tbody>
//                             {loading ? (
//                               <ProductTableSkeleton columns={4} />
//                             ) : (
//                               categories?.map((category: ICategory) => (
//                                 <><tr key={category.id}>
//                                   <td>
//                                     <div className='d-flex align-items-center '>
//                                       <div className='symbol symbol-45px me-5'>
//                                         <img
//                                           alt=''
//                                           src={category.image || toAbsoluteUrl('/media/logos/defCategory.png')}
//                                           className='mw-100'
//                                           onError={(e: any) => {
//                                             e.target.onerror = null
//                                             e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
//                                           }} />
//                                       </div>
//                                       <div className='d-flex flex-column min-w-0'>
//                                         <span className='text-dark fw-bolder text-hover-primary fs-6 mw-200px text-truncate'>
//                                           <Link to={`/categories/${category.id}`}>
//                                             {category.name}
//                                           </Link>

//                                         </span>

//                                         <span className='text-muted fw-bold text-muted d-block fs-7'>
//                                           {category.id}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </td>
//                                   <td align='center' className='text-muted'>
//                                     <span title={JSON.stringify(category.count.toLocaleString())}>
//                                       {numberFormatter.format(category.count || 0)}
//                                     </span>
//                                   </td>
//                                   <td className='text-muted'>
//                                     <span className='text-truncate-2'>{category.description}</span>
//                                   </td>

//                                   <td>
//                                     <div className='d-flex justify-content-start flex-shrink-0'>
//                                       <Link to={`/categories/${category.id}`}
//                                         className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
//                                       >
//                                         <i className='bi bi-eye-fill svg-icon-3' />
//                                       </Link>
//                                       <Link
//                                         to={`/categories/edit/${category.id}`}
//                                         className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
//                                       >
//                                         <i className='bi bi-pencil-fill svg-icon-3' />
//                                       </Link>
//                                     </div>
//                                   </td>
//                                 </tr></>
//                               ))
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div></>

//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>