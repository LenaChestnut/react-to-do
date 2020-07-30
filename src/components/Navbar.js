import React from "react";
import { Menu, Home } from "react-feather";

const Navbar = () => {
	return (
		<nav>
			<ul className="navbar">
				<li>
					<button className="nav-link menu-btn">
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
};

export default Navbar;
