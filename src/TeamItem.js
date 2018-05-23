import React, { Component } from 'react';

class TeamItem extends Component {
    render() {
        return(
        <tr>
            <td>{this.props.position}</td>
            <td>{this.props.team.name}</td>
            <td>{this.props.team.goalsFor}</td>
            <td>{this.props.team.goalsAgainst}</td>
            <td>{this.props.team.goalDifference}</td>
            <td>{this.props.team.points}</td>
        </tr>
        );
    }
}

export default TeamItem;