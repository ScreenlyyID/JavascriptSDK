import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { replace, push } from 'connected-react-router';
import {isMobile} from "react-device-detect";
import CapturePhoto from './screens/CapturePhoto';
import CaptureSelfie from './screens/CaptureSelfie';
import Results from './screens/Results/index';
import Error from './screens/Error/index';
import Done from './screens/Done';
import Form from './screens/Form';
import "./styles/main.css";
import ProcessedImageResult from "./screens/ProcessedImageResult";
import AcuantReactCamera from "./screens/AcuantReactCamera";
import Project from "./screens/Project";

/*
global Raven
 */

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            isAcuantSdkLoaded: false
        }
        this.isInitialized = false;
        this.isIntializing = false;
    }

    componentDidMount() {
        if (process.env.REACT_APP_SENTRY_SUBSCRIPTION_ID && process.env.REACT_APP_SENTRY_SUBSCRIPTION_ID.length > 0) {
            Raven.config(process.env.REACT_APP_SENTRY_SUBSCRIPTION_ID).install()
        }

        if (process.env.REACT_APP_MOBILE_ONLY === 'true') {
            if (!isMobile) {
                //this.props.history.replace('/error/mobileonly');
                //document.body.classList.add('mobile-only');
                this.setState({isAcuantSdkLoaded: true});
                window.location.href =  'https://screenlyyid-admin.azurewebsites.net/qrcode';
            } else {
                if (!this.props.config) {
                    this.props.history.replace('/');
                }
                this.loadScript();
            }
        } else {
            if (!this.props.config) {
                this.props.history.replace('/');
            }
            this.loadScript();
        }
        
  
    }

    loadScript(){
        window.onAcuantSdkLoaded = function(){
            this.initialize();
        }.bind(this);

        const sdk = document.createElement("script");
        sdk.src = "AcuantJavascriptWebSdk.min.js";
        sdk.async = true;

      
        document.body.appendChild(sdk);
    }

    componentDidCatch(error, errorInfo) {
        if (process.env.REACT_APP_SENTRY_SUBSCRIPTION_ID && process.env.REACT_APP_SENTRY_SUBSCRIPTION_ID.length > 0) {
            Raven.captureException(error, {extra: errorInfo});
        }
        this.props.history.replace('/error/default')
    }

    initialize(){
        if(!this.isInitialized && !this.isIntializing){
            this.isIntializing = true;

            window.AcuantJavascriptWebSdk.initialize(
                (function(){
                    if(process.env.NODE_ENV === 'development'){
                        return btoa(`${process.env.REACT_APP_USER_NAME}:${process.env.REACT_APP_PASSWORD}`);
                    }
                    else{
                        return process.env.REACT_APP_AUTH_TOKEN;
                    }
                })(), 
                process.env.REACT_APP_ID_ENDPOINT,
                {
                    onSuccess:function(){
                        this.isInitialized = true;
                        this.isIntializing = false;
                        this.setState({
                            isAcuantSdkLoaded:true
                        })
                    }.bind(this),

                    onFail: function(){
                        this.isIntializing = false;
                        this.setState({
                            isAcuantSdkLoaded:true
                        })
                    }.bind(this)
                });
        } 
    }

    render() {
        return (
            <div className={'mainContent'}>
                <Switch>
                    {/*<Redirect exact from="/" to="/form"/>*/}
                    <Route path="/" exact component={CapturePhoto}/>
                    <Route path="/capture/photo" exact component={CapturePhoto}/>
                    <Route path="/capture/camera" exact component={AcuantReactCamera}/>
                    <Route path="/photo/confirm" exact component={ProcessedImageResult} />
                    {/* <Route path="/photo/documentimage" exact component={DocumentImage} /> */}
                    <Route path="/capture/selfie" exact component={CaptureSelfie}/>
                    <Route path="/sanctions" exact component={Form} />
                    {/* <Redirect exact from="/" to="/form"/> */}
                    <Route path='/results' component={Results}/>
                    <Route path='/done' component={Done}/>
                    <Route path='/form' component={Form}/>
                    <Route path="/error" component={Error}/>
                    <Route path="/project/:api_key" component={Project}/>
                </Switch>
            </div>
        );
    }
}

export default App
