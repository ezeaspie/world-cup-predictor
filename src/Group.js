import React, { Component } from 'react';
import TeamItem from './TeamItem';

class Group extends Component {

    render() {
        return(
        <section className = 'group'>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Goals Scored</th>
                        <th>Goals Against</th>
                        <th>Goal Difference</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.teams.map((team,index) => {
                        return <TeamItem team={team} key={index} position={index + 1} />
                    })
                }
                </tbody>
            </table>
        </section>
        );
    }
}

export default Group;