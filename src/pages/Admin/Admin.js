import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AuthService from 'Services/AuthService';
import { dispatch } from 'Services/Redux';
import { saveUserInfo } from 'Actions/userActions';

import PageTemplate from 'Components/PageTemplate/PageTemplate';
import AdminLogin from 'Containers/AdminLogin';
import AdminStartPage from 'Containers/AdminStartPage';
import AdminIdeasAnswers from 'Containers/AdminIdeasAnswers';
import AddProtocols from 'Components/Admin/AddProtocols/AddProtocols';
import AddParticipant from 'Components/Admin/AddParticipant/AddParticipant';

const LoginPage = () => (
  <PageTemplate title="">
    <AdminLogin />
  </PageTemplate>
);

const StartPage = () => (
  <PageTemplate title="">
    <AdminStartPage />
  </PageTemplate>
);

const IdeasAnswersPage = () => (
  <PageTemplate title="">
    <AdminIdeasAnswers />
  </PageTemplate>
);

const AddProtokollPage = () => (
  <PageTemplate title="">
    <AddProtocols />
  </PageTemplate>
);

const AddParticipantPage = () => (
  <PageTemplate title="">
    <AddParticipant />
  </PageTemplate>
);

class AdminPage extends React.Component {
  authenticationCheck = () => {
    const { history, location } = this.props;
    const token = localStorage.getItem('jwt');

    if (!token) {
      history.replace({
        pathname: '/admin/login',
        state: { from: location },
      });
    }
  };

  componentDidMount() {
    AuthService.checkUserAuth().then((res) => {
      this.authenticationCheck();
    });
  }

  render() {
    return (
      <Switch>
        <Route path="/admin/login" component={LoginPage} />
        <Route path="/admin/startseite" component={StartPage} />
        <Route path="/admin/seite" component={IdeasAnswersPage} />
        <Route path="/admin/protokolle" component={AddProtokollPage} />
        <Route path="/admin/teilnehmer" component={AddParticipantPage} />
        <Route render={() => <Redirect to="/admin/startseite" />} />
      </Switch>
    );
  }
}

export default AdminPage;
