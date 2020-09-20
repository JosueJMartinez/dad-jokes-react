import React, { Component } from 'react';
import Axios from 'axios';
import '../../css/JokeList.css';
import Joke from './Joke';

export default class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};

	state = {
		jokes: [],
		isLoading: true
	};

	componentDidMount() {
		const jokes = JSON.parse(localStorage.getItem('DadJokes'));
		jokes
			? this.setState({ jokes: jokes, isLoading: false })
			: this.getJokes();
	}

	componentDidUpdate(prevProps, prevState) {
		localStorage.setItem('DadJokes', JSON.stringify(this.state.jokes));
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

	editRating = j => {
		this.setState({
			jokes: this.state.jokes.map(joke => {
				if (j.id === joke.id) return j;
				return joke;
			})
		});
	};

	render() {
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						Dad <span>Jokes</span>
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="laughing face"
					/>
					<button onClick={this.handleClick}>New Jokes</button>
				</div>
				<div className="JokeList-jokes">
					{this.state.isLoading ? (
						'loading'
					) : (
						this.state.jokes
							.sort((joke1, joke2) => {
								if (joke1.rating > joke2.rating) return -1;
								return 1;
							})
							.map(joke => (
								<Joke
									key={joke.id}
									joke={joke}
									editRating={this.editRating}
								/>
							))
					)}
				</div>
			</div>
		);
	}
}
