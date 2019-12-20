import React, { Component } from 'react';

import { Col, Alert } from 'react-bootstrap'

// Components
import AddTransaction from './AddTransaction'
import TransactionsTable from './TransactionsTable'
import EditModal from './EditModal';




import axios from 'axios';

class Record extends Component {

    constructor(props) {
        super(props);

        this.transactionTitle = React.createRef();
        this.transactionDescription = React.createRef();
        this.transactionAmount = React.createRef();
        this.transactionType = React.createRef();

        this.state = {
            transactionList: [],
            todaysDate: '',
            totalAmount: 0,
            modalId: '',
            modalDate: '',
            modalTitle: '',
            modalDescription: '',
            modalType: '',
            modalAmount: '',
            titleHasError: '',
            descriptionHasError: '',
            amountHasError: '',
            typeHasError: '',
            successSave: false,
            failedSave: false,
            modalState: false,
            serverError: false
        };
    }

    //=========AXIOS
    getTodaysDateAndList = () => {
        let currentComponent = this;
        console.log('getTodaysDateAndList');
        axios.get('http://localhost:5000/api/todaysDate')
            .then(async function (response) {
                const res = await response.data.date
                currentComponent.setState(() => {
                    return {
                        todaysDate: res
                    }
                })
                return res;
            })
            .then(
                (res) => {
                    this.getAllTransaction(res);
                    return res;
                }
            )
            .then(
                (res) => {
                    this.getTodaysTotalAmount(res);
                }
            )
            .catch(function (error) {
                currentComponent.setState(() => {
                    return {
                        serverError: true
                    }
                });
            });
    }

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



    saveTransaction = (cb) => {
        let currentComponent = this;
        axios.post('http://localhost:5000/api/saveNewTransaction', {
            "id": 0,
            "date": this.state.todaysDate,
            "title": this.transactionTitle.current.value,
            "description": this.transactionDescription.current.value,
            "type": this.transactionType.current.value,
            "amount": this.transactionAmount.current.value
        })
            .then(function (response) {
                if (cb) {
                    return cb()
                }
            })
            .catch(function (error) {
                currentComponent.setState(() => {
                    return {
                        serverError: true
                    }
                });
            });
    }

    updateTransaction = (cb) => {
        let currentComponent = this;
        axios.put('http://localhost:5000/api/updateTransaction', {
            "id": this.state.modalId,
            "date": this.state.modalDate,
            "title": this.state.modalTitle,
            "description": this.state.modalDescription,
            "type": this.state.modalType,
            "amount": this.state.modalAmount
        })
            .then(function (response) {
                if (cb) {
                    cb();
                }
            })
            .catch(function (error) {
                currentComponent.setState(() => {
                    return {
                        serverError: true
                    }
                });
            });
    }

    deleteTransaction = (cb) => {
        let currentComponent = this;
        axios.delete('http://localhost:5000/api/deleteTransaction', {
            params: {
                "id": this.state.modalId
            }
        })
            .then(function (response) {
                if (cb) {
                    cb();
                }
            })
            .catch(function (error) {
                currentComponent.setState(() => {
                    return {
                        serverError: true
                    }
                });
            });
    }


    //=====LIFE CYCLE
    componentDidMount() {
        this.props.changeActive('record');
        this.getTodaysDateAndList();
    }




    validate = () => {
        let hasAnyError = false;

        if (this.transactionTitle.current.value === '') {
            this.setState(() => {
                return {
                    titleHasError: true
                };
            })
            hasAnyError = true;
        } else {
            this.setState(() => {
                return {
                    titleHasError: false
                };
            })
        }

        if (this.transactionDescription.current.value === '') {
            this.setState(() => {
                return {
                    descriptionHasError: true
                };
            })
            hasAnyError = true;
        } else {
            this.setState(() => {
                return {
                    descriptionHasError: false
                };
            })
        }

        if (this.transactionAmount.current.value === '' || isNaN(this.transactionAmount.current.value)) {
            this.setState(() => {
                return {
                    amountHasError: true
                };
            })
            hasAnyError = true;
        } else {
            this.setState(() => {
                return {
                    amountHasError: false
                };
            })
        }

        if (this.transactionType.current.value === '') {
            this.setState(() => {
                return {
                    typeHasError: true
                };
            })
            hasAnyError = true;
        } else {
            this.setState(() => {
                return {
                    typeHasError: false
                };
            })
        }

        if (hasAnyError) {
            return true;
        } else {
            return false;
        }
    }

    clearInput = () => {
        this.transactionTitle.current.value = '';
        this.transactionDescription.current.value = '';
        this.transactionAmount.current.value = '';
        this.transactionType.current.value = '';
    }

