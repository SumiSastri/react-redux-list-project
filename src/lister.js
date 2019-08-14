import React from 'react';
import { connect } from 'react-redux';
import constants from './store/constants';

function Lister(props) {
	// console.log('render lister component', props);
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<input
					name="list-input-field"
					className="list-input-field"
					type="text"
					value={props.text}
					onChange={props.handleInputChange}
				/>
			</form>

			<ul>
				{props.items.map((item, index) => {
					return (
						<li className="items-on-list" key={index} onClick={() => props.handleDelete(index)}>
							{item}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function mapStateToProps(state) {
	console.log('mapStateToProps from lister', state);
	return {
		text: state.text,
		items: state.items
	};
}

function mapDispatchToProps(dispatch) {
	return {
		handleInputChange: (event) => {
			console.log('change');
			//event.target.value
			const action = { type: constants.CHANGE_INPUT_TEXT, text: event.target.value };
			dispatch(action);
		},

		handleSubmit: (event) => {
			console.log('submitting');
			event.preventDefault();
			const action = { type: constants.ADD_LIST_ITEM };
			dispatch(action);
		},
		handleDelete: (index) => {
			console.log('delete working');
			const action = { type: constants.DELETE_LIST_ITEM, index: index };
			dispatch(action);
		}
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Lister);
