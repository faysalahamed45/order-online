import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userCreate } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'

const Header = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(userCreate);
    return (
        <div className="header">

            <nav className="navbar-container">
                <div className="header">
                    <img src={logo} alt="" />
                </div>
                <div>
                    <Link to="/shop">Shop</Link>
                    <Link to="/order">Order Review</Link>
                    <Link to="/manage">Manage Inventory</Link>
                    {props.success ? <h4 className="user-name" style={{ display: "inline-block" }}>{props.userName}</h4> : <Link className="active" to="/login">Login</Link>}

                    {
                        props.success && 
                            <button onClick={() => setLoggedInUser({})}><i className="fas fa-sign-out-alt "></i></button>
                    }
                    
                </div>
                
            </nav>
            {/* <p className="hide">sign-out</p> */}
        </div>
    );
};

export default Header;