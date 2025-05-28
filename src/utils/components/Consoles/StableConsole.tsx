import React, { FC, memo, useState } from 'react';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { Flex, FlexItem, Stack, StackItem } from '@patternfly/react-core';

import { AccessConsoles } from './components/AccessConsoles/AccessConsoles';
import SerialConnect from './components/SerialConsole/SerialConnect';
import StableSerialConsole from './components/SerialConsole/StableSerialConsole';
import {
  ConsoleState,
  DESKTOP_VIEWER_CONSOLE_TYPE,
  SERIAL_CONSOLE_TYPE,
  VNC_CONSOLE_TYPE,
} from './components/utils/ConsoleConsts';
import { ConsoleComponentState, ConsoleType } from './components/utils/types';
import HideConsole from './components/vnc-console/HideConsole';
import StableVncConsole from './components/vnc-console/StableVncConsole';
import VncConnect from './components/vnc-console/VncConnect';

import './consoles.scss';

type ConsolesProps = {
  consoleContainerClass?: string;
  isHeadlessMode: boolean;
  isStandAlone?: boolean;
  isVmRunning?: boolean;
  isWindowsVM: boolean;
  path: string;
};

const StableConsole: FC<ConsolesProps> = ({
  consoleContainerClass,
  isHeadlessMode,
  isWindowsVM,
  path,
}) => {
  const { t } = useKubevirtTranslation();
  const [{ actions, state, type }, setState] = useState<ConsoleComponentState>({
    actions: {},
    state: ConsoleState.init,
    type: VNC_CONSOLE_TYPE,
  });

  if (isHeadlessMode) {
    return <div>{t('Console is disabled in headless mode')}</div>;
  }

  const isConnected = state === ConsoleState.connected;
  const showConnect = state === ConsoleState.disconnected || state === ConsoleState.connecting;
  // eslint-disable-next-line no-console
  console.log('Foo.console.render', state, actions, `|${type}|`);
  return (
    <Stack>
      <StackItem className="consoles-actions">
        <Flex className="consoles-actions-inner-flex">
          <FlexItem>{/*TODO user/pass*/}</FlexItem>
          <FlexItem>
            <AccessConsoles
              setType={(newType: ConsoleType) =>
                setState({ actions: {}, state: ConsoleState.disconnected, type: newType })
              }
              actions={actions}
              isWindowsVM={isWindowsVM}
              state={state}
              type={type}
            />
          </FlexItem>
        </Flex>
      </StackItem>
      <StackItem className={consoleContainerClass}>
        {type === VNC_CONSOLE_TYPE && showConnect && (
          <VncConnect connect={actions?.connect} isConnecting={state === ConsoleState.connecting} />
        )}
        {type === VNC_CONSOLE_TYPE && (
          <HideConsole isHidden={!isConnected}>
            <StableVncConsole basePath={path} setState={setState} />
          </HideConsole>
        )}
        {type === SERIAL_CONSOLE_TYPE && showConnect && (
          <SerialConnect
            connect={actions?.connect}
            isConnecting={state === ConsoleState.connecting}
          />
        )}
        {type === SERIAL_CONSOLE_TYPE && (
          <HideConsole isHidden={!isConnected}>
            <StableSerialConsole basePath={path} setState={setState} />
          </HideConsole>
        )}
        {type === DESKTOP_VIEWER_CONSOLE_TYPE && <>{/** TODO DesktopViewer */}</>}
      </StackItem>
    </Stack>
  );
};

export default memo(StableConsole);
