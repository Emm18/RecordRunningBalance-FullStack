import React, { Component } from 'react';
import { Button, Container, Table, Col, Row } from 'react-bootstrap'


import ReactToPrint from 'react-to-print';

const formattedAmount = (val) => {
    if (parseInt(val)) {
        return (val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else {
        return "0.00";
    }
}

class TransactionList extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.selectedDate ?
                    this.props.transactionList.length > 0 ?


                        <Container>
                            <Row>
                                <ReactToPrint
                                    trigger={() => <Button variant="link" size='sm'><p id="printBtn">PRINT</p></Button>}
                                    content={() => this}
                                    pageStyle={`
                                            @page { 
                                                size: auto; 
                                                margin: 10mm;
                                                }
                                            @media print {
                                                body { 
                                                -webkit-print-color-adjust: exact;
                                                padding: 40px !important;
                                                }
                                                h2 {
                                                    text-align : center;
                                                }
                                                #printBtn {
                                                    display : none;
                                                }
                                            }`}
                                />
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col>
                                    <h2 style={{ "fontStyle": "italic", "textDecoration": "underline" }}>ENTER COMPANY NAME HERE</h2>
                                </Col>

                            </Row>
                            <Row>
                                <h3> Transactions on {new Date(this.props.selectedDate).toLocaleDateString()}</h3>
                            </Row>
                            <Row className="justify-content-md-center">



                                <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>Transaction No.</th>
                                            <th>Date</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.transactionList.map((list, index) => (
                                            <tr key={index}>
                                                <td>{list.id}</td>
                                                <td>{list.date}</td>
                                                <td>{list.title}</td>
                                                <td>{list.description}</td>
                                                <td>{list.type}</td>
                                                <td>{formattedAmount(list.amount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Row>

                            <Row>
                                <Col>
                                    <h3>Transaction Count : {this.props.transactionList.length} </h3>
                                </Col>
                                <Col>
                                    <h3 style={{ "textAlign": "right" }}>Total Amount : $ {formattedAmount(this.props.totalAmount)}</h3>
                                </Col>

                            </Row>

                        </Container>

                        : <h2 style={{ "fontStyle": "italic" }}>0 transaction on this date</h2>

                    : <h2 style={{ "fontStyle": "italic" }}>No date selected</h2>
                }
            </>
        )
    }
}

export default TransactionList;
