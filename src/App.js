import React from 'react';
import AddItemForm from './component/add-item-form/add-item-form';
import MainApp from './component/index';
import './app.css';

function App() {
  return (
    <div className="App">
      <AddItemForm />
      <MainApp />
    </div>
  )
}

export default App;
