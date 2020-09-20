import React, { Component } from 'react';
import '../../css/Joke.css';

let colors = [];
export default class Joke extends Component {
	// static defaultProps={
	//   colors:[]
	// }

	constructor(props) {
		super(props);
		this.handleColors();
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

	handleColors = () => {
		colors = [];
		let red = 255; //i.e. FF
		let green = 0;
		let stepSize = 24.4; //how many colors do you want?
		while (green < 255) {
			green += stepSize;
			if (green > 255) {
				green = 255;
			}
			colors.push(`rgb(${Math.round(red)},${Math.round(green)},000)`); //assume output is function that takes RGB
		}
		while (red > 0) {
			red -= stepSize;
			if (red < 0) {
				red = 0;
			}
			colors.push(`rgb(${Math.round(red)},${Math.round(green)},000)`);
		}
		console.log(colors);
		return colors;
	};

	handleMood = () => {
		const { rating } = this.props.joke;
		if (rating > 10) return colors[20];
		if (rating < -10) return colors[0];
		return colors[rating + 10];
		// switch (rating) {
		// 	case -10:

		// 		break;
		// 	case -9:
		// 		break;
		// 	case -8:
		// 		break;
		// 	case -7:
		// 		break;
		// 	case -6:
		// 		break;
		// 	case -5:
		// 		break;
		// 	case -4:
		// 		break;
		// 	case -3:
		// 		break;
		// 	case -2:
		// 		break;
		// 	case -1:
		// 		break;
		// 	case 0:
		// 		break;
		// 	case 1:
		// 		break;
		// 	case 2:
		// 		break;
		// 	case 3:
		// 		break;
		// 	case 4:
		// 		break;
		// 	case 5:
		// 		break;
		// 	case 6:
		// 		break;
		// 	case 7:
		// 		break;
		// 	case 8:
		// 		break;
		// 	case 9:
		// 		break;
		// 	case 10:
		// 		break;

		// 	default:
		// 		break;
		// }
		// if (rating < -8) return 'very angry';
		// if (rating >= -8 && rating <= -6) return 'angry';
		// if (rating >= -5 && rating <= -3) return 'displeased';
		// if (rating >= -2 && rating <= -1) return 'not funny';
		// if (rating === 0) return 'unemote';
		// if (rating >= 1 && rating <= 2) return 'kinda funny';
		// if (rating >= 3 && rating <= 5) return 'a lil funny';
		// if (rating >= 6 && rating <= 8) return 'funny';
		// if (rating > 8) return 'hilarious';
	};

	// this.handleColors();

	render() {
		const { id, joke, rating } = this.props.joke;
		return (
			<div className="Joke" id={id}>
				<div className="Joke-buttons">
					<i onClick={this.handleClick} className="fas fa-arrow-up" />
					<span style={{ borderColor: this.handleMood() }}>{rating}</span>
					<i onClick={this.handleClick} className="fas fa-arrow-down" />
				</div>

				<div className="Joke-content">{joke}</div>
				<div className="Joke-mood">
					<i
						class="em em-rolling_on_the_floor_laughing"
						aria-role="presentation"
						aria-label="ROLLING ON THE FLOOR LAUGHING"
					/>
				</div>
			</div>
		);
	}
}
