/* eslint-disable no-console */
import React, { Dispatch, FC, memo, useCallback, useEffect, useRef } from 'react';

import RFBCreate from '@novnc/novnc/lib/rfb';
import { initLogging } from '@novnc/novnc/lib/util/logging';

import { INSECURE, SECURE } from '../../utils/constants';
import { isConnectionEncrypted } from '../../utils/utils';
import { AccessConsolesActions } from '../AccessConsoles/utils/accessConsoles';
import { ConsoleState, VNC_CONSOLE_TYPE, WS, WSS } from '../utils/ConsoleConsts';

import { sendCtrlAlt1, sendCtrlAlt2, sendPasteCMD } from './actions';

import './vnc-console.scss';

const { connected, connecting, disconnected } = ConsoleState;

export type StableVncConsoleProps = {
  basePath: string;
  scaleViewport?: boolean;
  setActions: Dispatch<React.SetStateAction<AccessConsolesActions>>;
  setState: (state: ConsoleState) => void;
  viewOnly?: boolean;
};

export const StableVncConsole: FC<StableVncConsoleProps> = ({
  basePath,
  scaleViewport = true,
  setActions,
  setState,
  viewOnly = false,
}) => {
  const rfbRef = useRef<RFBCreate>(null);
  const staticRenderLocationRef = useRef(null);
  const sessionRef = useRef(0);

  const postDisconnectCleanup = useCallback(() => {
    rfbRef.current = null;
    setState(disconnected);
    setActions((actions) =>
      actions.type === VNC_CONSOLE_TYPE
        ? { connect: actions.connect, disconnect: actions.disconnect }
        : actions,
    );
    //setters are stable because they come from useState hook
  }, [setState, setActions]);

  const disconnect = useCallback(() => {
    if (!rfbRef.current) {
      return;
    }
    rfbRef.current.disconnect();
    postDisconnectCleanup();
  }, [postDisconnectCleanup]);

  // eslint-disable-next-line no-console
  console.log('Foo:render');

  const connect = useCallback(() => {
    setState(connecting);
    const sessionID = ++sessionRef.current;

    // eslint-disable-next-line no-console
    console.log('Foo:Connect', sessionID, sessionRef.current);

    const isEncrypted = isConnectionEncrypted();
    const path = `${basePath}/vnc`;
    const port = window.location.port || (isEncrypted ? SECURE : INSECURE);
    const url = `${isEncrypted ? WSS : WS}://${window.location.hostname}:${port}/${path}`;
    const rfbInst = new RFBCreate(staticRenderLocationRef.current, url);
    rfbInst.addEventListener(
      'connect',
      () => sessionID === sessionRef.current && setState(connected),
    );
    rfbInst.addEventListener('disconnect', () => {
      // prevent disconnect for old session to interact with current connection attempt

      // eslint-disable-next-line no-console
      console.log('Foo:Event:disconnect', sessionID, sessionRef.current);

      sessionID === sessionRef.current && postDisconnectCleanup();
    });
    rfbInst.viewOnly = viewOnly;
    rfbInst.scaleViewport = scaleViewport;

    rfbRef.current = rfbInst;

    setActions((actions) => ({
      ...actions,
      sendCtrlAlt1: sendCtrlAlt1.bind(rfbInst),
      sendCtrlAlt2: sendCtrlAlt2.bind(rfbInst),
      sendCtrlAltDel: rfbInst.sendCtrlAltDel?.bind(rfbInst),
      sendPaste: sendPasteCMD.bind(rfbInst),
      type: VNC_CONSOLE_TYPE,
    }));
  }, [basePath, viewOnly, scaleViewport, setState, setActions, postDisconnectCleanup]);

  // auto-connect only on first load
  useEffect(() => {
    if (!rfbRef.current) {
      initLogging('debug');
      connect();
      setActions((actions) => ({ ...actions, connect, disconnect }));
    }
    return () => {
      if (rfbRef.current) {
        disconnect();
      }
    };
  });

  return <div className={'vnc-container'} ref={staticRenderLocationRef} />;
};

export default memo(StableVncConsole);
