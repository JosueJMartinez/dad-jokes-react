import React, { Component } from 'react';
import Axios from 'axios';

export default class JokeChart extends Component {
	state = {
		jokes: []
	};

	async componentDidMount() {
		try {
			let arr = [];
			let res;
			for (let i = 0; i < 10; i++) {
				res = await Axios.get('https://icanhazdadjoke.com/', {
					headers: { accept: 'application/json' }
				});
				arr.push(res.data);
			}

			console.log(arr);
		} catch (err) {
			console.log('Error while initially retrieving jokes');
		}
	}

	render() {
		return <div />;
	}
}
