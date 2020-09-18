import React from 'react';
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import Scroll from './Scroll';
import Tabs from './Tabs';
import TabsNav from './TabsNav';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';


const Modal = () => {
  const myTabs = [
    {
      title: 'Google',
      id: 0,
      icon: '[some_icon]',
      previewCapture: '[some_preview_capture]'
    },
    {
      title: 'Facebook',
      id: 1,
      icon: '[some_icon2]',
      previewCapture: '[some_preview_capture2]'
    }
  ];

  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition, extensionId, getExtensionId }) => (
        <Draggable
          handle=".modal-handle"
          defaultPosition={{x: windowPosition.x, y: windowPosition.y}}
          position={hasDraggedWindowPosition ? { x: windowPosition.x, y: windowPosition.y } : null}>
          <div id="modal" className="modal-window" style={{ transform: windowPosition, }}>
            <div className="modal-window-inner-border">
              <>
                <div className="modal-body">
                  <div className="modal-handle">
                    <div className="modal-close-button"><X color="#5d6484" size="14" /></div>
                  </div>
                  <TabsNav />
                  { M.Sidenav.init(document.querySelector('#slide-out'), {}) }
                  <div className="modal-content">
                    <h3>{extensionId}</h3>
                    <button onClick={getExtensionId} className="modal-button">Get Extension ID</button>
                    <hr/>
                    <Scroll>
                      <Tabs tabs={ myTabs } />
                    </Scroll>
                  </div>
                </div>
              </>
            </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
