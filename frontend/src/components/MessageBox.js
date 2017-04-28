import React from 'react'

export default class MessageBox extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.removeMessage();
    }

    componentDidMount() {
        this.removeMessage();
    }

    removeMessage() {
        if (this.props.removeMessage !== undefined) {
            this.props.removeMessage(this.props.messageType, this.props.messageText);
        }
    }

    render() {
        return(
            <div className={ this.props.messageType }>
                <span>{ this.props.messageText }</span>
            </div>
        );
    }
}