import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

import logo from '../images/logo.jpg'
import home from '../images/home.png';
import register from '../images/register.png'
import login from '../images/login.png'
import dresses from '../images/dresses.png'
import question from '../images/question.png'
import faq from '../images/faq.png'
import contact from '../images/contact.png'
import basket from '../images/basket.png'

import { Image } from 'react-bootstrap'

const Navbar = () => (
    <nav className="navbar">
        <Image src={logo} alt="logo" roundedCircle width={50} height={50} />
        <NavLink
            exact
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/"
        >
            <img src={home} className="logo" alt="logo" />
            Home
    </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/register"
        >
            <img src={register} className="logo" alt="logo" />
            Register
    </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/login"
        >
            <img src={login} className="logo" alt="logo" />
            Login
    </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/dresses"
        >
            <img src={dresses} className="logo" alt="logo" />
            Dresses
    </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/questions"
        >
            <img src={question} className="logo" alt="logo" />
            Questions
    </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/faq"
        >
            <img src={faq} className="logo" alt="logo" />
            FAQ
    </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/contact"
        >
            <img src={contact} className="logo" alt="logo" />
            Contact
    </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/basket"
        >
            <img src={basket} className="logo" alt="logo" />
            Basket
    </NavLink>
    </nav>
);

export default Navbar;