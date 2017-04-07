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
        this.setState({
            name: event.target.value,
            message: undefined,
        });
    }

    handleCoffeeChange(event) {
        this.setState({
            selectedCoffee: event.target.value,
            message: undefined,
        });
    }

    handleMilkChange(event) {
        this.setState({
            selectedMilk: event.target.value,
            message: undefined,
        });
    }

    handleStrengthChanged(event) {
        this.setState({
            selectedStrength: event.target.value,
            message: undefined,
        });
    }

    getOldConfig(value) {
        fetch('http://localhost:3000/api/getUser?userName=' + value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
          .then((responseJson) => {
              this.setState({
                  message: <div><label>Config was loaded!</label></div>,
                  name: responseJson.name,
                  selectedCoffee: responseJson.selectedCoffee,
                  selectedMilk: responseJson.selectedMilk,
                  selectedStrength: responseJson.selectedStrength,
              });
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    sendCoffeeSetup(event) {
        event.preventDefault();
        const data = {
            name: this.state.name,
            selectedCoffee: this.state.selectedCoffee,
            selectedStrength: this.state.selectedStrength,
            selectedMilk: this.state.selectedMilk,
        };

        const errorMsg = <div><label className="errorMessage">Something went wrong :(</label></div>;
        const successMsg = <div><label className="successMessage">Your config has been sent!</label></div>;

        fetch('http://localhost:3000/api/saveUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    message: successMsg
                });
            } else {
                throw errorMsg;
            }
        }).catch((error) => {
            this.setState({
                message: error
            })
        });
    }

    render() {
        return (
            <div>
                {this.state.message}
                <label>Select your personal coffee configuration:</label>
                <form onSubmit={this.sendCoffeeSetup.bind(this)}>
                    <UserNameTextField value={this.state.name}
                                       onChange={this.handleNameChange.bind(this)}
                                       onClick={this.getOldConfig.bind(this)}/>
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
        );
    }
}