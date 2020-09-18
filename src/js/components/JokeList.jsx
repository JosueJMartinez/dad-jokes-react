import React, { Component } from 'react';
import Axios from 'axios';
import '../../css/JokeList.css';

export default class JokeList extends Component {
	state = {
		jokes: []
	};

	async componentDidMount() {
		this.getJokes();
	}

	getJokes = async () => {
		let res = {};
		let foundJoke = false;

		let jokeFunc = id => {
			return this.state.jokes.some(c => c.id === id);
		};
		try{
			for (let i = 0; i < 10; i++) {
				do {

						res = await Axios.get('https://icanhazdadjoke.com/', {
							headers: { accept: 'application/json' }
						});
						if (res.data === undefined)
							throw new Error('failed retrieving data');
						// jokeFunc
						foundJoke = jokeFunc(res.data.id);



				} while (foundJoke);

				this.setState(prevState => {
					return {
						jokes: [ ...prevState.jokes, { ...res.data, rating: 0 } ]
					};
				});
			}	
		}catch(err){
			console.log('erroro here');
		}
		
	};

	handleClick = e => {
		this.getJokes();
	};

	render() {
		return (
			<div className="JokeList">
				<div className="JokeList-button">
					<button onClick={this.handleClick}>New Jokes</button>
				</div>
				<div className="JokeList-list">
					<ul>
						{this.state.jokes.map(joke => (
							<li key={joke.id} id={joke.id}>
								{' '}
								{joke.joke} {joke.rating}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
