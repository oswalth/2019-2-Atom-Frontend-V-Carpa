/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { DialoguesHeader } from '../components/DialoguesHeader';


class CustomLayout extends React.Component {
  render() {
    return (
            <div>
                {
                    this.props.isAuthenticated
                      ? <DialoguesHeader
                        isAuthenticated={this.props.isAuthenticated}
                        logout={this.props.logout}
                        history={this.props.history}>
                    </DialoguesHeader>
                      : <DialoguesHeader
                        isAuthenticated={this.props.isAuthenticated}>
                    </DialoguesHeader>
                }
                {this.props.children}
            </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: ownProps.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));
