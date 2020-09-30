import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AdminStartPage from 'Components/Admin/StartPage/StartPage';

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(AdminStartPage)
);
