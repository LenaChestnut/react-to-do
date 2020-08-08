import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Home } from 'react-feather';

function Navbar(props) {
	return (
		<nav>
			<ul className="navbar">
				<li>
					<button
						className="nav-link menu-btn"
						onClick={props.toggleMenu}
					>
						<Menu className="feather-icon" />
					</button>
				</li>
				<li>
					<button className="nav-link home-btn">
						<Home className="feather-icon" />
					</button>
				</li>
			</ul>
			<h1>To-do</h1>
		</nav>
	);
}

Navbar.propTypes = {
	toggleMenu: PropTypes.func,
};

export default Navbar;
