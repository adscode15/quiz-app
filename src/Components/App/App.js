import React, { Component } from 'react';
import Quiz from '../Quiz/Quiz';
import Scoreboard from '../Scoreboard/Scoreboard'; 
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      quizes: [],
      currentIndex: 0,
      isPlaying: false
    }
    this.score = 0;
    this.handle = this.handle.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getData(category, difficulty){
    fetch(`https://quizapi.io/api/v1/questions?category=${category}&limit=10&difficulty=${difficulty}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "JGooh9dHsUHm7WArHqtHRKrLXfjQduKqEbgf8sS3"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          quizes: [...data],
          currentIndex: 0, 
          isPlaying: true
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // componentDidMount(){
  //   this.getData();
  // }

  updateScore(){
    this.score++;
  }

  handle(){
    this.setState((state) => ({
      currentIndex: state.currentIndex + 1
    }));
  }

  handleClick(category, difficulty){
    this.getData(category, difficulty);
    this.score = 0;
  }

  render() {
    const quizes = this.state.quizes;
    const currentIndex = this.state.currentIndex;
    const currentQuiz = {...quizes[currentIndex]};
    const score = this.score;
    return (
      <div className="App">
        <h1>Quiz app</h1>
        {!this.state.isPlaying && <Scoreboard handleClick={this.handleClick} isPlaying={this.state.isPlaying} />}
        {
          (this.state.currentIndex < 10 && this.state.isPlaying) &&
             <Quiz update={this.updateScore} handle={this.handle} quiz={currentQuiz} />
        }
        {
          (this.state.isPlaying && this.state.currentIndex === 10) && <Scoreboard score={score} handleClick={this.handleClick} isPlaying={this.state.isPlaying} />
        }
      </div>
    )
  }
}
