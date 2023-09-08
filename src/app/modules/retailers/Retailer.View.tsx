import { right } from '@popperjs/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ChartsWidget3 } from '../../../_metronic/partials/widgets'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { getRetailer } from './redux/RetailersCRUD'

const RetailerView: React.FC = () => {
    const params = useParams()
    const [retailer, setRetailer] = useState<any>()
    // GetRetailer
    useEffect(() => {
        if (params.id) {
            getRetailer(params.id)
                .then((res) => {
                    setRetailer(res.data.response.data.res)
                })
                .catch((err) => {
                    console.log({ err: err.message })
                })
        }
    }, [params.id])
    return (
        <>
            <Row className=' bg-white pt-6 ps-4 pb-10 mb-10'>
                <Col xs={6} md={3}>
                    <div className='image-input  mb-5'>
                        <img
                            alt=''
                            src={retailer?.image || toAbsoluteUrl('/media/logos/defCategory.png')}
                            className='mw-100'
                            onError={(e: any) => {
                                e.target.onerror = null
                                e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                            }}
                        />
                    </div>
                    <div className='position-relative w-250px mb-2'>
                        <div className='position-absolute h-30px w-3px bg-secondary rounded top-0 start-0'></div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <h6 className='pt-3' style={{ fontSize: '11px' }}>Retailer ID
                                <label className='pe-4' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{retailer?.id}</label>
                            </h6>
                        </div>
                    </div>
                    <div className='position-relative w-250px mb-2'>
                        <div className='position-absolute w-3px bg-secondary rounded top-0 start-0' style={{ height: '120px' }}></div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <h6 className='pt-3' style={{ fontSize: '11px' }}>Total Retailers
                                <label className='pe-4' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{retailer?.count || 0}</label>
                            </h6>
                        </div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <span className='badge badge-light-primary fw-bolder px-5 py-2 opacity-50'>
                                Live
                            </span>
                            <label className='pe-4 pt-2' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{retailer?.count || 0}</label>
                        </div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <span className='badge badge-light-primary fw-bolder px-5 py-2' style={{ color: '#5186ED' }}>
                                Suspended
                            </span>
                            <label className='pe-4 pt-2' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{retailer?.count || 0}</label>
                        </div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <span className='badge badge-light-primary fw-bolder px-5 py-2' style={{ color: '#FF1506' }}>
                                Deleted
                            </span>
                            <label className='pe-4 pt-2' style={{ float: right, fontWeight: 400, color: '#FF1506', fontSize: '11px' }}>{retailer?.count || 0}</label>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={9}>
                    <div className='card-title'>
                        <h2>
                            {retailer?.name}
                        </h2>
                    </div>
                    <div className='text-muted fs-7 pe-20 mb-10'>
                        {retailer?.description}
                    </div>
                    <ChartsWidget3 className={'card text-dark'} ></ChartsWidget3>

                </Col>
            </Row>
        </>

    )
}
export { RetailerView }
