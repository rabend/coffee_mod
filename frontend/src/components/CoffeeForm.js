import React from 'react'
import CoffeeSelector from "./CoffeeSelector"
import UserNameTextField from "./UserNameTextField"
import MessageBox from "./MessageBox"
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
            reloadIcon: "cached",
            message: <MessageBox messageType="hidden" />,
        };
        this.getOldConfig.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handleCoffeeChange(event) {
        this.setState({
            selectedCoffee: event.target.value,
        });
    }

    handleMilkChange(event) {
        this.setState({
            selectedMilk: event.target.value,
        });
    }

    handleStrengthChanged(event) {
        this.setState({
            selectedStrength: event.target.value,
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
                  message: <MessageBox messageType="info"
                                       messageText="Configuration loaded!"
                                       removeMessage={ this.removeMessageBox.bind(this) } />,
                  name: responseJson.name,
                  selectedCoffee: responseJson.selectedCoffee,
                  selectedMilk: responseJson.selectedMilk,
                  selectedStrength: responseJson.selectedStrength,
              });
            })
            .catch((error) => {
                throw error;
            });
    }

    sendCoffeeSetup(event) {
        event.preventDefault();
        if (this.state.name === undefined || this.state.name === "") {
            this.setState({
                message: <MessageBox messageType="warning"
                                     messageText="Please enter a username!"
                                     removeMessage={ this.removeMessageBox.bind(this) } />
            });
        } else {
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
            }).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        message: <MessageBox messageType="success"
                                             messageText="Configuration saved!"
                                             removeMessage={ this.removeMessageBox.bind(this) } />
                    });
                } else {
                    throw new Error("Error");
                }
            }).catch((error) => {
                this.setState({
                    message: <MessageBox messageType="error"
                                         messageText="Something went wrong :("
                                         removeMessage={ this.removeMessageBox.bind(this) } />
                });
            });
            
        }
    }

    removeMessageBox(messageType, messageText) {
        setTimeout(() => { this.setState({ message : <MessageBox messageType={ messageType + " hidden" }
                                                                 messageText={messageText} /> }) }, 3000);
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
                            <button className="formButton getOldConfigButton" type="button" onClick={()=>{this.getOldConfig(this.state.name)}} title="Load old settings">
                                <i className="material-icons md-light">{ this.state.reloadIcon }</i>
                            </button>
                            <input className="formButton submitButton" type="submit" value="Save setup!"/>
                        </div>
                    </form>
                </div>
                {this.state.message}
            </div>
        );
    }
}