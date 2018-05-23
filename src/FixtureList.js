import React , { Component } from 'react';
import Fixture from './Fixture';

class FixtureList extends Component {

    render(){
        return(
            <ul>
            {
                this.props.fixtureList.map((fixture, index) => {
                    return (
                        <Fixture key={"f" + index} handleInput = {this.props.handleInput} fixtureData = {fixture} />
                    )
                })
            }
            </ul>
        );
    }
}



export default FixtureList;