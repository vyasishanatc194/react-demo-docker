import React from "react";
import { isBrowser } from "react-device-detect";

import Browser from "./Browser/Browser";
import Mobile from "./Mobile/Mobile";

const windowWidth = window.innerWidth;

const EditProposalModal = ({
      proposal,
      editProposal,
      history,
      updateVisible,
      handleSaveUserThreads,
    }) => 

  {
    return(<div>
      {isBrowser && windowWidth > 900 ?
        <Browser
        proposal={proposal}
        editProposal={editProposal}
        history={history}
        updateVisible={updateVisible}
        handleSaveUserThreads={handleSaveUserThreads}
      />
      :
      <Mobile
        proposal={proposal}
        editProposal={editProposal}
        history={history}
        updateVisible={updateVisible}
        handleSaveUserThreads={handleSaveUserThreads}
      />
    }
  </div>)
};

export default EditProposalModal;
