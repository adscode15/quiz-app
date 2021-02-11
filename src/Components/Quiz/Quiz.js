import React, { Component } from 'react';
import Answer from '../Answer/Answer';
import './Quiz.css';

export default class Quiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            canChoose: true,
            nextClass: 'next-btn'
        }
        this.enableChoose = this.enableChoose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    enableChoose(){
        this.setState({
            canChoose: false,
            nextClass: 'next-btn show'
        });
    }

    handleClick(){
        this.props.handle();
        this.setState({
            nextClass: 'next-btn',
            canChoose: true
        })
    }

    render() {
        const quiz = this.props.quiz;
        const answers = Object.keys({...quiz.answers});
        const ans = answers.map((answer) => quiz.answers[answer] ? <Answer
            key={answer} 
            answer={quiz.answers[answer]} 
            isCorrect={quiz.correct_answers[answer + "_correct"]}
            canChoose={this.state.canChoose}
            enable={this.enableChoose}
            update={this.props.update}
        /> : "");
        return (
            <div className="Quiz">
                <p className="question">{this.props.quiz.question}</p>
                {ans}
                <button 
                    onClick={this.handleClick}
                    className={this.state.nextClass}
                >Next</button>
            </div>
        )
    }
}
