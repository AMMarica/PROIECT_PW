import React from 'react';
import './App.css';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './components/home'
import Register from './components/register'
import Login from './components/login'
import Navbar from './components/Navbar'
import Dresses from './components/dresses';
import Questions from './components/questions'
import FAQ from './components/faq';
import Contact from './components/contact';
import Basket from './components/basket'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/dresses" component={Dresses} />
				<Route path="/questions" component={Questions} />
				<Route path="/faq" component={FAQ} />
				<Route path="/contact" component={Contact} />
				<Route path="/basket" component={Basket} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
