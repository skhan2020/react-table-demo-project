import React, { useEffect } from 'react';
import SortableTable from '../sortable-table/sortable-table';
import { StyledButton } from '../styledComponents/index';
import { setShowModal } from '../../redux/actions/dessertActions';
import { getDessertList } from '../../redux/selectors/index';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveDessertList, deleteDesserts } from '../../service/index'
import styled from 'styled-components';

const MainHeaderBox = styled.div`
  display: flex;
`
const MainHeader = styled.span`
  width: 100%;
  padding: 1em;
  text-align: left;
  font-size: 1.5em;
`

const NutritionTable = () => {
  const dispatch = useDispatch();
  const dessertList = useSelector(getDessertList);

  useEffect(() => {
    retrieveDessertList();
  }, [])

  const headerList =  [ {
      label: "Dessert (100g servings)",
      header: "name",
    },
    {   
      label: "Calories",
      header: "calories",
    },
    {   
      label: "Fat (g)",
      header: "fat",
    },
    {   
      label: "Carbs (g)",
      header: "carbs",
    },
    {   
      label: "Protein (g)",
      header: "protein",
    }
  ];
  
  const addHandler = () => {
    dispatch(setShowModal(true));
  }

  const deleteHandler = list => {
    deleteDesserts(list);
  }
  return(
    <div>
      <MainHeaderBox>
        <MainHeader>Nutrition List</MainHeader>
        <StyledButton onClick={retrieveDessertList} minWidth="150px" >
          <span style={{fontSize: '1.5em', fontWeight: 'normal'}}>
            &#8634;
          </span> 
           { 'RESET DATA'}
        </StyledButton>
      </MainHeaderBox>
      <SortableTable 
        addHandler={addHandler}
        deleteHandler={deleteHandler}
        data={dessertList}
        idTag="id"
        headerList={headerList}/>
    </div>
    )
}

export default NutritionTable;