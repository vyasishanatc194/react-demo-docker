import React, { Fragment } from 'react';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import closeIcon from 'Assets/close-icon-grey.svg';
import './styles.less';

Modal.setAppElement('#root');

const PreviewProtocols = ({ handleClose, protocolcontent }) => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const type = windowWidth > 500 ? 'browser' : 'mobile';

  const getModalStyle = () => {
    const height = windowHeight > 920 ? 'inherit' : '100%';

    const content =
      type === 'browser'
        ? {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            height,
            maxHeight: '90vh',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
          }
        : {
            padding: 0,
          };

    return {
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
      },
      content,
    };
  };

  const modalStyle = getModalStyle();

  return (
    <Modal
      isOpen={true}
      onAfterOpen={() => {}}
      onRequestClose={handleClose}
      style={modalStyle}
      contentLabel=""
    >
      <div styleName={`preview-modal ${type}`}>
        <img src={closeIcon} alt="" styleName="close-icon" onClick={handleClose} />
        <Fragment>
          <div styleName="content">
            <ReactMarkdown source={protocolcontent} />
          </div>
        </Fragment>
      </div>
    </Modal>
  );
};
export default PreviewProtocols;
