import React from 'react';
import CoffeeSelector from "./CoffeeSelector";
import StrengthSelector from './StrengthSelector';

export default class CoffeeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coffeeChoices: ["Coffee", "Latte"],
            strengthChoices: [1, 2, 3, 4, 5],
            selectedCoffee: "Standard",
            selectedStrength: "Standard",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCoffeeChange(event) {
        this.setState({selectedCoffee: event.target.value});
    }

    handleStrengthChanged(event) {
        this.setState({selectedStrength: event.target.value});
    }

    sendCoffeeSetup() {
        console.log("The configration has been saved!");
        //AJAX POST call to backend here
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <label>Select your personal coffee configuration:</label>
                <form onSubmit={this.handleSubmit}>
                    <CoffeeSelector values={this.state.coffeeChoices} onChange={this.handleCoffeeChange.bind(this)}/>
                    <StrengthSelector values={this.state.strengthChoices} onChange={this.handleStrengthChanged.bind(this)}/>
                    <input type="submit" value="Send it!"/>
                </form>
            </div>
        )
    }
}