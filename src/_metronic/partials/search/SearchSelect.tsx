import React, {ChangeEventHandler, FC} from 'react'
import CustomMenu from '../menu/CustomMenu'
import EmptyResult from '../EmptyResult'

type Props = {
  value?: string
  data?: any[]
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  loading?: boolean
  selected?: any
  onSelect?: (selected: any) => void
  displayKey?: string
}
const SearchSelect: FC<Props> = ({
  value,
  data,
  placeholder = 'Select',
  onChange,
  loading,
  selected,
  onSelect,
  displayKey = 'label',
}) => {
  return (
    <CustomMenu
      menuToggle={
        <span className='form-select form-select-solid'>
          {selected ? selected[displayKey] : placeholder}
        </span>
      }
      menuWidth='w-250px'
      menuClassName='py-0'
      menuBody={
        <div className='select2-container--bootstrap5 '>
          <div className='select2-dropdown'>
            <div className='mx-4 position-relative d-flex align-items-center select2-search'>
              <input
                type='text'
                value={value}
                onChange={onChange}
                className='select2-search__field w-100'
              />
              {loading && (
                <span
                  className='position-absolute  spinner-border-sm spinner-border fs-10 '
                  style={{right: 25}}
                />
              )}
            </div>
            <div className='select2-results__options'>
              {!data || data?.length === 0 ? (
                <EmptyResult searchText={value} />
              ) : (
                <div>
                  {data.map((item) => (
                    <div
                      key={item.id}
                      className={`select2-results__option cursor-pointer ${
                        item.id === selected?.id ? 'select2-results__option--selected' : ''
                      }`}
                      onClick={() => onSelect && onSelect(item)}
                    >
                      {item[displayKey]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      }
      toggleClassName='w-100 '
    />
  )
}

export default SearchSelect
