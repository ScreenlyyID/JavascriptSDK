import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router-dom";
import moment from "moment";
import {connect} from "react-redux";
import Processing from "./Processing";
import {bindActionCreators} from "redux";
import {processID} from './actions/processDataActions';
import {resetProcessedData} from "./actions/processDataActions";
import {resetConfig} from "./actions/configActions";
import {resetIDProperties} from "./actions/idPropertiesActions";
import Header from "./Header";

class Done extends Component {
    constructor(props) {
        super(props);
        }

    resetStoreAndRedirect() {
        // this.props.resetConfig();
        // this.props.resetIDProperties();
        // this.props.resetProcessedData();
        this.props.history.push('/');
    }

    

    render() {
        const myStyle = {
            display:"block",
            marginLeft:"auto",
            marginRight: "auto",
            width:"100"
        }

        const textStyle = {
            display:"block",
            marginLeft:"auto",
            marginRight: "auto",
            width:"100",
            paddingTop: "30px"
        }

        const textCongrats = {
            display:"block",
            marginLeft:"auto",
            marginRight: "auto",
            width:"100",
            paddingTop: "30px",
            paddingBottom: "30px"
        }
        return (
           
            <Fragment>

                <Header/>
                <div className='body column results'>
                    <div className='wrapper'>
                      
                                    <div className='row'>
                                        <img alt='screenlyy' src={require('../assets/images/like.png')} height='100' width='100' style={myStyle}/>
                                    </div>
                                    <div className='row'>
                                        <div style={textStyle}>You're done!</div>
                                    </div>
                                    <div className='row'>
                                        <div style={textCongrats}>Congrats! Your verification is complete</div>
                                    </div>
                                   
                             
                        
                        <a className='btn' onClick={() => this.resetStoreAndRedirect()}>
                            <p className={'buttonBgText'}>Done</p>
                        </a>
                    </div>
                </div>

                </Fragment>
      
        );
     }
}

// function mapStateToProps(state) {
//     return state;
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({}, dispatch);
// }

export default connect()(Done);