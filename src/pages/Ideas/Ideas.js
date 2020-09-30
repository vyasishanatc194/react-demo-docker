import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import PageTemplate from 'Components/PageTemplate/PageTemplate';
import AllIdeas from 'Containers/AllIdeas';
import IdeasPubTalks from 'Components/IdeasPubTalks/IdeasPubTalks';
import IdeasPubTalksResults from 'Components/IdeasPubTalksResults/IdeasPubTalksResults';
import IdeasIdeaWorkshops from 'Components/IdeasIdeaWorkshops/IdeasIdeaWorkshops';
import IdeasWayOfIdeas from 'Components/IdeasWayOfIdeas/IdeasWayOfIdeas';

const AllIdeasPage = () => (
  <PageTemplate title="Ideen">
    <AllIdeas />
  </PageTemplate>
);

const IdeasPubTalksPage = () => (
  <PageTemplate title="Protokolle">
    <IdeasPubTalks />
  </PageTemplate>
);

const IdeasPubTalksResultsPage = () => (
  <PageTemplate title="Protokoll">
    <IdeasPubTalksResults />
  </PageTemplate>
);

const IdeasIdeaWorkshopsPage = () => (
  <PageTemplate title="Werkstattprotokolle">
    <IdeasIdeaWorkshops />
  </PageTemplate>
);

const IdeasWayOfIdeasPage = () => (
  <PageTemplate title="Weg der Ideen">
    <IdeasWayOfIdeas />
  </PageTemplate>
);

const IdeasPage = () => (
  <Switch>
    <Route exact path="/ideen/alle" component={AllIdeasPage} />
    <Route exact path="/ideen/protokolle" component={IdeasPubTalksPage} />
    <Route
      exact
      path="/ideen/protokoll/:id"
      render={(props) => {
        return <IdeasPubTalksResultsPage {...props} />;
      }}
    />
    <Route exact path="/ideen/ideenwerkstaetten" component={IdeasIdeaWorkshopsPage} />
    <Route render={() => <Redirect to="/" />} />
  </Switch>
);

export default IdeasPage;
