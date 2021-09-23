import React, { useState } from 'react';
import Navbar from "./components/Navbar/Navbar"
import CardList from "./components/CardList/CardList"
import './App.css';
import { MenuItems } from './components/Navbar/MenuItems';
import { Provider } from 'react-redux';
import store from './redux/store';
import Order from './components/Order/Order';
import data from './data';

function App() {
  const [pageVisible, setPageVisible] = useState(MenuItems[0])
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar setPageVisible={setPageVisible} />
        <div className="body">
          {pageVisible.title == 'Order' ?
            <Order data={data} /> : <CardList status={pageVisible.title} />}
        </div>
      </div>
    </Provider>

  );
}

export default App;
