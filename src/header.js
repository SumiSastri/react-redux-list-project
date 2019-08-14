import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
	// console.log('render header component', props);
	return (
		<div>
			<h1>To-do-List</h1>
			<h1>Made with Redux & React</h1>
			<br />
			<header className="list-counter">Total Count: {props.count}</header>
		</div>
	);
}
function mapStateToProps(state) {
	console.log('mapStateToProps from header', state);
	return {
		count: state.items.length
	};
}

export default connect(mapStateToProps)(Header);
