import React from 'react';
import CoffeeSelector from "./CoffeeSelector";
import StrengthSelector from './StrengthSelector';
import UserNameTextField from "./UserNameTextField";
import 'whatwg-fetch';

export default class CoffeeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coffeeChoices: ["Coffee", "Latte", "Cappuccino"],
            strengthChoices: [1, 2, 3, 4, 5],
            name: "TestUser",
            selectedCoffee: "Coffee",
            selectedStrength: 3,
        };
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleCoffeeChange(event) {
        this.setState({selectedCoffee: event.target.value});
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
                    <UserNameTextField value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
                    <CoffeeSelector values={this.state.coffeeChoices} onChange={this.handleCoffeeChange.bind(this)}/>
                    <StrengthSelector values={this.state.strengthChoices} onChange={this.handleStrengthChanged.bind(this)}/>
                    <input type="submit" value="Send it!"/>
                </form>
            </div>
        )
    }
}