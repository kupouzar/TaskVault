import { useNavigate, navigate } from "react-router-dom";
import { useState, useContext } from "react";

// Navbar imports
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Button from "react-bootstrap/esm/Button";

// react-icons
import {PiNotebook} from "react-icons/pi";
import { NavBarContext } from "./NavbarContext";

function NavBar() {
    // hooks
    const {showJournalList, setShowJournalList, showCreatePopup, setShowCreatePopup} = useContext(NavBarContext);

    const navigate = useNavigate();
    return (
        <Navbar expand="lg" style={barStyle()}>
      <Container>
        <Navbar.Brand className="ml-auto">
        <Button style={brandStyle()} onClick={() => navigate("/")}>
            <PiNotebook />
            TaskVault
        </Button>
        </Navbar.Brand>
        <Nav className="ms-auto">
            <Button style={buttonStyle()} onClick={() => {
                setShowCreatePopup('createJournal');
            }}>
                +
            </Button>
        </Nav>
      </Container>
    </Navbar>
    );
}

const hueColor = '#0080B3';

function barStyle() {
    return {
        groundColor: '#f8f9fa',
        borderBottom: '1px solid #ced4da',
        color: hueColor,
        textDecoration: 'none'
    };
}

function brandStyle() {
    return {
        backgroundColor: '#FFFFFF',
        color: hueColor,
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold'
    };
}

function buttonStyle() {
    return {
        backgroundColor: hueColor,
        color: '#FFFFFF',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold'
    };
}

export default NavBar;
