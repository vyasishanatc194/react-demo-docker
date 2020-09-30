import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AdminPage from 'Pages/Admin/Admin';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(AdminPage)
);
