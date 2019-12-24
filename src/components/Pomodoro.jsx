import React, { Component } from 'react';
import moment from 'moment';

import './Pomodoro.css';

class Pomodoro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sessionLength: 25,
			breakLength: 5,
			mode: 'session',
			time: 25 * 60 * 1000,
			active: false,
			touched: false
		};
	}

	handleReset = () => {
		this.setState({
			sessionLength: 25,
			breakLength: 5,
			mode: 'session',
			// 25 mins in miliseconds
			time: 25 * 60 * 1000,
			active: false,
			touched: false
		});
		clearInterval(this.pomodoro);
	};

	handlePlayPause = () => {
		const { touched, active, time, sessionLength } = this.state;
		console.log(time, active);
        
        this.setState({
            active: !active
        })

        
        this.pomodoro = setInterval(() => this.setState({
                time: time - 1000
            }), 1000);
        

        

		// if (active) {
		// 	clearInterval(this.pomodoro);
		// 	this.setState({
		// 		active: false
		// 	});
		// } else {
		// 	if (touched) {
		// 		// setInterval will call time every 1000ms(1s, at the end of the setinterval function)
		// 		// and substract 1000ms from time
		// 		this.pomodoro = setInterval(
		// 			() =>
		// 				this.setState({
		// 					time: time - 1000
		// 				}),
		// 			1000
		// 		);
		// 		this.setState({
		// 			active: true,
		//             touched: false
		// 		});
		// 	} else {
		// 		this.setState(
		// 			{
		// 				time: sessionLength * 60 * 1000,
		// 				touched: true,
		// 				active: true
		// 			},
		// 			() => this.pomodoro = setInterval(() => this.setState({ time: time - 1000 }), 1000)
		// 		);
		// 	}
		// }

		// this.setState({
		// 	active: !active
		// });
    }	

	// handleSetTimers = (inc, type) => {
	// 	if (inc && this.state[type] === 60) return;
	// 	if (!inc && this.state[type] === 1) return;
	// 	this.setState({ [type]: this.state[type] + (inc ? 1 : -1) });
	//     console.log(type, inc)
	// };

	componentDidUpdate(prevProps, prevState) {
		if (prevState.time === 0 && prevState.mode === 'session') {
			this.setState({
				breakLength: this.state.breakLength * 60 * 1000,
				mode: 'break'
			});
		}
		if (prevState.time === 0 && prevState.mode === 'break') {
			this.setState({
				sessionLength: this.state.sessionLength * 60 * 1000,
				mode: 'session'
			});
		}
	}

	handleIncrementBreak = () => {
		if (this.state.breakLength < 60) {
			return this.setState({
				breakLength: this.state.breakLength + 1
			});
		}
	};

	handleIncrementSession = () => {
		if (this.state.sessionLength < 60) {
			return this.setState({
				// +sessionLength makes string a number, cool!
				sessionLength: this.state.sessionLength + 1
			});
		}
	};

	handleDecrementBreak = () => {
		if (this.state.breakLength > 1) {
			this.setState({
				breakLength: this.state.breakLength - 1
			});
		}
	};

	handleDecrementSession = () => {
		if (this.state.sessionLength > 1) {
			this.setState({
				// +sessionLength makes string a number, cool!
				sessionLength: this.state.sessionLength - 1
			});
		}
	};

	render() {
		const { sessionLength, breakLength, mode, time, active } = this.state;

		return (
			<div className="container">
				<div className="smallerContainer">
					<div id="break-label">
						<p className="text">Break Length</p>
						<button href="" id="break-increment" onClick={this.handleIncrementBreak}>
							<i className="fa fa-arrow-up fa-2x" />
						</button>
						<p id="break-length" className="numbers">
							{breakLength}
						</p>
						<button href="" id="break-decrement" onClick={this.handleDecrementBreak}>
							<i className="fa fa-arrow-down fa-2x" />
						</button>
					</div>
					<div id="session-label">
						<p className="text">Session Length</p>
						<button href="" id="session-increment" onClick={this.handleIncrementSession}>
							<i className="fa fa-arrow-up fa-2x" />
						</button>
						<p id="session-length" className="numbers">
							{sessionLength}
						</p>
						<button href="" id="session-decrement" onClick={this.handleDecrementSession}>
							<i className="fa fa-arrow-down fa-2x" />
						</button>
					</div>
				</div>

				<div id="timer-label">
					<p className="text">{mode === 'session' ? 'Session' : 'Break'}</p>
					<h1 id="time-left" className="numbers">
						{moment(time).format('mm:ss')}
					</h1>
					<button id="start_stop" onClick={this.handlePlayPause}>
						{active ? <i className="fa fa-play fa-2x" /> : <i className="fa fa-pause fa-2x" />}
					</button>
					<button id="reset" onClick={this.handleReset}>
						<i className="fa fa-sync fa-2x" />
					</button>
				</div>
			</div>
		);
	}
}

export default Pomodoro;
