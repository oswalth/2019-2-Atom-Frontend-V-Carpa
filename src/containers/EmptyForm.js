import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Link, withRouter } from 'react-router-dom';


class EmptyForm extends React.Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(EmptyForm));