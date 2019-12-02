import React from 'react';
import 'antd/dist/antd.css';
import { CustomLayout } from './containers/Layout';
import BaseRouter from './routes';
import { BrowserRouter as Router } from 'react-router-dom';


export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <CustomLayout>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
  
}
