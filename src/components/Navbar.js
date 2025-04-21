import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';


export default class NavbarComponent extends Component {
    render(){
        return (
            <Navbar expand="lg" bg="black" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">ExerciseTracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/EditExercise">Create Exercise Log</Nav.Link>
                            <Nav.Link as={Link} to="/user">Create User</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
