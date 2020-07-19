import { ApolloClient, InMemoryCache } from '@apollo/client';
import { updateDessertList, setShowModal, addDessert, removeDeletedDessert } from '../redux/actions/dessertActions'
import gql from 'graphql-tag';
import store from '../redux/store';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});


export const retrieveDessertList = () => {
  client
    .query({
      query: gql`
        {
          dessertList {
            id
            name 
            nutrition {
              calories
              fat
              carbs
              protein
            }
          }
        }
      `
    })
    .then(resdata => {
      if (resdata && resdata.data && resdata.data.dessertList) {
        store.dispatch(updateDessertList(resdata.data.dessertList));
      }
    })
    .catch(err => {
      console.log(err)
    }
  );
}

export const addNewDessert = (e) => {
  let variable = { 
    name: e.name.value , 
    calories: parseInt(e.calories.value), 
    carbs: parseInt(e.carbs.value), 
    fat: parseInt(e.fat.value), 
    protein: parseInt(e.protein.value)};
  client.mutate({
    variables: variable,
      mutation: gql`
        mutation AddDessert($name: String!, $calories: Int!, $carbs: Int!, $fat: Int!, $protein: Int!){
          addDessert(dessertInput: {name: $name}, nutritionInput: {calories: $calories, carbs: $carbs, fat: $fat, protein: $protein}) {
            id
            name 
            nutrition {
              calories
              fat
              carbs
              protein
            }
          }
        }
      `,
    })
  .then(result => { 
    if (result && result.data && result.data.addDessert) {
      variable.id = Math.floor(Math.random() * 100000);;
      store.dispatch(addDessert(variable));
      store.dispatch(setShowModal(false));
    }
  })
  .catch(error => { console.log(error) });
}

export const deleteDesserts = ids => {
  const variable = ids;
  client.mutate({
    variables: variable,
      mutation: gql`
        mutation DeleteDesserts($ids: [Int!]){
          deleteDesserts(dessertIds: $ids) 
        }
      `,
    })
  .then(result => { 
    if (result && result.data && result.data.deleteDesserts) {
      store.dispatch(removeDeletedDessert(ids));
    }
  })
  .catch(error => { console.log(error) });
}