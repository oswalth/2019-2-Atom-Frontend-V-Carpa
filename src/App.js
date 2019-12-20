/* eslint-disable no-unused-vars */
import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomLayout from './containers/Layout';
import BaseRouter from './routes/routes';
import * as actions from './store/actions/auth';


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

const mapStateToProps = (state) => ({
  isAuthenticated: state.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  logout: () => dispatch(actions.logout()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
