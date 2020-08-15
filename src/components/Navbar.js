import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Home } from 'react-feather';

function Navbar(props) {
	const handleClick = () => {
		props.setCurrentProject('default', 'All tasks');
	};

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
					<button className="nav-link home-btn" onClick={handleClick}>
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
	currentProject: PropTypes.object,
	setCurrentProject: PropTypes.func,
};

export default Navbar;
