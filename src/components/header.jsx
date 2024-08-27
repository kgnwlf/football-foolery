import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Header () {

	return (

		<header>

			<h1 className="logo">Football Foolery</h1>

			<nav>
				<ul>
					<li><a href="#">Home</a></li>
					<li><a href="#">Football Foresight</a></li>
					<li><a href="#">Ceiling & Floor</a></li>
					<li><a href="#">Scratch Pad</a></li>
				</ul>

			<span className="control-icons">
				<DarkModeIcon />
			</span>

			</nav>

		</header>

	);

}
