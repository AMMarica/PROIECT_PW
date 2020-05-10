import React from 'react';
import logo from '../images/luxury-gowns.jpg';
import dress1 from '../images/dress2.jpeg'
import dress2 from '../images/dress1.jpeg'
import dress3 from '../images/dress3.jpeg'

import {Image} from 'react-bootstrap'

const Home = props => {

    return (
        <div className="App">
            <header className="App-header">
                <Image src={logo} alt="logo" roundedCircle width={330} height={220}/>
                <br />
                <p>Welcome to <i>Luxury Gowns</i> dress shop!</p>
                <div>
                    <img src={dress1} className="App-logo" alt="logo" />
                    <img src={dress2} className="App-logo" alt="logo" />
                    <img src={dress3} className="App-logo" alt="logo" />
                </div>
            </header>  
        </div>
    );
};

export default Home;
