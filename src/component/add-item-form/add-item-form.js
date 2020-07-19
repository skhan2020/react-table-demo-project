import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { showModal, getDessertList } from '../../redux/selectors'
import styled from 'styled-components';
import { StyledButton } from '../styledComponents/index'
import { setShowModal } from '../../redux/actions/dessertActions';
import { useDispatch } from 'react-redux';
import { addNewDessert } from '../../service/index';
import useForm from './use-form';

const BackDrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background: rgba(0,0,0,0.75);
  z-index: 500;
`

const AddForm = styled.form`
  position: fixed;
  width: 40vw;
  background: white;
  display: flex;
  flex-direction: column;
  left: 50%;
  z-index: 700;
  top: 20vh;
  transform: translateX(-50%);
  text-align: left;
  padding: 20px;
  @media (max-width: 500px) {
    width: 80vw;
    top: 10px;
  }
`
const FormHeaderLabel = styled.label `
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 1.1em;
  background-color: orange;
  color: white;
  font-weight: bold;
`
const FormInput = styled.input `
  width: 100%;
  height: 30px;
`
const FormLabel = styled.label `
  font-size: 1.1em;
  margin: 10px;
`
const ErrorLabel = styled.div`
  font-size: .9em;
  color: red;
`
const StyledInputButton = styled.input`
  min-width: 150px;
  height: 40px;
  margin: 20px;
  font-size: 1em;
  color: ${props => props.fontColor || 'white'};
  border-style: none;
  background-color: ${props => props.bgColor || 'green'};
  font-weight: bold;
`
StyledButton.displayName = 'StyledButton';


const AddItemForm = () => {
  const dispatch = useDispatch();
  const displayModal = useSelector(showModal);
  const list = useSelector(getDessertList);
  const [nameError, setNameError] = useState(false);

  const stateSchema = {
    name: { value: '', error: '' },
    calories: { value: '', error: '' },
    carbs: { value: '', error: '' },
    fat: { value: '', error: '' },
    protein: { value: '', error: '' },
  };

  const validationStateSchema = {
    name: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z]+$/,
        error: 'Invalid name format',
      },
    },
    calories: {
      required: true,
      validator: {
        regEx: /^[0-9]*$/,
        error: 'Invalid value',
      },
    },
    carbs: {
      required: true,
      validator: {
        regEx: /^[0-9]*$/,
        error: 'Invalid value',
      },
    },
    fat: {
      required: true,
      validator: {
        regEx: /^[0-9]*$/,
        error: 'Invalid value',
      },
    },
    protein: {
      required: true,
      validator: {
        regEx: /^[0-9]*$/,
        error: 'Invalid value',
      },
    },
  };

  const handleSubmit = e => {
    // add to graphql 
    if (list.filter(item => item.name.toLowerCase() === e.name.value.toLowerCase()).length > 0) {
      setNameError(true);
    } else {
      addNewDessert(e);
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable, reset } = useForm(
    stateSchema,
    validationStateSchema,
    handleSubmit
  );

  const closeModal = () => {
    reset();
    dispatch(setShowModal(false));
  }

  if (!displayModal) {
    return null;
  }

  return (
    <>
      <BackDrop onMouseDown={closeModal}/>
      <AddForm onSubmit={handleOnSubmit} >
        <FormHeaderLabel>
          Please fill all forms before you submit
        </FormHeaderLabel>
        <FormLabel>
          Dessert Name * {state.name.error && <ErrorLabel>{state.name.error}</ErrorLabel>}
            {nameError && <ErrorLabel>A Dessert by this name already exist!</ErrorLabel>}
          <FormInput type="text" name="name" 
              onChange={handleOnChange}/>
        </FormLabel>
        <FormLabel>
          Calories * {state.calories.error && <ErrorLabel>{state.calories.error}</ErrorLabel>}
          <FormInput type="text" name="calories" 
              onChange={handleOnChange}/>
        </FormLabel>
        <FormLabel>
          Fat * {state.fat.error && <ErrorLabel>{state.fat.error}</ErrorLabel>}
          <FormInput type="text" name="fat" 
              onChange={handleOnChange}/>
        </FormLabel>
        <FormLabel>
          Carbs * {state.carbs.error && <ErrorLabel>{state.carbs.error}</ErrorLabel>}
          <FormInput type="text" name="carbs" 
              onChange={handleOnChange}/>
        </FormLabel>
        <FormLabel>
          Protein * {state.protein.error && <ErrorLabel>{state.protein.error}</ErrorLabel>}
          <FormInput type="text" name="protein" 
              onChange={handleOnChange}/>
        </FormLabel>
          <StyledInputButton type="submit" value="Submit" text="submit" disable={disable} />
      </AddForm>
    </>
  );
}

export default AddItemForm;