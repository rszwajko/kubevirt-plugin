import React, { Dispatch, FC, memo, useCallback, useEffect, useRef } from 'react';

import {
  BrowserClipboardProvider,
  ClipboardAddon,
  ClipboardSelectionType,
} from '@xterm/addon-clipboard';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';

import { INSECURE, SECURE } from '../../utils/constants';
import { isConnectionEncrypted } from '../../utils/utils';
import { ConsoleState, SERIAL_CONSOLE_TYPE, WS, WSS } from '../utils/ConsoleConsts';
import { ConsoleComponentState } from '../utils/types';

import { addSocketListener, BlobOnlyAttachAddon } from './BlobOnlyAttachAddon';

type SerialConsoleConnectorProps = {
  basePath: string;
  setState: Dispatch<React.SetStateAction<ConsoleComponentState>>;
};

const createURL = (host: string, path: string): string => {
  let url;

  if (host === 'auto') {
    if (window.location.protocol === 'https:') {
      url = 'wss://';
    } else {
      url = 'ws://';
    }
    url += window.location.host;
  } else {
    url = host;
  }

  if (path) {
    url += path;
  }

  return url;
};

const StableSerialConsole: FC<SerialConsoleConnectorProps> = ({ basePath, setState }) => {
  const xtermRef = useRef<Terminal>(null);
  const terminalRef = useRef(null);
  const setSerialState = useCallback(
    (producer: (state: ConsoleComponentState) => ConsoleComponentState) =>
      setState((oldState) =>
        oldState.type === SERIAL_CONSOLE_TYPE ? producer(oldState) : oldState,
      ),
    [setState],
  );

  const disconnect = useCallback(() => {
    if (!xtermRef.current) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log('Foo:serial:disconnect');
    xtermRef.current.dispose();
    xtermRef.current = null;
    setSerialState((state) => ({
      ...state,
      actions: {},
      state: ConsoleState.disconnected,
    }));
    //setters are stable because they come from useState hook
  }, [setSerialState]);

  // eslint-disable-next-line no-console
  console.log('Foo:serial:render');

  const connect = useCallback(() => {
    setSerialState((state) => ({
      ...state,
      state: ConsoleState.connecting,
    }));
    const websocketOptions = {
      host: `${isConnectionEncrypted() ? WSS : WS}://${window.location.hostname}:${
        window.location.port || (isConnectionEncrypted() ? SECURE : INSECURE)
      }`,
      jsonParse: false,
      path: `/${basePath}/console`,
      reconnect: false,
      subprotocols: ['plain.kubevirt.io'],
    };

    const url = createURL(websocketOptions.host, websocketOptions.path);

    // eslint-disable-next-line no-console
    console.log('Foo:serial:connect', url);
    const fitAddon = new FitAddon();

    const ws = new WebSocket(url, websocketOptions.subprotocols);
    addSocketListener(ws, 'open', () => {
      // eslint-disable-next-line no-console
      console.log('Foo.serial.opened');
      setSerialState((state) => ({
        ...state,
        state: ConsoleState.connected,
      }));
      terminal.open(terminalRef.current);
      terminal.focus();
      fitAddon.fit();
    });
    // eslint-disable-next-line no-console
    addSocketListener(ws, 'close', (arg) => console.log('Foo.serial.close', arg));
    // eslint-disable-next-line no-console
    addSocketListener(ws, 'error', (arg) => console.log('Foo.serial.error', arg));
    // eslint-disable-next-line no-console
    addSocketListener(ws, 'message', (arg) => console.log('Foo.serial.message', arg));

    const terminal = new Terminal({
      cols: 80,
      // cursorBlink: true,
      cursorBlink: false,
      cursorStyle: 'underline',
      // screenReaderMode: true,
      fontFamily: 'operator mono,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
      fontSize: 14,
      rows: 25,
      theme: { background: '#101420' },
    });

    const attachAddon = new BlobOnlyAttachAddon(ws, { bidirectional: true });
    const clipboardAddon = new ClipboardAddon();
    terminal.loadAddon(attachAddon);
    terminal.loadAddon(clipboardAddon);
    terminal.loadAddon(fitAddon);

    xtermRef.current = terminal;
  }, [basePath, setSerialState]);

  useEffect(() => {
    if (!xtermRef.current) {
      connect();
      // eslint-disable-next-line no-console
      console.log('Foo:serial:actions');
      setSerialState((state) => ({
        ...state,
        actions: {
          connect,
          disconnect,
          sendPaste: async () => {
            const clipboardProvider = new BrowserClipboardProvider();
            const text = await clipboardProvider.readText(ClipboardSelectionType.SYSTEM);
            xtermRef.current?.paste(text);
          },
          type: SERIAL_CONSOLE_TYPE,
        },
      }));
    }

    return () => {
      if (xtermRef.current) {
        disconnect();
      }
    };
  }, [disconnect, connect, setSerialState]);

  return (
    <>
      <div className="console-container" ref={terminalRef} role="list" />
    </>
  );
};

export default memo(StableSerialConsole);
