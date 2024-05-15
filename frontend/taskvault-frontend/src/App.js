import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './Layout';

import JournalListProvider from './JournalListProvider';
import JournalList from './JournalList';
import ElementListProvider from "./ElementListProvider";
import ElementList from "./ElementList";
import { NavBarContext } from "./NavbarContext";
import CreationPopup from "./Popup";

function App() {
  const [showCreatePopup, setShowCreatePopup] = useState(null);
    return (
      <JournalListProvider>
        
          <NavBarContext.Provider value={{
                    showCreatePopup,
                    setShowCreatePopup
                    }}>
            <Router>
              <Routes>
                <Route path="/" element={
                  <Navigate to="/journal" />
                }/>
                <Route path="/journal" element={<Layout><JournalList /></Layout>}>
                </Route>
                <Route path="/journal/:id" element={<Layout><ElementListProvider><ElementList /></ElementListProvider></Layout>}>
                </Route>
                <Route path="/journal/:pid/element/:eid" element={<Layout><ElementListProvider><ElementList /></ElementListProvider></Layout>}>
                </Route>
              </Routes>
            </Router>
            </NavBarContext.Provider>
      </JournalListProvider>
    );
}

function appStyle() {

}

export default App;
