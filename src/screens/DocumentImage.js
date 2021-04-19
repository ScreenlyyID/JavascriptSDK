import React, { Component, Fragment } from 'react';
import Header from './Header';
import { connect } from 'react-redux';

class DocumentImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            inputValue: '',
            selfie: null
        };
    }
    
    render() {
        return (
            <Fragment>
                <Header />
                <image></image>
            </Fragment>
        );
    }

}

export default connect()(DocumentImage);