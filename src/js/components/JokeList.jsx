import React, { Component } from 'react';
import Axios from 'axios';
import '../../css/JokeList.css';

export default class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};

	state = {
		jokes: [],
		isLoading: true
	};

	async componentDidMount() {
		this.getJokes();
	}

	getJokes = async () => {
		let res = {};
		let foundJoke = false;
		const jokes = [];

		let jokeFunc = id => {
			return (
				this.state.jokes.some(c => c.id === id) ||
				jokes.some(c => c.id === id)
			);
		};
		this.setState({ isLoading: true });
		try {
			while (jokes.length < this.props.numJokesToGet) {
				res = await Axios.get('https://icanhazdadjoke.com/', {
					headers: { accept: 'application/json' }
				});

				if (res.data === undefined)
					throw new Error('failed retrieving data');

				foundJoke = jokeFunc(res.data.id);
				if (!foundJoke) {
					jokes.push({ ...res.data, rating: 0 });
				}
			}
		} catch (err) {
			console.log('erroro here');
		}
		this.setState(prevState => {
			return {
				jokes: [ ...prevState.jokes, ...jokes ],
				isLoading: false
			};
		});
		// this.setState({ isLoading: false });
	};

	handleClick = e => {
		this.getJokes();
	};

	render() {
		return (
			<div className="JokeList">
				<div className="JokeList-box">
					<div className="JokeList-button">
						<button onClick={this.handleClick}>New Jokes</button>
					</div>
					<div className="JokeList-list">
						<h1>Dad Jokes</h1>
						{this.state.isLoading ? (
							'loading'
						) : (
							<ul>
								{this.state.jokes.map(joke => (
									<li key={joke.id} id={joke.id}>
										{' '}
										{joke.joke} {joke.rating}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		);
	}
}
