import React from 'react';
import './../../css/';
import {Link} from 'react-router-dom';

const Footer = () =>{
    return(
        <div className='header'>
         <h1>Potluck ChowDown</h1>
         <nav className='nav-bar'>
            <Link to='#'>Link1</Link>
            <Link to='#'>Link2</Link>
            <Link to='#'>Link3</Link>
            <Link to='#'>Link4</Link>
         </nav>
     </div>   
    )
}
export default Footer;