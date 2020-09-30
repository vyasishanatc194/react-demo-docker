import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setBestIdeaTheme,setVotingUser,setVotingCity} from 'Actions/bestIdeasActions';
import BestIdeasTopic from 'Components/BestIdeasTopic/BestIdeasTopic';

const mapStateToProps = state => ({
  bestIdeas: state.bestIdeas,
});

const mapDispatchToProps = dispatch => ({
  handleSetBestIdeaTheme: values => dispatch(setBestIdeaTheme(values)),
  handleSetVotingUser : values => dispatch(setVotingUser(values)),
  handleSetVotingCity:(value)=>dispatch(setVotingCity(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BestIdeasTopic));
