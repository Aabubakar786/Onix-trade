import { right } from '@popperjs/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { getScrapper } from './redux/ScrappersCRUD'
import { ChartsWidget9 } from '../../../_metronic/partials/widgets/charts/ChartWidget9'

const ScrappersView: React.FC = () => {
    const params = useParams()
    const [scrapper, setScrapper] = useState<any>()
    // GetScrapper
    useEffect(() => {
        if (params.id) {
            getScrapper(params.id)
                .then((res) => {
                    setScrapper(res.data.response.data.res)
                })
                .catch((err) => {
                    console.log({ err: err.message })
                })
        }
    }, [params.id])
    return (
        <Row className=' bg-white pt-6 ps-4 pb-10 mb-10'>
            <div className='card-title'>
                <h2>
                    {/* {scrapper?.name} */}
                    Amazon
                </h2>
            </div>
            <div className='text-muted fs-7 pe-20 mb-10'>
                {/* {scrapper?.description} */}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
            </div>
            <ChartsWidget9 className={'card text-dark'} ></ChartsWidget9>

        </Row >

    )
}
export { ScrappersView }
