# To-do-list with redux-react
![to-do-list] (src/assets/to-do-list-react-redux.png)

##### Package set up
create-react-app “name of project”
npm install redux react-redux  --save
Check in package j-son
yarn start serve
control alt i open console

#### files set up
*  React-Component to render in main App (lister) several components possible
*  Redux store with reducer and action set up for initial state (index) only one store possible
*  Connect the component to store (connect prop)

## Data-flow in the app:

1. Component (lister) creator-action (payload) written for store reducer
2. Creator-action(payload) is dispatched to the store with the map functions (mapStateToProps and mapDispatchToProps)
3. Store picks up the creator-action - runs the reducer functions (switch function conditions)
4. Update in state is passed via dispatcher-action (new-payload) to component 
7. Component subscribes/ or unsubscribes to dispatcher-action(new-payload) - the onChange, onSubmit, handleClick event listeners
8. Component updates and renders view of the dispatcher-action (payload)

## Refactoring

* Use of constants to manage actions and eliminate spelling mistakes from component (lister) naming convention and store naming in the reducer (index)

* Use of the provider - assign store to multiple components

## Steps to create to-do-list with code 

1. Create react component (lister) and import it into main app - console log render and props as test
```
import React from 'react';

function Lister(props) {
	console.log('render', props);
	return (
		<div>
			<h1>To-do with react-redux</h1>
			<form>
				<input />
				<ul>
					<li>1</li>
					<li>2</li>
				</ul>
			</form>
		</div>
	);
}

export default Lister;
```

2. Create store with reducer (index) import into main app - console log reducer action as test 

```
import { createStore } from 'redux';

const initialState = {
	text: '',
	items: []
};

const reducer = (state = initialState, action) => {
	console.log('reducer', action);
	return state;
};

const store = createStore(reducer);

export default store;
```

3. In main app check console for redux-init
```
import React from 'react';
import './App.css';
import Lister from './lister';
import store from './store/';

function App() {
	return (
		<div className="App">
			<Lister store={store} />
		</div>
	);
}

export default App;
```

4. Connect react and redux with the connect prop imported from react-redux to component(lister)- check updates in console

Remove hard-coded test in state from the index in store
Use the mapStateToStore method in the component (lister)
The connect prop and method have to to be passed into the export default section

```
import React from 'react';
import { connect } from 'react-redux';

function Lister(props) {
	console.log('render', props);
	return (
		<div>
			<h1>To-do with react-redux</h1>
			<form>
				<input />
				<ul>
					<li>1</li>
					<li>2</li>
				</ul>
			</form>
		</div>
	);
}

function mapStateToProps(state) {

	return {
		text: state.text
	};
}

export default connect(mapStateToProps)(Lister);
```

In the store(index) add text to the input field and check if the empty string in the console updates with the data input in state

```
import { createStore } from 'redux';

const initialState = {
	text: 'test',
	items: []
};

const reducer = (state = initialState, action) => {
	console.log('reducer', action);
	return state;
};

const store = createStore(reducer);

export default store;
```

5. From component (lister) Dispatch the creator-action to store - mapDispatchToProps function - check input change in console, add the handleInputChange function for onChange event (listener)

With the onchange updated, test with text updates in the input field to see if state is changing

```
import React from 'react';
import { connect } from 'react-redux';

function Lister(props) {
	console.log('render', props);
	return (
		<div>
			<h1>To-do with react-redux</h1>
			<form>
				<input
					name="list-input-field"
					className="list-input-field"
					type="text"
					value={props.text}
					onChange={props.handleInputChange}
				/>
				<ul>
					<li>1</li>
					<li>2</li>
				</ul>
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	console.log('mapStateToProps', state);
	return {
		text: state.text
	};
}

function mapDispatchToProps(dispatch) {
	return {
		handleInputChange: (event) => {
			console.log('change');
			//event.target.value
			const action = { type: 'CHANGE_INPUT_TEXT', text: event.target.value };
			dispatch(action);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Lister);


````

6. Update store with reducer action with switch condition - test more than one letter fires in input field in console

```
import { createStore } from 'redux';

const initialState = {
	text: '',
	items: []
};

