import React from 'react';
import { Form, Button, ButtonGroup } from 'react-bootstrap'

const AddTransaction = (props) => {
    return (
        <Form noValidate onSubmit={props.handleSubmit}>
            <Form.Group controlId="formTransactionTitle">
                <Form.Label>Transaction Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    isInvalid={props.titleHasError}
                    isValid={props.titleHasError === '' ? false : !props.titleHasError}
                    ref={props.transactionTitle}
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
                    isInvalid={props.descriptionHasError}
                    isValid={props.descriptionHasError === '' ? false : !props.descriptionHasError}
                    ref={props.transactionDescription}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter description.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formTransactionType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                    as="select"
                    isInvalid={props.typeHasError}
                    isValid={props.typeHasError === '' ? false : !props.typeHasError}
                    ref={props.transactionType}>
                    <option key={'empty'} value={''}>---Select---</option>
                    <option key={'1'} value={'add'}>Add</option>
                    <option key={'2'} value={'deduct'}>Deduct</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Please select transaction type.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formTransactionAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Amount"
                    isInvalid={props.amountHasError}
                    isValid={props.amountHasError === '' ? false : !props.amountHasError}
                    ref={props.transactionAmount}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter amount and it should be number only.
                </Form.Control.Feedback>
            </Form.Group>




            <ButtonGroup className="mr-2">
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </ButtonGroup>

            <ButtonGroup className="mr-2">
                <Button variant="dark" onClick={() => { props.clearInput(); props.clearErrors() }}>
                    Reset
                </Button>
            </ButtonGroup>

        </Form>
    );
}

export default AddTransaction;