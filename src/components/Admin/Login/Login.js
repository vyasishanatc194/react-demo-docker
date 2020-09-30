import React from 'react';
import PropTypes from 'prop-types';
import { convertToLowerCase } from 'Utils/functions';
import NormalButton from 'Components/shared/NormalButton/NormalButton';

import './styles.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: '' });
  };

  handleLoginUser = () => {
    const { history } = this.props;
    const { email, password } = this.state;
    const emailLowerCase = convertToLowerCase(email);

    this.setState({ error: '' });

    if (email !== '' && password !== '') {
      this.props.loginUser(emailLowerCase, password, history);
    } else {
      this.setState({ error: 'Bitte füllen Sie beide Felder aus' });
    }
  };

  render() {
    const { email, password } = this.state;
    const error = this.state.error || this.props.auth.authenticationError;

    return (
      <div styleName="login-box">
        <div styleName="login-heading">Einloggen</div>
        <input type="text" value={email} name="email" placeholder="Email" onChange={this.handleFieldChange} />
        <input
          type="password"
          value={password}
          name="password"
          placeholder="Passwort"
          onChange={this.handleFieldChange}
        />

        <div styleName="login-error">{error}</div>

        <div styleName="button-container">
          <button styleName="button" onClick={this.handleLoginUser}>
            Anmelden
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  authError: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
};

Login.defaultProps = {
  authError: '',
};

export default Login;
