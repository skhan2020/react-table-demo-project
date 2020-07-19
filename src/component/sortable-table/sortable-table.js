import React, { useState, useEffect } from 'react';
import SortableTableList from './sortable-table-list/sortable-table-list';
import SortableTableHeader from './sortable-table-header';
import styled from 'styled-components';
import { StyledButton, SelectionCountBox } from '../styledComponents/index';
import { doSort } from '../../helper/index'

const ActionHeaderBox = styled.div`
  display: flex;
  padding: 5px 20px;
  text-align: left;
  align-items: center;
  background-color: #f9b5be;
`

const SortableTableBox = styled.table`
  width: 100%;
  overflow: hidden;
  border-collapse: collapse;
`

const SortableTable = ({data, headerList, addHandler, deleteHandler, idTag}) => {
  const [selectedItems, setSelectedItems] = useState(new Map());
  const [toggled, setToggled] = useState(false);
  const [sortedData, setSortedData] = useState([]);

  const resetSelection = () => {
    setSelectedItems(new Map());
    setToggled(false);
  }

  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
    resetSelection();
  }, [data])

  const onToggleAll = () => {
    if (toggled) {
      resetSelection();
    } else {
      const selectedMap = new Map();
      data.map(item => selectedMap.set(item[idTag], item))
      setSelectedItems(selectedMap);
      setToggled(true);
    }
  }

  const onSelectClick = item => {
    let newMap = new Map(selectedItems)
    if (selectedItems.get(item[idTag])) {
      newMap.delete(item[idTag]);
      setSelectedItems(newMap);
    } else {
      setSelectedItems(newMap.set(item[idTag], item));
    }
    setToggled(newMap.size === data.length);
  }

  const handleDelete = () => {
    if (selectedItems.size && deleteHandler) {
      let deleteList = [];
      selectedItems.forEach((value, key, map) => deleteList.push(parseInt(key)));
      deleteHandler(deleteList);
      setSelectedItems(new Map());
    }
  }

  const handleSortClick = type => {
    const newData = [...data]
    setSortedData(doSort(newData, type));
  }

  return(
    <>
      <ActionHeaderBox>
        <SelectionCountBox>{`${selectedItems.size} selected`}</SelectionCountBox>
          <StyledButton 
            fontColor='green' bgColor='white'
            onClick={addHandler}
          >&#43; Add New</StyledButton>
          <StyledButton 
            fontColor='#fd5876' 
            bgColor={selectedItems.size? 'white':'#f9d8dd'} 
            onClick={handleDelete}
            disable={selectedItems.size}>&#128465; Delete</StyledButton>
      </ActionHeaderBox>
      <SortableTableBox>
        <SortableTableHeader
          isToggled={toggled}
          headerList={headerList} 
          sortHandler={handleSortClick}
          onToggleAll={onToggleAll}/>
        <SortableTableList 
          itemList={sortedData} 
          columns={headerList} 
          idTag={idTag}
          selectedItemsList={selectedItems}
          onSelectClick={onSelectClick}/>
      </SortableTableBox>
    </>
  )
}

export default SortableTable;