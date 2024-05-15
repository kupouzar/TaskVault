import { useContext, useState } from "react";
import { ElementListContext } from "./ElementListContext.js";
import { Link, useNavigate, useParams } from 'react-router-dom';
import ElementListProvider from "./ElementListProvider.js";
import Container from 'react-bootstrap/Container';
import { NavBarContext } from "./NavbarContext.js";
import {PiArrowLeftBold} from "react-icons/pi";
import Button from "react-bootstrap/esm/Button";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function ElementList() {
    const elementList = useContext(ElementListContext);
    const handlerMap = useContext(ElementListContext);
    let elementLinks = [];
    const navigate = useNavigate();

    // params

    const pid = useParams();
    const eid = useParams();

    // hooks
    const [showElementUi, setShowElementUi] = useState(false);
    const [clickedItem, setClickedItem] = useState(null);
    const {showElementList, setShowElementList} = useContext(NavBarContext);

    const handleClick = (id) => {
        navigate(`./element/${id}`);
        setClickedItem(id);
        setShowElementUi(true);
    };

    for(let i = 0; i < elementList.elementList.length; i++) {
        let currentElement = elementList.elementList[i];
        elementLinks.push(
            <li style={liStyle()} key={currentElement.id} onClick={() => {handleClick(currentElement.id)}}>{currentElement.name}</li>
        );
    }

    function liStyle() {
        return {
            cursor: 'pointer',
            color: '#0080B3'
        }
    }

    function buttonStyle() {
        return {
            backgroundColor: '#0080B3',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
        };
    }

return (
    <Container>
        {!showElementUi &&
        <div>
        <Button style={buttonStyle()} onClick={() => navigate('/journal')}>
        <PiArrowLeftBold />
        </Button>
        <h1>Elements</h1>
        {elementLinks}
        </div>
        }
        {showElementUi &&
        <div>
        <Button style={buttonStyle()} onClick={() => navigate('..')}>
        <PiArrowLeftBold />
        </Button>
        <h1>Content of {pid}</h1>
        </div>
        }
        
    </Container>
);
}

export default ElementList;
