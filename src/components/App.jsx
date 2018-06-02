import React from 'react';

import NavBar from './NavBar';

export default class App extends React.Component {
	constructor(){
		super();

	}

	render() {
		return (
			<div>
			  <NavBar />
			  {this.props.children}
			</div>
		)
	}
}