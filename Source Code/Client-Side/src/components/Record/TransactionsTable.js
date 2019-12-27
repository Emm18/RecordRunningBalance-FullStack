import React, { Component } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap'


import ReactToPrint from 'react-to-print';

const formattedAmount = (val) => {
    if (parseInt(val)) {
        return (val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else {
        return "0.00";
    }
}


class TransactionTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (

            <Container>
                <Row>
                    <Col xs={10} lg={10}>
                        <h2 style={{ "fontStyle": "italic", "textDecoration": "underline" }}>ENTER COMPANY NAME HERE</h2>
                        <br />
                        <h3>Transactions as of {this.props.todaysDate}</h3>
                    </Col>
                    <Col xs={2} lg={2}>
                        <div style={{ "textAlign": "right", "fontWeight": "bold" }}>
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

                        </div>
                    </Col>
                </Row>

                {this.props.transactionList.length > 0 ?
                    <Row>

                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Transaction No.</th>
                                    <th>Date</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Amount ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.transactionList.map((list, index) => (
                                    <tr key={index} onClick={this.props.handleModalShow}>
                                        <td>{list.id}</td>
                                        <td>{list.date}</td>
                                        <td >{list.title}</td>
                                        <td style={{ "wordBreak": "break-all" }}>{list.description}</td>
                                        <td>{list.type}</td>
                                        <td>{formattedAmount(list.amount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Row>
                    : <h4>0 transaction</h4>}
                <Row>
                    <Col>
                        {this.props.transactionList.length !== 0 ? <h3>Transaction Count : {this.props.transactionList.length}</h3>
                            : null}
                    </Col>
                    <Col>
                        {this.props.transactionList.length !== 0 ? <h3 style={{ "textAlign": "right" }}>Total Amount : $ {formattedAmount(this.props.totalAmount)}</h3>
                            : null}
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default TransactionTable;



