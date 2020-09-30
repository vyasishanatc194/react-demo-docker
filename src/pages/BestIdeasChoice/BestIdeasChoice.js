import React from "react";
import BestIdeasChoice from "Containers/BestIdeasChoice";
import PageTemplate from 'Components/PageTemplate/PageTemplate';
import { loadEtrackerScript } from "Utils/functions";

class CurrentPage extends React.Component {
  componentDidMount = () => {
    loadEtrackerScript(() => {
      console.log("Etracker loaded -> BestIdeasChoice");
    });
  };

  render() {
    return (
      <PageTemplate title="">
        <BestIdeasChoice />
      </PageTemplate>
    );
  }
}

export default CurrentPage;
