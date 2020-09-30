import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setBestIdeaTheme } from 'Actions/bestIdeasActions';
import BestIdeasChoice from 'Components/BestIdeasChoice/BestIdeasChoice';

const mapStateToProps = state => ({
  bestIdeas: state.bestIdeas,

});

const mapDispatchToProps = dispatch => ({
  handleSetBestIdeaTheme: value => dispatch(setBestIdeaTheme(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BestIdeasChoice));
