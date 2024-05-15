import { useContext, useState } from "react";
import { JournalListContext } from "./JournalListContext.js";
import { Link, useNavigate } from 'react-router-dom';
import JournalListProvider from "./JournalListProvider.js";
import Container from 'react-bootstrap/Container';
import { NavBarContext } from "./NavbarContext.js";
import {PiArrowLeftBold} from "react-icons/pi";
import Button from "react-bootstrap/esm/Button";


function JournalList({setShowCreatePopup}) {
    const journalList = useContext(JournalListContext);
    const navigate = useNavigate();
    let journalLinks = [];

    // hooks
    const [showBackButton, setShowBackButton] = useState(false);
    const [clickedItem, setClickedItem] = useState(null);

    const handleClickJournal = (id) => {
        setClickedItem(id);
        setShowBackButton(true);
        navigate(`/journal/${id}`);
    };

    for(let i = 0; i < journalList.journalList.length; i++) {
        let currentJournal = journalList.journalList[i];
        journalLinks.push(
            <li style={liStyle()} key={currentJournal.id} onClick={() => {handleClickJournal(currentJournal.id)}}>{currentJournal.name}</li>
        );
    }

    function liStyle() {
        return {
            cursor: 'pointer',
            color: '#0080B3'
        }
    }

    function performBackAction() {
        if(clickedItem) {
            setClickedItem(null);
            setShowBackButton(false);
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
        <div>
        <Button style={buttonStyle()} onClick={() => navigate('/journal')}>
        +
        </Button>
        <h1>Journals</h1>
        <ul>{journalLinks}</ul>
        </div>
    </Container>
);
}

export default JournalList;
