import React, { Component } from 'react';
import '../../css/Joke.css';

export default class Joke extends Component {
	handleClick = e => {
		this.setRating(e.target.className);
	};

	setRating = direction => {
		let rating = this.props.joke.rating;
		if (direction === 'fas fa-arrow-up')
			this.props.editRating({
				...this.props.joke,
				rating: ++rating
			});
		else
			this.props.editRating({
				...this.props.joke,
				rating: --rating
			});
	};

	handleMood = () => {
		const { rating } = this.props.joke;
		if (rating < -8) return 'very angry';
		if (rating >= -8 && rating <= -6) return 'angry';
		if (rating >= -5 && rating <= -3) return 'displeased';
		if (rating >= -2 && rating <= -1) return 'not funny';
		if (rating === 0) return 'unemote';
		if (rating >= 1 && rating <= 2) return 'kinda funny';
		if (rating >= 3 && rating <= 5) return 'a lil funny';
		if (rating >= 6 && rating <= 8) return 'funny';
		if (rating > 8) return 'hilarious';
	};

	render() {
		const { id, joke, rating } = this.props.joke;
		return (
			<div className="Joke" id={id}>
				<div className="Joke-buttons">
					<i onClick={this.handleClick} className="fas fa-arrow-up" />
					<span>{rating}</span>
					<i onClick={this.handleClick} className="fas fa-arrow-down" />
				</div>

				<span className="Joke-content">{joke}</span>
				<span className="Joke-mood">{this.handleMood()}</span>
			</div>
		);
	}
}
