import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AuthService from 'Services/AuthService';
import AdminLogin from 'Components/Admin/Login/Login';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (username, password, history) => AuthService.login(username, password, history),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminLogin)
);
