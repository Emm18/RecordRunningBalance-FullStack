import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'

const Header = (props) => (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg">
            {/* <Navbar.Brand>Transaction Records</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link active={props.recordComponent} href="#/record">Transaction</Nav.Link>
                    <Nav.Link active={props.viewPrintComponent} href="#/viewprint">View</Nav.Link>
                </Nav>
                {/* <Form inline>
                    <Button variant="secondary">Log Out</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    </header>
);

export default Header;