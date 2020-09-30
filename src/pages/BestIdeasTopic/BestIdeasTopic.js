import React from "react";
import BestIdeasTopic from "Containers/BestIdeasTopic";
import PageTemplate from 'Components/PageTemplate/PageTemplate';
import { loadEtrackerScript } from "Utils/functions";

class CurrentPage extends React.Component {
  componentDidMount = () => {
    loadEtrackerScript(() => {
      console.log("Etracker loaded -> BestIdeasTopic");
    });
  };

  render() {
    return (
      <PageTemplate title="">
        <BestIdeasTopic />
      </PageTemplate>
     
    );
  }
}

export default CurrentPage;
