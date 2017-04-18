import React from 'react'
import CoffeeSelector from "./CoffeeSelector"
import UserNameTextField from "./UserNameTextField"
import 'whatwg-fetch'

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
            showMessage: false,
            messageType: "info",
            reloadIcon: "cached",

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
                  message: <span>Configuration loaded!</span>,
                  name: responseJson.name,
                  selectedCoffee: responseJson.selectedCoffee,
                  selectedMilk: responseJson.selectedMilk,
                  selectedStrength: responseJson.selectedStrength,
              });
              this.toggleMessage("info");
            })
            .catch((error) => {
                this.toggleMessage("error");
                console.log(error);
                throw error;
            });
    }

    sendCoffeeSetup(event) {
        event.preventDefault();
        if (this.state.name === undefined || this.state.name === "") {
            this.setState({
                message: <span>Please enter a user name!</span>
            });
            this.toggleMessage("warning");
        } else {
            const data = {
                name: this.state.name,
                selectedCoffee: this.state.selectedCoffee,
                selectedStrength: this.state.selectedStrength,
                selectedMilk: this.state.selectedMilk,
            };

            const errorMsg = <span>Something went wrong :(</span>;
            const successMsg = <span>Configuration saved!</span>;

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
                    this.toggleMessage("success");
                } else {
                    throw errorMsg;
                }
            }).catch((error) => {
                this.setState({
                    message: error
                });
                this.toggleMessage("error");
            });
            
        }
    }

    toggleMessage(currentMessageType) {
        this.setState( { messageType : currentMessageType } )
        this.setState( { showMessage : true } );
        setTimeout(() => {this.setState( { showMessage : false } )}, 3000);
    }

    render() {
        return (
            <div className="content">
                <div id="header">
                    Welcome to /coffee_mod!
                    <UserNameTextField value={this.state.name} 
                                       onChange={this.handleNameChange.bind(this)} />
                </div>
                <div>
                    <form onSubmit={this.sendCoffeeSetup.bind(this)}>
                        <span className="heading">My coffee setup</span>
                        <CoffeeSelector label="Coffee/ml"
                                        values={this.state.coffeeMilliliters}
                                        defaultValue={this.state.selectedCoffee}
                                        onChange={this.handleCoffeeChange.bind(this)}/>
                        <CoffeeSelector label="Milk/ml"
                                        values={this.state.milkMilliliters}
                                        defaultValue={this.state.selectedMilk}
                                        onChange={this.handleMilkChange.bind(this)}/>
                        <CoffeeSelector label="Strength"
                                        values={this.state.strengthChoices}
                                        defaultValue={this.state.selectedStrength}
                                        onChange={this.handleStrengthChanged.bind(this)}/>
                        <div className="formButtonContainer">
                            <div className="formButton getOldConfigButton" onClick="" title="Load old setup">
                                <i className="material-icons md-light">{ this.state.reloadIcon }</i>
                            </div>
                            <input className="formButton submitButton" type="submit" value="Save setup!"/>
                        </div>
                    </form>
                </div>
                <div className={ this.state.showMessage ? this.state.messageType : this.state.messageType + " hidden" }>{ this.state.message }</div>
            </div>
        );
    }
}