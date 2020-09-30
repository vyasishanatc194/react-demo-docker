import { connect } from 'react-redux';
import { toggleProConModal, addThreadInfoProConModal } from 'Actions/proconActions';
import {
  changeShowThreads,
  saveSearchedThreads,
  toggleHasSearched,
  updateTotalThreads,
} from 'Actions/searchedActions';
import AllUserIdeas from 'Components/AllUserIdeas/AllUserIdeas';

const mapStateToProps = (state) => ({
  procon: state.procon,
  searched: state.searched,
  map: state.map,
});

const mapDispatchToProps = (dispatch) => ({
  handleToggleProConModal: (value) => dispatch(toggleProConModal(value)),
  handleAddThreadInfoProConModal: (data) => dispatch(addThreadInfoProConModal(data)),
  handleChangeShowThreads: (value) => dispatch(changeShowThreads(value)),
  handleSaveSearchedThreads: (data) => dispatch(saveSearchedThreads(data)),
  handleToggleHasSearched: (value) => dispatch(toggleHasSearched(value)),
  handleUpdateTotalThreads: (value) => dispatch(updateTotalThreads(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUserIdeas);
