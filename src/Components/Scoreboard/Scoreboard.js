import React, {Component} from 'react';
import './Scoreboard.css';


class Scoreboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
            category: 'linux',
            difficulty: 'easy'
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.setState({
            isClicked: true
        })
        this.props.handleClick(this.state.category, this.state.difficulty);
    }

    handleCategoryChange(e){
        this.setState({
            category: e.target.value
        })
    }

    handleDifficultyChange(e){
        this.setState({
            difficulty: e.target.value
        })
    }

    render(){
        return (
            <div className="Scoreboard">
                {
                    this.props.isPlaying && <p className="score">You have scored {this.props.score}/10</p>
                }
                <p>Start a new game</p>
                <form className="form">
                <label htmlFor="category">Category:</label>
                    <div className="custom-select">
                        <select 
                            value={this.state.category}         name="category" 
                            id="category"
                            onChange={this.handleCategoryChange}
                        >
                            <option value="linux">Linux</option>
                            <option value="docker">Docker</option>
                            <option value="devops">DevOps</option>
                        </select>
                        <span className="custom-arrow"></span>
                    </div>
                    <label htmlFor="difficulty">Difficulty:</label>
                    <div className="custom-select">
                        <select 
                            name="difficulty" 
                            id="difficulty"
                            value={this.state.difficulty}
                            onChange={this.handleDifficultyChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <span className="custom-arrow"></span>
                    </div>
                    {this.state.isClicked && <p className="new-game">Creating of new game</p>}
                    <button type="submit" onClick={this.handleClick}>New Game</button>
                </form>
            </div>
        )
    }
}

export default Scoreboard;
