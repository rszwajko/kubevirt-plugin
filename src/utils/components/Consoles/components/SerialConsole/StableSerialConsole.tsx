import React, { Dispatch, FC, memo, useCallback, useEffect, useRef } from 'react';

import {
  BrowserClipboardProvider,
  ClipboardAddon,
  ClipboardSelectionType,
} from '@xterm/addon-clipboard';
import { FitAddon } from '@xterm/addon-fit';
import { IDisposable, Terminal } from '@xterm/xterm';

import { INSECURE, SECURE } from '../../utils/constants';
import { isConnectionEncrypted } from '../../utils/utils';
import { ConsoleState, SERIAL_CONSOLE_TYPE, WS, WSS } from '../utils/ConsoleConsts';
import { ConsoleComponentState } from '../utils/types';

import { addResizeListener, createURL, removeResizeListenerIfExists } from './utils/serialConsole';
import { addSocketListener, BlobOnlyAttachAddon } from './BlobOnlyAttachAddon';

import '@xterm/xterm/css/xterm.css';

type SerialConsoleConnectorProps = {
  basePath: string;
  setState: Dispatch<React.SetStateAction<ConsoleComponentState>>;
};

const StableSerialConsole: FC<SerialConsoleConnectorProps> = ({ basePath, setState }) => {
  const xtermRef = useRef<Terminal>(null);
  const terminalRef = useRef(null);
  const resizeListenerRef = useRef(null);
  const setSerialState = useCallback(
    (producer: (state: ConsoleComponentState) => Partial<ConsoleComponentState>) =>
      setState((oldState) =>
        oldState.type === SERIAL_CONSOLE_TYPE ? { ...oldState, ...producer(oldState) } : oldState,
      ),
    [setState],
  );

  const disconnect = useCallback(() => {
    removeResizeListenerIfExists(resizeListenerRef.current);
    if (!xtermRef.current) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log('Foo:serial:disconnect');
    const temp = xtermRef.current;
    xtermRef.current = null;
    temp.dispose();
  }, []);

  // eslint-disable-next-line no-console
  console.log('Foo:serial:render');

  const connect = useCallback(() => {
    setSerialState(() => ({
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
    const disposables: IDisposable[] = [
      addSocketListener(ws, 'open', () => {
        // eslint-disable-next-line no-console
        console.log('Foo.serial.opened');
        setSerialState(() => ({
          state: ConsoleState.connected,
        }));
        terminal.open(terminalRef.current);
        terminal.focus();
        removeResizeListenerIfExists(resizeListenerRef.current);
        resizeListenerRef.current = addResizeListener(fitAddon.fit.bind(fitAddon));
        fitAddon.fit();
      }),
      addSocketListener(ws, 'close', (arg) => {
        // eslint-disable-next-line no-console
        console.log('Foo.serial.close', arg);
        disconnect();
      }),
      addSocketListener(ws, 'error', (arg) => {
        // eslint-disable-next-line no-console
        console.log('Foo.serial.error', arg);
        disconnect();
      }),
      // eslint-disable-next-line no-console
      addSocketListener(ws, 'message', (arg) => console.log('Foo.serial.message', arg)),
    ];
    const terminal = new Terminal({
      cursorBlink: true,
      cursorStyle: 'underline',
      fontFamily: 'monospace',
      fontSize: 14,
      screenReaderMode: true,
    });

    const attachAddon = new BlobOnlyAttachAddon(ws, { bidirectional: true });
    const clipboardAddon = new ClipboardAddon();
    terminal.loadAddon(attachAddon);
    terminal.loadAddon(clipboardAddon);
    terminal.loadAddon(fitAddon);
    // cleanup addon
    terminal.loadAddon({
      activate: () => {},
      dispose: () => {
        disposables.forEach((it) => it.dispose());
        setSerialState((prev) => ({
          actions: { connect: prev.actions.connect, disconnect: prev.actions.disconnect },
          state: ConsoleState.disconnected,
        }));
      },
    });

    xtermRef.current = terminal;
  }, [basePath, setSerialState, disconnect]);

  useEffect(() => {
    if (!xtermRef.current) {
      connect();
      // eslint-disable-next-line no-console
      console.log('Foo:serial:actions');
      setSerialState(() => ({
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

    return () => disconnect();
  }, [disconnect, connect, setSerialState]);

  return (
    <>
      <div className="console-container" ref={terminalRef} role="list" />
    </>
  );
};

export default memo(StableSerialConsole);
