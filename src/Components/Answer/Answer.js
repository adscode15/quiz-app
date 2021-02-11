import React, { Component } from 'react';
import './Answer.css';

export default class Answer extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameClass: this.props.nameClass || 'Answer'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        if(this.props.canChoose === true){
            let newName;
            if(this.props.isCorrect === 'true'){
                newName = 'Answer correct-answer';
                this.props.update();
            }
            else
                newName = 'Answer wrong-answer';
            this.setState({
                nameClass: newName
            });
            this.props.enable();
        }  
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.canChoose === false && (nextProps.answer !== this.props.answer)){
            this.setState({
                nameClass: 'Answer'
            })
        }
        return true;
    }

    render() {
        return (
            <div 
                onClick={this.handleClick} 
                className={this.props.canChoose === false && this.props.isCorrect === 'true' ? "Answer correct-answer" : this.state.nameClass}
            >
                {this.props.answer}
            </div>
        )
    }
}
