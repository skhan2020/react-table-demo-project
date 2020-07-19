import React from 'react' 
import ListItemRenderer from './item-renderer';

const SortableTableList = ({itemList, columns, onSelectClick, selectedItemsList, idTag}) => {
  return (
    <tbody>
        {itemList && itemList.map((item, key) => 
          <ListItemRenderer data={item} columns={columns}
            key={key}
            idTag={idTag}
            selectedItemsList={selectedItemsList}
            selectionHandler={onSelectClick}/>
          )
        }
    </tbody>
  )
}

export default SortableTableList;