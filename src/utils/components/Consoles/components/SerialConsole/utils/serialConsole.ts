import { RefObject } from 'react';
import { debounce } from 'lodash';

import { XTermProps } from '../Xterm/utils/Xterm';

export type WebSocket = {
  destroy(): void;
  getState(): string;
  send(data: any): void;
};

export type SerialConsoleProps = XTermProps & {
  /** A reference object to attach to the SerialConsole. */
  innerRef?: RefObject<any>;
  /** Connection status; a value from [''connected'; 'disconnected'; 'loading']. Default is 'loading' for a not matching value. */
  /** Initiate connection to backend. In other words, the calling components manages connection state. */
  onConnect: () => void;
  /** Terminal produced data, like key-press */
  onData: (e: string) => void;
  /** Close connection to backend */
  onDisconnect: () => void;
  /** Terminal title has been changed */
  onTitleChanged?: () => void;
  status?: string;
};

// utility from https://github.com/openshift/console/blob/b77f40a19e14735b257f80f00290ba49994308ca/frontend/packages/console-dynamic-plugin-sdk/src/utils/k8s/ws-factory.ts#L2
export const createURL = (host: string, path: string): string => {
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

export const addResizeListener = (callback) => {
  const resizeListener = debounce(callback, 100);
  window.addEventListener('resize', resizeListener);
  return resizeListener;
};

export const removeResizeListenerIfExists = (callback) => {
  if (!callback) {
    return;
  }
  window.removeEventListener('resize', callback);
};
