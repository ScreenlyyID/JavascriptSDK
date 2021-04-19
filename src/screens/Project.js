import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import APIKeyManager from '../services/shared/apiKeyManager';

class Project extends React.Component {
    componentDidMount() {
        const apiKey = this.props.match.params.api_key;
        APIKeyManager.setAPIKey(apiKey);
        this.props.push('/');
    }

    render() {
        return (
            <div>
                Setting API keys...
            </div>
        );
    }
}

export default connect(null, {
    push
})(Project);