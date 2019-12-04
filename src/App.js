import React from 'react';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import BaseRouter from './routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth'


class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  
  render() {
    return (
      <div className="App">
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter logout={this.props.logout}/>
          </CustomLayout>
        </Router>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout()) 
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);