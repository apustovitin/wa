import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home/Home'
import { Header } from './shared/Header/Header'

function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
