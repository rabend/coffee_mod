import React from 'react';
import CoffeeSelector from "./CoffeeSelector";
import UserNameTextField from "./UserNameTextField";
import 'whatwg-fetch';

export default class CoffeeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coffeeMilliliters: [100, 120, 140, 160],
            milkMilliliters: [0, 20, 40, 60],
            strengthChoices: [1, 2, 3, 4, 5],
            name: "TestUser",
            selectedCoffee: 120,
            selectedMilk: 0,
            selectedStrength: 3,
        };
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleCoffeeChange(event) {
        this.setState({selectedCoffee: event.target.value});
    }

    handleMilkChange(event) {
        this.setState({selectedMilk: event.target.value});
    }
    handleStrengthChanged(event) {
        this.setState({selectedStrength: event.target.value});
    }

    sendCoffeeSetup(event) {
        event.preventDefault();
        const data = {
            name: this.state.name,
            selectedCoffee: this.state.selectedCoffee,
            selectedStrength: this.state.selectedStrength,
            selectedMilk: this.state.selectedMilk,
        };

        fetch('http://localhost:3000/api/saveUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    render() {
        return (
            <div>
                <label>Select your personal coffee configuration:</label>
                <form onSubmit={this.sendCoffeeSetup.bind(this)}>
                    <UserNameTextField value={this.state.name}
                                       onChange={this.handleNameChange.bind(this)}/>
                    <CoffeeSelector label="Select Milliliters:"
                                    values={this.state.coffeeMilliliters}
                                    defaultValue={this.state.selectedCoffee}
                                    onChange={this.handleCoffeeChange.bind(this)}/>
                    <CoffeeSelector label="Select Milk Milliliters:"
                                    values={this.state.milkMilliliters}
                                    defaultValue={this.state.selectedMilk}
                                    onChange={this.handleMilkChange.bind(this)}/>
                    <CoffeeSelector label="Select Coffee Strength:"
                                    values={this.state.strengthChoices}
                                    defaultValue={this.state.selectedStrength}
                                    onChange={this.handleStrengthChanged.bind(this)}/>
                    <input type="submit" value="Send it!"/>
                </form>
            </div>
        )
    }
}