const reducer = (state = initialState, action) => {
	console.log('reducer', action);
	switch (action.type) {
		case 'CHANGE_INPUT_TEXT':
			return Object.assign({}, state, { text: action.text });
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;
```

7. In component (lister) add 2nd creator-action - handleSubmit event (listener)
* add the prevent default to the function
* refactor the form - separate the list-items
* in the mapStateToProps function - map the items and the index key from state (array) to props
* use destructed props, array items, index key and map them into the ul-jsx tag to render the li-jsx items
* use the handleSubmit function in the form onSubmit event handler

```
import React from 'react';
import { connect } from 'react-redux';

function Lister(props) {
	console.log('render', props);
	return (
		<div>
			<h1>To-do with react-redux</h1>
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
					return <li key={index}>{item}</li>;
				})}
			</ul>
		</div>
	);
}

function mapStateToProps(state) {
	console.log('mapStateToProps', state);
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
			const action = { type: 'CHANGE_INPUT_TEXT', text: event.target.value };
			dispatch(action);
		},

		handleSubmit: (event) => {
			console.log('submitting');
			event.preventDefault();
			const action = { type: 'ADD_LIST_ITEM' };
			dispatch(action);
		}
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Lister);
```

8. In store update the dispatcher-action in the switch statement - add an empty string to replace the array items in the text input so that it clears down when the handleSubmit function fires, this will clear the input field for the next input in the array

```
import { createStore } from 'redux';

const initialState = {
	text: '',
	items: []
};

const reducer = (state = initialState, action) => {
	console.log('reducer', action);
	switch (action.type) {
		case 'CHANGE_INPUT_TEXT':
			return Object.assign({}, state, { text: action.text });
		case 'ADD_LIST_ITEM':
			return Object.assign({}, state, {
				items: state.items.concat(state.text),
				text: ''
			});
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;
```

9. Refactoring - create constants file in store - it is an object with a list of constants import it into the store (index) and into the component (lister) 

```
export default {
	CHANGE_INPUT_TEXT: 'CHANGE_INPUT_TEXT',
	ADD_LIST_ITEM: 'ADD_LIST_ITEM',
	DELETE_LIST_ITEM: 'DELETE_LIST_ITEM'
};
```

10. Delete items with the handleClick function

* set up component creator-action and dispatch to store
* set up event handler and test working
* pass the index of the item you want deleted into the handleClick event and into the params of the handleDelete function 

```
			<ul>
				{props.items.map((item, index) => {
					return (
						<li key={index} onClick={() => props.handleDelete(index)}>
							{item}
						</li>
					);
				})}
			</ul>
```

```
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
```
* update store dispatcher-action in switch function

```
const reducer = (state = initialState, action) => {
	console.log('reducer', action);
	switch (action.type) {
		case constants.CHANGE_INPUT_TEXT:
			return Object.assign({}, state, { text: action.text });
		case constants.ADD_LIST_ITEM:
			return Object.assign({}, state, {
				items: state.items.concat(state.text),
				text: ''
			});
		case constants.DELETE_LIST_ITEM:
			// console.log('delete reducer working');
			const copyOfItems = state.items.slice();
			copyOfItems.splice(action.index, 1);
			return Object.assign({}, state, { items: copyOfItems });
		default:
			return state;
	}
};
```
11. Provider - assign store once to multiple components

* new functional component - header
* connect to store
* create mapStateToProps function
* export the function and the component to store
* import header into lister component
* pass store as a prop into the header component
* change console logs to separate logs from lister and footer and check console

```
import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
	console.log('render header component', props);
	return <header>Total Count: {props.count}</header>;
}
function mapStateToProps(state) {
	console.log('mapStateToProps from header', state);
	return {
		count: state.items.length
	};
}

export default connect(mapStateToProps)(Header);
```

*  go to main app and import Provider (it is a component) from react-redux library
*  pass store into into the provider component add a div jsx tag for multiple components and jsx tags
*  You now can remove the header component from the lister component and add to main app with a p-jsx-tag


```
import React from 'react';
import './App.css';
import Lister from './lister';
import Header from './header';
import store from './store/';
import { Provider } from 'react-redux';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<div>
					<Header />
					<p>Add list items in the text box and hit enter. Delete them by clicking the item.</p>
					<Lister />
				</div>
			</Provider>
		</div>
	);
}

export default App;
```
