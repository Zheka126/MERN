import React from 'react';
import { useRoutes } from './routes';
import 'materialize-css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const routes = useRoutes(false);
  return (
    <h1>
      <div className="container">
        <BrowserRouter>{routes}</BrowserRouter>
      </div>
    </h1>
  );
}

export default App;
