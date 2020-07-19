import React from 'react';
import styled from 'styled-components';

const SortableTableRow = styled.tr`
  height: 40px;
  border: 1px solid gray;
  @media (max-width: 500px) {
    font-size: .8em;
  }
`

const RenderCellItem = ({item, data}) => {
  return (
    <td>
      {item.render ? item.render(data[item.header]) : data[item.header]}
    </td>
  );
}

const ListItemRenderer = ({data, columns, selectionHandler, selectedItemsList, idTag}) => {
  if (!columns) {
    return null;
  }
  return (
    <SortableTableRow>
      <td>
        <input type="checkbox" onChange={() => selectionHandler(data)}
          checked={selectedItemsList && selectedItemsList.get(data[idTag])}>
        </input>
      </td>
      { columns.map((item, key) => <RenderCellItem 
            key={key} item={item} data={data}/>) }
    </SortableTableRow>
    )
}

export default ListItemRenderer;