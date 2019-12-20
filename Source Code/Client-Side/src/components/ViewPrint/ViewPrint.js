import React, { Component } from 'react';
import { Form, Container } from 'react-bootstrap'

import DatePicker from 'react-datepicker'
import axios from 'axios';

import TransactionList from './TransactionList';
import HelpPopOver from './HelpPopOver';

class ViewPrint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactionList: [],
            startDate: '',
            totalAmount: 0,
            serverError: false
        };
    }

    componentDidMount() {
        this.props.changeActive('viewPrint');
    }

    //=========AXIOS
    getAllTransaction = (val) => {
        let currentComponent = this;
        console.log('getAllTransaction')
        axios.get('http://localhost:5000/api/getTransactions', {
            params: {
                date: val
            }
        })
            .then(async function (response) {
                const res = await response.data
                console.log(res)
                currentComponent.setState(() => {
                    return {
                        transactionList: res
                    }
                });
            })
            .catch(function (error) {
                currentComponent.setState(() => {
                    return {
                        serverError: true
                    }
                });
            });
    }

    getTodaysTotalAmount = (val) => {
        let currentComponent = this;
        console.log('getTodaysTotalAmount');
        axios.get('http://localhost:5000/api/getTodaysSum', {
            params: {
                date: val
            }
        })
            .then(async function (response) {
                const res = await response.data

                currentComponent.setState(() => {
                    return {
                        totalAmount: res
                    }
                });
            })
            .catch(function (error) {
                currentComponent.setState(() => {
                    return {
                        serverError: true
                    }
                });
            });
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
        const newDate = new Date(date).toLocaleDateString();
        this.getAllTransaction(newDate);
        this.getTodaysTotalAmount(newDate);
    };

    render() {
        return (
            <>
                {this.state.serverError ? <h1>There's a problem with the server please contact the developer or try again later.</h1>
                    :
                    <Container>

                        <h2 style={{ "fontStyle": "italic", "textDecoration": "underline" }}>View Transaction</h2>

                        <Form.Label>
                            <p>Select Date</p>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange} />
                        </Form.Label>

                        <HelpPopOver />

                        <TransactionList
                            transactionList={this.state.transactionList}
                            selectedDate={this.state.startDate}
                            totalAmount={this.state.totalAmount}
                        />

                    </Container>
                }

            </>
        );
    }
}

export default ViewPrint;