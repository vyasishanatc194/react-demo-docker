import { connect } from "react-redux";
import { withRouter } from 'react-router';

import { updateVisibleAction } from "Actions/editProposalActions";
import { saveUserThreads } from 'Actions/userActions';
import EditProposalModal from "Components/EditProposalModal/EditProposalModal";

const mapStateToProps = state => ({
  proposal: state.proposal,
  editProposal: state.editProposal,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  handleSaveUserThreads: data => dispatch(saveUserThreads(data)),
  updateVisible: value => dispatch(updateVisibleAction(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProposalModal));
