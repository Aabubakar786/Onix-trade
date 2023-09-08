import React, {useState} from 'react'
import {Nav, Tab} from 'react-bootstrap'
import FormikInputField from './FormikInputField'
import FormikHistoricalPrice from './FormikHistoricalPrice'

const FormikPriceTabs = () => {
  const [activeKey, setActiveKey] = useState<string | number | undefined>('price')
  const handleSelect = (key: string | null) => {
    setActiveKey(key as string)
  }
  return (
    <Tab.Container id='product-price-tabs' onSelect={handleSelect} activeKey={activeKey}>
      <Nav variant='pills' className='mb-3'>
        <Nav.Item>
          <Nav.Link
            className={`form-control cursor-pointer text-dark ${
              activeKey === 'price' ? 'form-control-solid' : 'text-dark'
            } required`}
            eventKey='price'
          >
            Active Price
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link
            className={`form-control  cursor-pointer text-dark ${
              activeKey === 'historicalPrices' ? 'form-control-solid' : 'text-dark'
            } required`}
            eventKey='historicalPrices'
          >
            Set Historicalprices With Time
          </Nav.Link>
        </Nav.Item> */}
      </Nav>

      <Tab.Content className='border-container mb-10'>
        <Tab.Pane eventKey='price'>
          <FormikInputField
            required
            name='price'
            label='Set Active Price'
            type='number'
            placeholder='Price here'
          />
        </Tab.Pane>
        <Tab.Pane eventKey='historicalPrices'>
          <FormikHistoricalPrice name='historicalPrices' />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  )
}

export default FormikPriceTabs
