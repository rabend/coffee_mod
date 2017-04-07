import React from 'react';

export default class UserNameTextField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: props.value};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
        this.setState({
            value: event.target.value
        },);
    }

    render() {
        return (
            <div>
                <label>Your name:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </div>
        )
    }
}