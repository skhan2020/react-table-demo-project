import React from 'react' 
import styled from 'styled-components'

const SortableTableRow = styled.tr`
  height: 40px;
  border: 1px solid gray;
  @media (max-width: 500px) {
    font-size: .6em;
  }
`
const SortableTableHeader = ({headerList, onToggleAll, sortHandler, isToggled}) => {
  return(
    <thead>
      <SortableTableRow>
        <th><input type="checkbox" onChange={onToggleAll} checked={isToggled}></input></th>
          {headerList && headerList.map((item, index) => <th
            key={index}
            onClick={() => sortHandler(item.header)}>
            {item.label} &#8645;
          </th>
        )}
      </SortableTableRow>
    </thead>
  )
}

export default SortableTableHeader;