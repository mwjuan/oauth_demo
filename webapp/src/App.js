import React from 'react';
import './App.css';
const clientID = 'e9cea89333635770458e';

function App() {
	let path = window.location.search.split('?name=');
	return (
		<div className="App">
			{
				!path[1] &&
				<a href={`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=http://localhost:9000/oauth/callback`}>Login with GitHub</a>
			}
			{
				path[1] &&
				<h1>Welcome,{path[1]}</h1>
			}
		</div>
	);
}

export default App;
