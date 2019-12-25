import React, { Component } from 'react';

import './Pomodoro.css';

class Pomodoro extends Component {
	constructor(props) {
		super(props);
		this.state = {
            active: false,
            mode: 'Session',
            breakLength: 5,
            sessionLength: 25,
            sessionLeft: 25 * 60 * 1000,
            breakLeft: 5 * 60 * 1000
			// sessionLength: 25,
			// breakLength: 5,
			// mode: 'session',
			// time: 25 * 1000 * 60,
			// // active is for if playing or on pause
			// active: false,
			// // touched is for if session/breakLength are touched to change the session
			// // also for play/pause too
			// touched: false
		};
	}

	// handleReset = () => {
	// 	this.setState({
	// 		sessionLength: 25,
	// 		breakLength: 5,
	// 		mode: 'session',
	// 		time: 25,
	// 		active: false,
	// 		touched: false
	// 	});
	// 	clearInterval(this.clock);
	// 	// will pause the audio
	// 	this.audio.pause();
	// 	// will make the current time back to 0
	// 	// these are audio functions built in
	// 	this.audio.currentTime = 0;
	// };

	// // using lifecycle method here because we want to pass from sessionLength to breakLength
	// // when sessionLength finishes
	// componentDidUpdate(prevProps, prevState) {
	// 	// if we are in session mode and time goes to 0, then make mode to break and take breaks length(time)
	// 	if (prevState.time === 0 && prevState.mode === 'session') {
	// 		this.setState({
	// 			time: this.state.breakLength * 60 * 1000,
	// 			mode: 'break'
	// 		});
	// 		// after it goes to zero, play audio
	// 		this.audio.play();
	// 	}
	// 	// if we are in break more and time is 0, switch to session mode and take sessionsLength
	// 	if (prevState.time === 0 && prevState.mode === 'break') {
	// 		this.setState({
	// 			time: this.state.sessionLength * 60 * 1000,
	// 			mode: 'session'
	// 		});
	// 		// after it goes to zero, play audio
	// 		this.audio.play();
	// 	}
	// }

	// handlePlayPause = () => {
	// 	if (!this.state.active) {
	// 		if (this.state.touched) {
	// 			// if active is true, its playing and counting down
	// 			// and if touched is false but active is true, just run the time from session
	// 			this.clock = setInterval(
	// 				() =>
	// 					// in every 1000ms(1s) state will be called and set to 1000ms(1s) than what it is.
	// 					this.setState({
	// 						time: this.state.time - 1000
	// 					}),
	// 				1000
	// 			);
	// 			this.setState({
	// 				active: true,
	// 				touched: false
	// 			});
	// 		} else {
	// 			// if touched is true and active is true, which means playing and session length changed
	// 			// then time will be sessionlength
	// 			this.setState(
	// 				{
	// 					time: this.state.sessionLength * 60 * 1000,
	// 					touched: true,
	// 					active: true
	// 				},
	// 				// we call this.clock here with a function because we want the time(as taking sessionslengths value) to be counting backwards again
	// 				// with setinterval
	// 				() =>
	// 					(this.clock = setInterval(
	// 						() =>
	// 							// in every 1000ms(1s) state will be called and set to 1000ms(1s) than what it is.
	// 							this.setState({
	// 								time: this.state.time - 1000
	// 							}),
	// 						1000
	// 					))
	// 			);
	// 		}
	// 	} else {
	// 		// if active is false, its on pause. so it wont call the interval so it wont countdown
	// 		clearInterval(this.clock);
	// 		this.setState({
	// 			active: false
	// 		});
	// 	}

	// 	console.log(this.state.active);
	// 	this.setState({
	// 		active: !this.state.active
	// 	});
	// };

	// handleIncrementBreak = () => {
	// 	if (this.state.breakLength < 60) {
	// 		return this.setState({
	// 			breakLength: this.state.breakLength + 1
	// 		});
	// 	}
	// };

	// handleIncrementSession = () => {
	// 	if (this.state.sessionLength < 60) {
	// 		return this.setState({
	// 			// +sessionLength makes string a number, cool!
	// 			sessionLength: this.state.sessionLength + 1
	// 		});
	// 	}
	// };

	// handleDecrementBreak = () => {
	// 	if (this.state.breakLength > 1) {
	// 		this.setState({
	// 			breakLength: this.state.breakLength - 1
	// 		});
	// 	}
	// };

	// handleDecrementSession = () => {
	// 	if (this.state.sessionLength > 1) {
	// 		this.setState({
	// 			// +sessionLength makes string a number, cool!
	// 			sessionLength: this.state.sessionLength - 1
	// 		});
	// 	}
	// };

    componentDidUpdate(){
        if (this.state.sessionLeft === 0 || this.state.breakLeft === 0){
            this.audio.play()
        } 
    }