    clearErrors = () => {
        this.setState(() => {
            return {
                titleHasError: '',
                descriptionHasError: '',
                amountHasError: '',
                typeHasError: '',
                failedSave: false
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let hasError = this.validate();

        if (hasError) {
            this.setState(() => {
                return {
                    successSave: false,
                    failedSave: true
                }
            })
        } else {
            console.log("save called")
            this.setState(() => {
                return {
                    successSave: true,
                    failedSave: false
                }
            })
            setTimeout(() => {
                this.setState(() => {
                    return {
                        successSave: false,
                        failedSave: false
                    }
                })
            }, 1000)
            this.saveTransaction(this.getTodaysDateAndList());
            this.clearInput();
            this.clearErrors();
        }
    }




    handleModalShow = (e) => {
        let targetNode = e.target.parentNode;
        let id = targetNode.childNodes[0].textContent;
        let date = targetNode.childNodes[1].textContent;
        let title = targetNode.childNodes[2].textContent;
        let description = targetNode.childNodes[3].textContent;
        let type = targetNode.childNodes[4].textContent;
        let amount = targetNode.childNodes[5].textContent;

        // pass column values
        this.setState(() => {
            return {
                modalId: id,
                modalDate: date,
                modalTitle: title,
                modalDescription: description,
                modalType: type,
                modalAmount: amount,
                modalState: true
            }
        })
    }

    handleModalClose = () => {
        //clear modal values
        this.setState(() => {
            return {
                modalId: '',
                modalDate: '',
                modalTitle: '',
                modalDescription: '',
                modalType: '',
                modalAmount: '',
                modalState: false
            }
        })
    }

    handleModalTitleChange = (val) => {
        this.setState({ modalTitle: val })
    }

    handleModalDescriptionChange = (val) => {
        this.setState({ modalDescription: val })
    }

    handleModalTypeChange = (val) => {
        this.setState({ modalType: val })
    }

    handleModalAmountChange = (val) => {
        this.setState({ modalAmount: val })
    }

    render() {
        return (
            <>
                {
                    this.state.serverError ? <h1>There's a problem with the server please contact the developer or try again later.</h1>
                        :
                        <>
                            <EditModal
                                handleModalClose={this.handleModalClose}
                                modalState={this.state.modalState}
                                modalId={this.state.modalId}
                                modalDate={this.state.modalDate}
                                modalTitle={this.state.modalTitle}
                                modalDescription={this.state.modalDescription}
                                modalType={this.state.modalType}
                                modalAmount={this.state.modalAmount}

                                handleModalTitleChange={this.handleModalTitleChange}
                                handleModalDescriptionChange={this.handleModalDescriptionChange}
                                handleModalTypeChange={this.handleModalTypeChange}
                                handleModalAmountChange={this.handleModalAmountChange}

                                updateTransaction={this.updateTransaction}
                                deleteTransaction={this.deleteTransaction}
                                getTodaysDateAndList={this.getTodaysDateAndList}

                            />
                            <Col xs lg={4}>
                                <h2 style={{ "fontStyle": "italic", "textDecoration": "underline" }}>Add Transaction</h2>
                                {/* ====================== FORM =========================  */}
                                <AddTransaction
                                    handleSubmit={this.handleSubmit}
                                    titleHasError={this.state.titleHasError}
                                    transactionTitle={this.transactionTitle}
                                    descriptionHasError={this.state.descriptionHasError}
                                    transactionDescription={this.transactionDescription}
                                    amountHasError={this.state.amountHasError}
                                    transactionAmount={this.transactionAmount}
                                    typeHasError={this.state.typeHasError}
                                    transactionType={this.transactionType}
                                    clearInput={this.clearInput}
                                    clearErrors={this.clearErrors} />
                                <br />
                                <Alert show={this.state.successSave} variant="success">
                                    <Alert.Heading>Successfully Saved!</Alert.Heading>
                                </Alert>
                                <Alert show={this.state.failedSave} variant="danger">
                                    <Alert.Heading>Saving Failed!</Alert.Heading>
                                    <p>Make sure you enter all the required information!</p>
                                </Alert>
                            </Col>
                            <Col xs lg={8}>
                                {/* ====================== TABLE =========================  */}
                                <TransactionsTable
                                    transactionList={this.state.transactionList}
                                    handleModalShow={this.handleModalShow}
                                    todaysDate={this.state.todaysDate}
                                    totalAmount={this.state.totalAmount}
                                />
                            </Col>
                        </>
                }
            </>
        );
    }
}
export default Record;