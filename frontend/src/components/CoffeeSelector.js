import React from 'react';

export default class CoffeeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.defaultValue,
        });
    }

    renderCoffeeOptions() {
        const options = [];

        for (let i = 0; i < this.props.values.length; i++) {
            options.push(<option value={this.props.values[i]} key={i}>{this.props.values[i]}</option>);
        }

        return options;
    }

    handleChange(event) {
        this.props.onChange(event);
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <select className="coffeSelector" value={this.state.value} onChange={this.handleChange}>
                    {this.renderCoffeeOptions()}
                </select>
            </div>
        );
    }
}