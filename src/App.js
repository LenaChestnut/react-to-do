import React from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import MenuPanel from "./components/MenuPanel";

class App extends React.Component {
	state = {
		projects: [
			{ title: "Drawing", id: uuidv4() },
			{ title: "Playing", id: uuidv4() },
			{ title: "Coding", id: uuidv4() },
		],
	};

	render() {
		return (
			<div className="App">
				<Navbar />
				<MenuPanel projects={this.state.projects} />
			</div>
		);
	}
}

export default App;
