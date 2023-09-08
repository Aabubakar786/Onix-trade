/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSS, getCSSVariableValue } from '../../../assets/ts/_utils'
import DatePickerComponent from '../../../../app/components/datepicker/DatePickerComponent'
import FormikDatePicker from '../../../../app/components/FormikComponents/FormikDatePicker'

type Props = {
  className: string
}

const ChartsWidget9: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height))
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'></span>

          <span className='text-muted fw-bold fs-7'></span>
        </h3>

        {/* begin::Toolbar */}
        <div className='card-toolbar' data-kt-buttons='true'>
          <div data-kt-daterangepicker="true" data-kt-daterangepicker-opens="left" data-kt-daterangepicker-range="today" className="btn btn-sm btn-light d-flex align-items-center px-5 py-0 me-5" data-kt-initialized="1">
            <DatePickerComponent date={new Date()} onChange={function (date: Date): void {
              throw new Error('Function not implemented.')
            }}></DatePickerComponent><i className="bi bi-calendar2-event-fill text-muted"></i>
          </div>

          <div data-kt-daterangepicker="true" data-kt-daterangepicker-opens="left" data-kt-daterangepicker-range="today" className="btn btn-sm btn-light d-flex align-items-center px-5 py-0" data-kt-initialized="1">
            <DatePickerComponent date={new Date()} onChange={function (date: Date): void {
              throw new Error('Function not implemented.')
            }}></DatePickerComponent><i className="bi bi-calendar2-event-fill text-muted"></i>
          </div>
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_3_chart' style={{ height: '350px' }}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export { ChartsWidget9 }

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const baseColor = '#8E8E8E'
  const lightColor = 'transparent'

  return {
    series: [
      {
        name: 'Net Profit',
        data: [90, 100, 80, 90, 40, 30, 100, 80, 20],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['2/4/2022', '3/4/2022', '4/4/2022', '5/4/2022', '6/4/2022', '7/4/2022', '8/4/2022', '9/4/2022', '10/4/2022'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,

        offsetY: 10,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      custom: function () {
        return "<div style={{ width: '130px', height: '50px', background: '#7B7979' }}> <span style = {{color: 'white',verticalAlign: '-webkit-baseline-middle',lineHeight: '4rem',marginLeft: '10px'}}> 900 Products</span></div>"
      }
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 0,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true  //or just here to disable only x axis grids
        }
      },
    },
    markers: {
      size: 5,
      colors: '#FE9300',
      strokeColors: '#fff',
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3
      }
    }
  }
}
