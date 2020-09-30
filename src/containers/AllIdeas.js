import { connect } from 'react-redux';
import { setCityAction } from 'Actions/mapActions';
import AllIdeas from 'Components/AllIdeas/AllIdeas';

const mapStateToProps = (state) => ({
  showProConModal: state.procon.showProConModal,
  map: state.map,
});

const mapDispatchToProps = (dispatch) => ({
  setCity: (value) => dispatch(setCityAction(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllIdeas);
