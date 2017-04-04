import React from 'react';

export default class StrengthSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: '3'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    renderStrengthOptions() {
        const options = [];

        for (let i = 0; i < this.props.values.length; i++) {
            options.push(<option value={this.props.values[i]} key={i}>{this.props.values[i]}</option>);
        }

        return options;
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return(
            <select value={this.state.value} onChange={this.handleChange} className="coffeeSelector">
                {this.renderStrengthOptions()}
            </select>
        )
    }
}