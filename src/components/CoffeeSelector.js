import React from 'react';

export default class CoffeeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'Coffee',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    renderCoffeeOptions() {
        const options = [];

        for(let i = 0; i < this.props.values.length; i++){
            options.push(<option value={this.props.values[i]} key={i}>{this.props.values[i]}</option>);
        }

        return options;
    }
    handleChange(event) {
        const choice = event.target.value;
        alert("Choice was " + choice);
        this.props.onChange(choice);
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <select className="coffeSelector" value={this.state.value} onChange={this.handleChange}>
                {this.renderCoffeeOptions()}
            </select>
        );
    }
}