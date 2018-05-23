import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Group from './Group';
import FixtureList from './FixtureList';

/* Factories and variables used to create and store fixtures and teams */

const teamArrays = [];
const fixtureArray = [];

const teamFactory = (name,crest,id) => {
  let points = 0, goalsAgainst= 0, goalsFor = 0, goalDifference = 0;
  return {name,crest, points, goalsFor, goalsAgainst, goalDifference}
}

const fixtureFactory = (team1Id,team2Id,stadium,time,date) => {

  let team1object= { 
    id:team1Id,
    name: teamArrays[team1Id].name,
    }
  let team2object = {
    id: team2Id,
    name:teamArrays[team2Id].name,
  }

  return { team1:team1object, team2:team2object, stadium, time, date, isComplete:false }
}

//Group A
teamArrays.push(teamFactory("Russia", 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg', 1));
teamArrays.push(teamFactory("Saudi Arabia", 'https://en.wikipedia.org/wiki/Saudi_Arabia#/media/File:Flag_of_Saudi_Arabia.svg', 2));
teamArrays.push(teamFactory("Egypt", 'https://en.wikipedia.org/wiki/Egypt#/media/File:Flag_of_Egypt.svg', 3));
teamArrays.push(teamFactory("Uruguay", 'https://en.wikipedia.org/wiki/Uruguay#/media/File:Flag_of_Uruguay.svg', 4));

fixtureArray.push(fixtureFactory(0,1,'Luzhniki Stadium, Moscow', "16:00", "Thursday 14th June"));
fixtureArray.push(fixtureFactory(2, 3, 'Central Stadium, Yekaterinburg', "13:00", "Friday 15th June"));
fixtureArray.push(fixtureFactory(0, 2, 'Krestovsky Stadium, Saint Petersburg', "19:00", "Tuesday 19th June"));
fixtureArray.push(fixtureFactory(3, 1, 'Rostov Arena, Rostov-on-Don', "16:00", "Wednesday 20th June"));
fixtureArray.push(fixtureFactory(1, 2, 'Volgograd Arena, Volgograd', "15:00", "Monday 25th June"));
fixtureArray.push(fixtureFactory(3, 0, 'Samara Arena, Samara', "15:00", "Monday 25th June"));

//Group B
teamArrays.push(teamFactory("Portugal", "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg", 5));
teamArrays.push(teamFactory("Spain", "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg", 6));
teamArrays.push(teamFactory("Morroco", "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg", 7));
teamArrays.push(teamFactory("Iran", "https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg", 8));

fixtureArray.push(fixtureFactory(6, 7, 'Krestovsky Stadium, Saint Petersburg', "16:00", "Friday 15th June"));
fixtureArray.push(fixtureFactory(4, 5, 'Fisht Olympic Stadium, Sochi', "19:00", "Friday 15th June"));
fixtureArray.push(fixtureFactory(4, 6, 'Luzhniki Stadium, Moscow', "13:00", "Wednesday 20th June"));
fixtureArray.push(fixtureFactory(7, 5, 'Kazan Arena, Kazan', "19:00", "Wednesday 20th June"));
fixtureArray.push(fixtureFactory(7, 4, 'Mordovia Arena, Saransk', "19:00", "Monday 25th June"));
fixtureArray.push(fixtureFactory(5, 6, 'Kaliningrad Stadium, Kaliningrad', "19:00", "Monday 25th June"));


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groupATeams : teamArrays.slice(0,4),
      groups: [
        teamArrays.slice(0,4),
        teamArrays.slice(4,8),
      ],
      fixtures: [
        fixtureArray.slice(0,6),
        fixtureArray.slice(6,12),
      ],
      currentGroup : 0,
    }

    this.updateTablesonInputChange = this.updateTablesonInputChange.bind(this);
  }

  sortTeams = (min,max) => {
    
    let teamArray = teamArrays.slice(min,max);

    teamArray.sort((a, b) => b.points - a.points );

    return teamArray;
  }

  updateTablesonInputChange = (team1goals, team2goals, teamid,opponentid) => {
    let homeTeam = teamArrays[teamid];
    let awayTeam = teamArrays[opponentid];

    homeTeam.goalsFor += Number(team1goals);
    homeTeam.goalsAgainst += Number(team2goals); 
    awayTeam.goalsFor += Number(team2goals);
    awayTeam.goalsAgainst += Number(team1goals);
    homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;

    if(team1goals == team2goals){
      homeTeam.points += 1;
      awayTeam.points += 1;
    }
    else if (team1goals > team2goals) {
      homeTeam.points += 3;
      awayTeam.points += 0;
    }
    else {
      homeTeam.points += 0;
      awayTeam.points += 3;
    }
    let newArray = this.sortTeams(0,4);

    console.log(newArray);

    this.setState({groupATeams: newArray});
  }

  nextGroup = () => {
    this.setState({currentGroup : this.state.currentGroup + 1});
  }

  previousGroup = () => {
    this.setState({currentGroup : this.state.currentGroup - 1});
  }

  render() {
    return (
      <div className="App">
        <button onClick = {this.nextGroup}>Next</button>
        <button onClick = {this.previousGroup}>Back</button>
        <Group teams= {this.state.groups[this.state.currentGroup]} />
        <FixtureList fixtureList={this.state.fixtures[this.state.currentGroup]} handleInput = {this.updateTablesonInputChange} />
      </div>
    );
  }
}

export default App;
