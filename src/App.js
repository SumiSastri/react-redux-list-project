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
				<div className="list-container">
					<Header />
					<p className="list-instructions">
						Add list items in the text box and hit enter. Delete them by clicking the item.
					</p>
					<Lister />
				</div>
			</Provider>
		</div>
	);
}

export default App;
