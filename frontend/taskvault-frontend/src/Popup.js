import { React, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Button from "react-bootstrap/esm/Button";

export default function CreationPopup(props, {setShowCreatePopup}) {
    if(props.type === 'createJournal') {
        return(
            <div>
                <h1>Create a journal</h1>
                <input type="text">Enter journal name: </input>
                <Button onClick={() => {}}>
                
                </Button>
            </div>
        );
    } else {
        <h1>Error: no type specified.</h1>
    }
};