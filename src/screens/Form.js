import React, { Component, Fragment } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "./Header";
import { inputValidator, dateValidator } from './Form/Validators';
import { setInstanceID } from "./actions/configActions";
import SanctionService from '../services/api/sanction';
import { relativeTimeThreshold } from 'moment';

class Form extends Component {
    validate = {
        FirstName: name => inputValidator('First Name', name),
        LastName: name => inputValidator('Last Name', name),
        Street: name => inputValidator('Street', name),
        City: name => inputValidator('City', name),
        State: name => inputValidator('State', name),
        Zip: name => inputValidator('Zip', name),
        CountryCode: name => inputValidator('Country', name),
        DateOfBirth: name => dateValidator('Date of Birth', name)
    };

    constructor(props) {
        super(props);
        this.state = {
            values: {
                FirstName: '',
                LastName: '',
                Street: '',
                City: '',
                State: '',
                Zip: '',
                CountryCode: '',
                DateOfBirth: '',
            },
            errors: {},
            touched: {},
        }

    }

    componentDidMount() {
        if (!this.props.instanceID) {
            this.props.setInstanceID();
        }
    }

    handleChange = evt => {
        let { name, value } = evt.target;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        });
        this.setState({
            touched: {
                ...this.state.touched,
                [name]: true
            }
        });
    };

    handleBlur = evt => {
        let { name, value } = evt.target;
        let { [name]: removedError, ...rest } = this.state.errors;
        let error = this.validate[name](value);
        this.setState({
            errors: {
                ...rest,
                ...(error && { [name]: this.state.touched[name] && error }),
            }
        });
    };


    handleSubmit = evt => {
        evt.preventDefault();
        let formValidation = Object.keys(this.state.values).reduce(
            (acc, key) => {
                const newError = this.validate[key](this.state.values[key]);
                const newTouched = { [key]: true };
                return {
                    errors: {
                        ...acc.errors,
                        ...(newError && { [key]: newError }),
                    },
                    touched: {
                        ...acc.touched,
                        ...newTouched,
                    },
                };
            },
            {
                errors: { ...this.state.errors },
                touched: { ...this.state.touched },
            },
        );
        this.setState({ errors: formValidation.errors });
        this.setState({ touched: formValidation.touched });

        if (
            !Object.values(formValidation.errors).length && 
            Object.values(formValidation.touched).length ===
            Object.values(this.state.values).length && 
            Object.values(formValidation.touched).every(t => t === true) 
        ) {
            let data = JSON.stringify(this.state.values, null, 2);
            console.log(this.props.correlationID);
            SanctionService.postSanctionForm(data, this.props.correlationID)
                .then(response => {
                    this.props.dispatch({ payload: response.res, type: '@@acuant/ADD_SANCTIONS_DATA' });
                    this.props.history.push('/results/default');
                });
        }
    };

    render() {
        return (
            <Fragment>
                <Header />
                <div className='row wrapper description_container'>
                        <p className='description'>Add further details to perform a sanctions and watchlist check, or skip this step.</p>
                    </div>
                    
                <div className='body column results'>
                    <form onSubmit={this.handleSubmit} autoComplete="off" className='form-container'>
                        <div className="form-group">
                            <label htmlFor="FirstName">First name:</label>
                            <input type="text"
                                name="FirstName" id="FirstName"
                                className='form-control'
                                placeholder="Enter first name"
                                value={this.state.values.FirstName || ''}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                required
                            />
                            <span className='error'>{this.state.touched.FirstName && this.state.errors.FirstName}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="LastName">Last name:</label>
                            <input type="text" className='form-control'
                                name="LastName" id="LastName"
                                className='form-control'
                                placeholder="Enter last name"
                                value={this.state.values.LastName || ''}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                required />
                            <span className='error'>{this.state.touched.LastName && this.state.errors.LastName}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Street">Address Line 1:</label>
                            <input type="text" className='form-control'
                                name="Street" id="Street"
                                className='form-control'
                                placeholder="Enter street"
                                value={this.state.values.Street || ''}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                required />
                            <span className='error'>{this.state.touched.Street && this.state.errors.Street}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <input type="text" className='form-control'
                                name="City" id="City"
                                className='form-control'
                                placeholder="Enter city"
                                value={this.state.values.City || ''}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                required />
                            <span className='error'>{this.state.touched.City && this.state.errors.City}</span>
                        </div>
                        <div className="form-group-row">
                            <div style={{ width: '45%' }}>
                                <label htmlFor="state">State:</label>
                                <input type="text" name="state" id="state" className='form-control'
                                    name="State" id="State"
                                    className='form-control'
                                    placeholder="Enter state"
                                    value={this.state.values.State || ''}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    required />
                                <span className='error'>{this.state.touched.State && this.state.errors.State}</span>
                            </div>
                            <div style={{ width: '45%' }}>
                                <label htmlFor="firstName">Postcode / Zip:</label>
                                <input type="text" className='form-control'
                                    name="Zip" id="Zip"
                                    className='form-control'
                                    placeholder="Enter postcode/zip code"
                                    value={this.state.values.Zip || ''}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    required />
                                <span className='error'>{this.state.touched.Zip && this.state.errors.Zip}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">Country Code (use country code such as US or AU):</label>
                            <input type="text" className='form-control'
                                name="CountryCode" id="CountryCode"
                                className='form-control'
                                placeholder="Enter country"
                                value={this.state.values.CountryCode || ''}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                required />
                            <span className='error'>{this.state.touched.CountryCode && this.state.errors.CountryCode}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">Date of Birth:</label>
                            <input type="date" className='form-control'
                                name="DateOfBirth" id="DateOfBirth"
                                className='form-control'
                                placeholder="Select date"
                                value={this.state.values.DateOfBirth || ''}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                required />
                            <span className='error'>{this.state.touched.DateOfBirth && this.state.errors.DateOfBirth}</span>
                        </div>
                        <div className="wrapper column capture_controls">
                            <button type="submit" className='btn'>
                                <p className={'buttonBgText'}>Done</p>
                            </button>
                        </div>
                        <div className="wrapper column capture_controls">
                            <div className='btn outline' onClick={() => { this.props.history.push('/results/default') }}>
                                <p className={'buttonBdText'}>Skip this step</p>
                            </div>
                        </div>
                    </form>
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

function mapStateToProps(state) {
    return {
        instanceID: state.config.instanceID,
        correlationID: state.config.correlationID,
        sanctions: state.processedData.sanctions
    };
}

function mapDispatchToProps(dispatch) {
    let actions =  bindActionCreators({ setInstanceID }, dispatch);
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
