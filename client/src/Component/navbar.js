import './navbar.css';
import { Link } from 'react-router-dom';
// import logo from '../Images/logo.png';

export default function Navbar(){
    return(
        <div className='navbar-component'>
            <div className='nav-logo'>
                <h1>DYP</h1>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/secondpg">Upload</Link></li>
                <li>Blog</li>
                <li>Contact Us</li>
               
            </ul>
        </div>
    );
}
