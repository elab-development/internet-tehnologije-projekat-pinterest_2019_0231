import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigacija = () => {
    return (
        <>
            <Navbar bg="dark" sticky={"top"} data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Pinterest</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About us</Nav.Link>
                        <Nav.Link href="/my-boards">My Boards</Nav.Link>
                        <Nav.Link href="/account">My Account</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigacija;