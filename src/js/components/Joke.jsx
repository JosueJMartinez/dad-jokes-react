import React, { Component } from 'react';
import '../../css/Joke.css';

export default class Joke extends Component {
	constructor(props) {
		super(props);
	}

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
		if (rating < -10) return { color: '#ff0000', emoji: 'em em-triumph' };
		if (rating >= -10 && rating <= -8)
			return { color: '#f44336', emoji: 'em em-angry' };
		if (rating >= -7 && rating <= -5)
			return { color: '#ff9800', emoji: 'em em-unamused' };
		if (rating >= -4 && rating <= -2)
			return { color: '#ffc107', emoji: 'em em-confused' };
		if (rating >= -1 && rating <= 1)
			return { color: '#ffeb3b', emoji: 'em em-neutral_face' };
		if (rating >= 2 && rating <= 4)
			return { color: 'cddc39', emoji: 'em em-slightly_smiling_face' };
		if (rating >= 5 && rating <= 7)
			return { color: '#8bc34a', emoji: 'em em-smiley' };
		if (rating >= 8 && rating <= 10)
			return { color: '#4caf50', emoji: 'em em-laughing' };
		if (rating > 10)
			return {
				color: '#00ff00',
				emoji: 'em em-rolling_on_the_floor_laughing'
			};
	};

	render() {
		const { id, joke, rating } = this.props.joke;
		const emotion = this.handleMood();
		return (
			<div className="Joke" id={id}>
				<div className="Joke-buttons">
					<i onClick={this.handleClick} className="fas fa-arrow-up" />
					<span style={{ borderColor: emotion.color }}>{rating}</span>
					<i onClick={this.handleClick} className="fas fa-arrow-down" />
				</div>

				<div className="Joke-content">{joke}</div>
				<div className="Joke-mood">
					<i
						className={emotion.emoji}
						ariarole="presentation"
						arialabel="ROLLING ON THE FLOOR LAUGHING"
					/>
				</div>
			</div>
		);
	}
}
