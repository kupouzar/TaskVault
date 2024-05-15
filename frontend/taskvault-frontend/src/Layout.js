import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

const Layout = (props) => {
    return (
        <>
        <div className="header">
            <NavBar setShowCreatePopup={props.setShowCreatePopup}/>
        </div>
        <div style={bodyStyle()}>
            {props.children}
        </div>
        <div className="appFooter" style={footerStyle()}>
            TaskVault - © Jakub Pouzar
        </div>
        </>
    );
}

function bodyStyle() {
    return {
        overflow: "auto",
        padding: "16px",
        flex: "1",
        borderTop: "white 4px solid",
        borderBottom: "white 4px solid",
      };
}

function footerStyle() {
    return {
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#ffffff",
        color: "#808080"
      };
}

export default Layout;