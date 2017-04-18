import React from 'react';
import 'whatwg-fetch';

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

    handleClick(event) {
        event.preventDefault();
        this.props.onClick(this.state.value);
    }

    render() {
        return (
            <div className="userNameContainer">
                <input type="text" className="userNameTextField" value={this.state.value} onChange={this.handleChange}/>
                <i className="material-icons md-dark">person</i>
            </div>
        )
    }
}