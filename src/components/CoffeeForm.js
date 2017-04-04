import React from 'react';
import CoffeeSelector from "./CoffeeSelector";
import StrengthSelector from './StrengthSelector';

export default class CoffeeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coffeeChoices: ["Coffee", "Latte"],
            strengthChoices: [1, 2, 3, 4, 5],
            selectedCoffee:"Standard",
            selectedStrength:"Standard",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCoffeeChange(coffeeChoice) {
        alert(coffeeChoice);
        this.setState({
            selectedCoffee: coffeeChoice
        });
    }
    sendCoffeeSetup() {
    }
    handleSubmit(event) {
        alert("Form submitted, AJAX call be here, coffee was: " + this.state.selectedCoffee + " strength was: " + this.state.selectedStrength);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CoffeeSelector values={this.state.coffeeChoices} onChange={this.handleCoffeeChange}/>
                <StrengthSelector values={this.state.strengthChoices}/>
                <input type="submit"/>
            </form>
        )
    }
}