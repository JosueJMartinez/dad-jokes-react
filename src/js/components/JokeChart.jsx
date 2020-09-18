import React, { Component } from 'react';
import Axios from 'axios';

export default class JokeChart extends Component {
	state = {
		jokes: []
	};

	async componentDidMount() {
		try {
			let arr = [];
			let res={};
			let foundJoke = false;
			for (let i = 0; i < 10; i++) {
				try{
					do{
						res = await Axios.get('https://icanhazdadjoke.com/', {
							headers: { accept: 'application/json' }
						});
						if(!res===undefined){
							throw 'failed retrieving data'
						}
						foundJoke = arr.includes(c =>(c.id===res.data.id))
					}while(foundJoke)
				}catch(err){
					console.log('error happen getting intial jokes')	
				}
				
				arr.push(res.data);
			}

			this.setState({jokes:arr})
		} catch (err) {
			console.log('Error while initially retrieving jokes');
		}
	}

	render() {
		console.log(this.state)
		return <div>
			{this.state.jokes.map(joke=>(<p key={joke.id} id={joke.id} > {joke.joke} </p>))}
		</div>
			
	}
}
