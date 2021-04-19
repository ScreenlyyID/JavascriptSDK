import React, {Component, Fragment} from 'react';

export default class MobileOnly extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            
                
                <div class="container">
                            <h3 class="font-size-lg">Lets get you verified</h3>
                            <div class="box col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
                                <div class="box-item">
                                    <img src="../../assets/verification/id.png" alt="src" />
                                    <div class="box-item-content">
                                        <p class="h6">Prepare a valid document</p>
                                        <div>Make sure it is not expired or physically damaged</div>
                                    </div>
                                </div>

                                <div class="box-item">
                                    <img src="../../assets/verification/phone.png" alt="src" />
                                    <div class="box-item-content">
                                        <p class="h6">Use a smartphone</p>
                                        <div >A smart phone is required to continue</div>
                                    </div>
                                </div>
                                <div class="box-item-center col-12 mt-3">
                                    <h6 class="box-item-title">To Capture images on your mobile device</h6>
                                    <br />
                                    <div class="col-lg-10 col-md-12 offset-lg-1 text-left">
                                        <div> 1. Open camera app from mobile device and scan the QR code below</div>
                                        <div> 2. Tap the push notification to open the
                                            app.screenlyyid.com website </div>
                                    </div>
                                </div>
                                <div class="box-images">
                                    <img class="col-3" src="../../assets/verification/phone-qr-code.png"/>
                                    <img class="col-3" src=""/>
                                    <img class="col-3" src="../../assets/verification/qr-code.png"/>
                                </div>
                            </div>
                            <div class="col-12 text-center">
                                <div class="small caption-2">Powered by ScreenlyyID</div>
                                <div class="small caption-2">Read more about your personal data processing in ScreenlyyID Privacy Policy</div>
                            </div>
                        </div>
                
            
        )
    }

}