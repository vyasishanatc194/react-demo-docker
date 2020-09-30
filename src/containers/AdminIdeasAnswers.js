import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import IdeasAnswers from 'Components/Admin/IdeasAnswers/IdeasAnswers';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(IdeasAnswers)
);