     handleClick = (event) => {
        const {id} = event.currentTarget
        switch(id) {
            case "break-increment":
                this.setState(state => {
                    let {breakLength, breakLeft} = state
                    return {
                        breakLength: breakLength === 60 ?  breakLength = 60: breakLength + 1,
                        breakLeft: breakLeft === 60 * 60 * 1000 ?  breakLeft = 60 * 60 * 1000: breakLeft + 60000
                    }
                })
                break;
            case "break-decrement":
                    this.setState(state => {
                        let {breakLength, breakLeft} = state
                        return {
                            breakLength: breakLength === 1 ?  breakLength = 1: breakLength - 1,
                            breakLeft: breakLeft === 1 * 60 * 1000 ?  breakLeft = 1 * 60 * 1000 : breakLeft - 60000
                        }
                    })
                break;
            case "session-increment":
                    this.setState(state => {
                        let {sessionLength, sessionLeft} = state
                        return {
                            sessionLength: sessionLength === 60 ?  sessionLength = 60: sessionLength + 1,
                            sessionLeft: sessionLeft === 60 * 60 * 1000 ?  sessionLeft = 60 * 60 * 1000: sessionLeft + 60000
                        }
                    })
                break;
            case "session-decrement":
                    this.setState(state => {
                        let {sessionLength, sessionLeft} = state
                        return {
                            sessionLength: sessionLength === 1 ?  sessionLength = 1: sessionLength - 1,
                            sessionLeft: sessionLeft === 1 * 60 * 1000 ?  sessionLeft = 1 * 60 * 1000 : sessionLeft - 60000
                        }
                    })
                break;
            case "reset":
                    document.getElementById("beep").pause();
                    document.getElementById("beep").currentTime = 0;
                    clearInterval(this.myInterval)
                    this.setState({
                            active: false,
                            mode: "Session",
                            breakLength: 5,
                            sessionLength: 25,
                            sessionLeft: 25 * 60 * 1000,
                            breakLeft: 5 * 60 * 1000 
                    })
                break;
            case "start_stop":
                    document.getElementById("beep").pause();
                    document.getElementById("beep").currentTime = 0;
                if (this.state.active === false) {
                    this.myInterval = setInterval(() => {
                        if (this.state.mode === 'Session' ){
                            if (this.state.sessionLeft !== 0){
                                this.setState({
                                    active: true,
                                    sessionLeft: this.state.sessionLeft - 1000                                  
                                })
                            } else if (this.state.sessionLeft === 0){
                                this.setState({
                                    active: true,
                                    sessionLeft: 0,
                                    mode: 'Break',
                                    breakLeft: this.state.breakLength * 60 * 1000
                                })
                            }
                        } else if (this.state.mode === 'Break'){
                            if (this.state.breakLeft !== 0){
                                this.setState({
                                    active: true,
                                    breakLeft: this.state.breakLeft - 1000                                  
                                })
                            } else if (this.state.breakLeft === 0){
                                this.setState({
                                    active: true,
                                    breakLeft: 0,
                                    mode: 'Session',
                                    sessionLeft: this.state.sessionLength * 60 * 1000
                                })
                            }
                        }
                    },1000)
                } else if (this.state.active === true){
                    this.setState(state => {
                        clearInterval(this.myInterval)
                        return {
                            active: state.active = false,
                        }
                    })   
                }
                break;
            default: 
            console.log("click another button")
        }     
    }


	convertMiliseconds = (ms, p) => {
        let pattern = p,
			arrayPattern = pattern.split(":"),
			clock = [ ],
			minutes = Math.floor ( ms / 60000), // 1 Minutes = 60000 Milliseconds
			seconds = Math.floor ((( ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds	
		// build the clock result
		function createClock(unit){
		// match the pattern to the corresponding variable
		if (pattern.match(unit)) {
			if (unit.match(/mm/)) {
				addUnitToClock(minutes, unit);
			}
			if (unit.match(/ss/)) {
				addUnitToClock(seconds, unit);
			};
			}
		}
		function addUnitToClock(val, unit){	
			if ( val < 10 && unit.length === 2) {
				val = "0" + val;
			}	
			clock.push(val); // push the values into the clock array		
		}
		// loop over the pattern building out the clock result
		for ( var i = 0, j = arrayPattern.length; i < j; i ++ ){	
			createClock(arrayPattern[i]);		
		}
		return clock.join(":")
    }

	render() {
        const moment = window.moment;
		const { sessionLength, breakLength, mode, sessionLeft, breakLeft } = this.state;

		return (
			<div className="container">
				<div className="smallerContainer">
					<div id="break-label">
						<p className="text">Break Length</p>
						<button href="" id="break-increment" onClick={this.handleClick}>
							<i className="fa fa-arrow-up fa-2x" />
						</button>
						<p id="break-length" className="numbers">
							{breakLength}
						</p>
						<button href="" id="break-decrement" onClick={this.handleClick}>
							<i className="fa fa-arrow-down fa-2x" />
						</button>
					</div>
					<div id="session-label">
						<p className="text">Session Length</p>
						<button href="" id="session-increment" onClick={this.handleClick}>
							<i className="fa fa-arrow-up fa-2x" />
						</button>
						<p id="session-length" className="numbers">
							{sessionLength}
						</p>
						<button href="" id="session-decrement" onClick={this.handleClick}>
							<i className="fa fa-arrow-down fa-2x" />
						</button>
					</div>
				</div>

				<div id="timer-label">
					<p className="text">{mode}</p>
					<h1 id="time-left" className="numbers">
						{/*  {moment(time).format('mm:ss')} */}
                       {mode === "Session" ? <p id="time-left">{this.convertMiliseconds(sessionLeft, "mm:ss")}</p> : <p id="time-left">{this.convertMiliseconds(breakLeft, "mm:ss")}</p>}  
					</h1>
					<button id="start_stop" onClick={this.handleClick}>
						{this.state.active ? <i className="fa fa-play fa-2x" /> : <i className="fa fa-pause fa-2x" />}
					</button>
					<button id="reset" onClick={this.handleClick}>
						<i className="fa fa-sync fa-2x" />
					</button>
				</div>
				<audio
					src="https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3"
					id="beep"
					ref={(el) => (this.audio = el)}
				/>
			</div>
		);
	}
}

export default Pomodoro;
