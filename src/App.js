import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'Services/Redux';

import Main from 'Pages/Main/Main';
import Schedule from 'Pages/Schedule/Schedule';
import Ideas from 'Pages/Ideas/Ideas';
import AboutProject from 'Pages/AboutProject/AboutProject';
import Contact from 'Pages/Contact/Contact';
import Impressum from 'Pages/Impressum/Impressum';
import Datenschutz from 'Pages/Datenschutz/Datenschutz';
import BestIdeasTopic from 'Pages/BestIdeasTopic/BestIdeasTopic';
import BestIdeasChoice from 'Pages/BestIdeasChoice/BestIdeasChoice';
import Subscription from 'Pages/Subscription/Subscription';
import Unsubscription from 'Pages/Unsubscription/Unsubscription';
import SubscriptionConfirmation from 'Pages/SubscriptionConfirmation/SubscriptionConfirmation';
import SubscriptionEmailNotice from 'Pages/SubscriptionEmailNotice/SubscriptionEmailNotice';
import Admin from 'Containers/AdminPage';
import Offline from 'Pages/Offline/Offline';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/termine" component={Schedule} />
        <Route path="/ideen" component={Ideas} />
        <Route path="/ueber-das-projekt" component={AboutProject} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/kontakt" component={Contact} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/beste-ideen-thema" component={BestIdeasTopic} />
        <Route path="/voting_trial/:cityname" component ={BestIdeasTopic}/>
        <Route path="/beste-ideen-wahl" component={BestIdeasChoice} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/unsubscription" component={Unsubscription} />
        <Route path="/bestaetigung" component={SubscriptionConfirmation} />
        <Route path="/bestaetigung-email" component={SubscriptionEmailNotice} />
        <Route path="/admin" component={Admin} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
