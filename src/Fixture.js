import React, { Component } from 'react';

class Fixture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team1value : "",
            team2value : "",
            isDisabled : false,
        }
    this.handleteam1Change = this.handleteam1Change.bind(this);
    this.handleteam2Change = this.handleteam2Change.bind(this);
    }

    handleteam1Change = (e) => {
        this.setState({team1value : e.target.value});
    }
    handleteam2Change = (e) => {
        this.setState({team2value : e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
            let team1goals = this.state.team1value;
            let team2goals = this.state.team2value;
            let teamid = this.props.fixtureData.team1.id;
            let opponentid = this.props.fixtureData.team2.id;
            this.setState({isDisabled : true});
            this.props.handleInput(team1goals, team2goals, teamid, opponentid);
    }

    render() {
        const fixture = this.props.fixtureData;

        return(
            <li>
                <h3>{fixture.team1.name} vs {fixture.team2.name}</h3>
                <form>
                <input  type="number" onChange={this.handleteam1Change} value={this.state.team1value} />
                <input type="number"  onChange={this.handleteam2Change} value={this.state.team2value} />
                <button onClick={this.handleSubmit} disabled = {this.state.isDisabled}>Save</button>
                </form>
                <h4>{fixture.stadium}</h4>
                <h4>{fixture.time}</h4>
                <h4>{fixture.date}</h4>
            </li>
        )
    }
}

export default Fixture;