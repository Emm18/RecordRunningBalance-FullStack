import React, { Component } from 'react';

import { Form, Button, Alert, ButtonGroup, Modal } from 'react-bootstrap'

class EditModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titleHasError: '',
            descriptionHasError: '',
            amountHasError: '',
            typeHasError: '',
            showDelete: false,
            showSuccessNotification: false,
            showFailedNotification: false,
            showDeleteNotification: false
        };
    }

    clearErrors = () => {
        this.setState(() => {
            return {
                titleHasError: '',
                descriptionHasError: '',
                amountHasError: '',
                typeHasError: '',
                showDelete: false,
                showSuccessNotification: false,
                showFailedNotification: false
            }
        })
    }

    validate = () => {
        let hasAnyError = false;

        if (this.props.modalTitle === '') {
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

        if (this.props.modalDescription === '') {
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

        if (this.props.modalAmount === '' || isNaN(this.props.modalAmount)) {
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

        if (this.props.modalType === '') {
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

    handleSubmit = (e) => {
        e.preventDefault();
        let hasError = this.validate();

        if (hasError) {
            console.log("not ready")
            this.setState(() => {
                return {
                    showFailedNotification: true
                }
            });
        } else {
            console.log("update")
            this.props.updateTransaction(this.props.getTodaysDateAndList);
            this.clearErrors();
            this.props.handleModalClose();

            this.setState(() => {
                return {
                    showSuccessNotification: true
                }
            });

            setTimeout(() => {
                this.setState(() => {
                    return {
                        showSuccessNotification: false
                    }
                })
            }, 1000);
        }
    }

    handleDelete = () => {
        console.log("handleDelete")
        this.props.deleteTransaction(this.props.getTodaysDateAndList);
        this.clearErrors();
        this.props.handleModalClose();

        this.setState(() => {
            return {
                showDeleteNotification: true
            }
        });

        setTimeout(() => {
            this.setState(() => {
                return {
                    showDeleteNotification: false
                }
            })
        }, 1000);
    }

    showSuccessNotification = () => {
        this.setState(() => {
            return {
                showSuccessNotification: true
            }
        });
    }

    hideSuccessNotification = () => {
        this.setState(() => {
            return {
                showSuccessNotification: false
            }
        });
    }


    handleCancel = () => {
        this.clearErrors();
        this.props.handleModalClose();
    }


    handleModalTitleChange = (e) => {
        let val = e.target.value;
        this.props.handleModalTitleChange(val);
    }

    handleModalDescriptionChange = (e) => {
        let val = e.target.value;
        this.props.handleModalDescriptionChange(val);
    }

    handleModalTypeChange = (e) => {
        let val = e.target.value;
        this.props.handleModalTypeChange(val);
    }

    handleModalAmountChange = (e) => {
        let val = e.target.value;
        this.props.handleModalAmountChange(val);
    }

    handleShowDelete = () => {
        this.setState(() => {
            return {
                showDelete: true
            }
        })
    }

    handleCancelDelete = () => {
        this.setState(() => {
            return {
                showDelete: false
            }
        })
    }

    render() {
        return (
            <>
                {/* NOTIFICATION */}
                <Modal show={this.state.showSuccessNotification} onHide={() => { }}>
                    <Modal.Body>
                        <Alert show={true} variant="success">
                            <Alert.Heading>Successfully Updated!</Alert.Heading>
                        </Alert>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showDeleteNotification} onHide={() => { }}>
                    <Modal.Body>
                        <Alert show={true} variant="danger">
                            <Alert.Heading>Successfully Deleted!</Alert.Heading>
                        </Alert>
                    </Modal.Body>
                </Modal>

                {/* CONFIRM DELETE */}
                <Modal show={this.state.showDelete} onHide={() => { }}>
                    <Modal.Body>
                        <Alert show={true} variant="danger">
                            <Alert.Heading>Delete this transaction permanently?</Alert.Heading>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button variant="danger" onClick={() => { this.handleDelete() }}>
                                    Delete
                            </Button>
                                <Button variant="dark" onClick={this.handleCancelDelete}>
                                    Cancel
                            </Button>
                            </div>
                        </Alert>
                    </Modal.Body>
                </Modal>

                {/* =============MODAL FOR EDIT/UPDATE===================== */}
                <Modal show={this.props.modalState} onHide={this.handleCancel}>

                    <Alert show={this.state.showFailedNotification} variant="danger">
                        <Alert.Heading>Update failed! Make sure you entered all the information needed!</Alert.Heading>
                    </Alert>

                    <Modal.Header closeButton>
                        <Modal.Title>Edit transaction</Modal.Title>
                        {!this.state.showDelete ?
                            <ButtonGroup className="mr-2">
                                <Button variant="danger" size="sm" onClick={this.handleShowDelete}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                            : null}
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formTransactionNumber">
                                <Form.Label>Transaction Number : {this.props.modalId} </Form.Label>
                            </Form.Group>
                            
                            <Form.Group controlId="formTransactionDate">
                                <Form.Label>Transaction Date : {this.props.modalDate} </Form.Label>
                            </Form.Group>

                            <Form.Group controlId="formTransactionTitle">
                                <Form.Label>Transaction Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    isInvalid={this.state.titleHasError}
                                    isValid={this.state.titleHasError === '' ? false : !this.state.titleHasError}
                                    value={this.props.modalTitle}
                                    onChange={this.handleModalTitleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter transaction title.
                                 </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formTransactionDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="2"
                                    placeholder="Enter Description"
                                    isInvalid={this.state.descriptionHasError}
                                    isValid={this.state.descriptionHasError === '' ? false : !this.state.descriptionHasError}
                                    value={this.props.modalDescription}
                                    onChange={this.handleModalDescriptionChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter description.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formTransactionType">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    isInvalid={this.state.typeHasError}
                                    isValid={this.state.typeHasError === '' ? false : !this.state.typeHasError}
                                    value={this.props.modalType}
                                    onChange={this.handleModalTypeChange}>
                                    <option key={'empty'} value={''}>---Select---</option>
                                    <option key={'1'} value={'add'}>Add</option>
                                    <option key={'2'} value={'deduct'}>Deduct</option>

                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select transaction type.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formTransactionAmount">
                                <Form.Label>Amount ($)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Amount"
                                    isInvalid={this.state.amountHasError}
                                    isValid={this.state.amountHasError === '' ? false : !this.state.amountHasError}
                                    value={this.props.modalAmount}
                                    onChange={this.handleModalAmountChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter amount and it should be number only.
                                </Form.Control.Feedback>
                            </Form.Group>



                            <ButtonGroup className="mr-2">
                                <Button variant="dark" type="submit">
                                    Update
                                </Button>
                            </ButtonGroup>

                            <ButtonGroup className="mr-2">
                                <Button variant="dark" onClick={this.handleCancel}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}



export default EditModal;