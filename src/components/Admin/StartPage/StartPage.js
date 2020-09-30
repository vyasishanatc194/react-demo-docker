import React from 'react';
import Admin from './Admin/Admin';
import Ambassador from './Ambassador/Ambassador';
import './styles.less';

const StartPage = (props) => {
  const { name, is_admin, is_ambassador } = props.user.user_info;
  const userRole = is_admin ? 'Administrator' : 'Ideenbotschafter';

  return (
    <div styleName="container">
      <h2>{`${userRole} Start-Seite`}</h2>
      <br />
      <h3>
        <b>{`Herzlich willkommen, ${name}!`}</b>
      </h3>

      <p>
        Über das blaue Menü (oben rechts) können Sie bequem zwischen den Seiten navigieren, sowie sich
        ausloggen.
      </p>

      <p>Denken Sie aus Sicherheitsgründen daran, sich abzumelden, wenn Sie fertig sind.</p>

      {is_admin && <Admin />}
      {is_ambassador && <Ambassador />}
    </div>
  );
};

export default StartPage;
