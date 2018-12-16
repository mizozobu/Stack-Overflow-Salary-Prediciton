import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import {Form, FormGroup, Button, Input} from 'reactstrap';

class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.appConfig = props.appConfig;
    this.user = this.appConfig.user;
    this.state = {
      msg: '',
      msgs: props.msgs,
      typers: [],
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //websocket event listers
    this.appConfig.SOCKET.on('chatAdd', newMsg => {
      this.setState(prevState => ({
        msgs: [...prevState.msgs, newMsg]
      }));
    });

    this.appConfig.SOCKET.on('typerAdd', newTyper => {
      this.setState(prevState => ({
        typers: [...prevState.typers, newTyper]
      }));
    });

    this.appConfig.SOCKET.on('typerRemove', typer => {
      this.setState(prevState => ({
        typers: prevState.typers.filter(el => el != typer )
      }));
    });
  }

  handleFocus() {
    this.appConfig.SOCKET.emit('typerAdd', this.user.username);
  }

  handleBlur() {
    this.appConfig.SOCKET.emit('typerRemove', this.user.username);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const newMsg = {
      user: this.user,
      body: this.state.msg
    };
    this.appConfig.SOCKET.emit('chatAdd', newMsg);
    this.setState({ msg: '' });
  }

  render() {
    const { t, tReady } = this.props;

    let someOneIsTyping = '';
    if (this.state.typers.length === 1) {
      someOneIsTyping = `${this.state.typers[0]} is tying...`;
    }
    else if (this.state.typers.length > 1) {
      someOneIsTyping = `${this.state.typers.join(', ')} are typing...`;
    }

    return (
      <div>
        <h1>{ t('chat') }</h1>
        {this.state.msgs.map(msg => <p key={msg._id} className="text-primary">{msg.user.username}: {msg.body}</p>)}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            {someOneIsTyping}
            <Input type="text" name="msg" placeholder="Enter message" value={this.state.msg}
              onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleInputChange} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

Chat.propTypes = {
  t: PropTypes.func.isRequired,
  tReady: PropTypes.bool.isRequired,
  appConfig: PropTypes.object.isRequired,
  msgs: PropTypes.arrayOf(PropTypes.object),
};

export default translate('translation')(Chat);
