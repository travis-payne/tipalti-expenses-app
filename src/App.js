import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';


export const App = () => {
  return (
    <div className="App">
      <header className="header">
        <h1>Expenses</h1>
        <hr />
      </header>
        <DataTable />



    </div>
  );
}

export default App;
