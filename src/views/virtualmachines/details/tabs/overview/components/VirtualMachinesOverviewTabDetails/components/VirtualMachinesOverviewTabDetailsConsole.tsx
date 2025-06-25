import React, { FC, memo, useState } from 'react';

import {
  ConsoleState,
  VNC_CONSOLE_TYPE,
} from '@kubevirt-utils/components/Consoles/components/utils/ConsoleConsts';
import { ConsoleComponentState } from '@kubevirt-utils/components/Consoles/components/utils/types';
import HideConsole from '@kubevirt-utils/components/Consoles/components/vnc-console/HideConsole';
import StableVncConsole from '@kubevirt-utils/components/Consoles/components/vnc-console/StableVncConsole';
import { getConsoleBasePath } from '@kubevirt-utils/components/Consoles/utils/utils';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { Bullseye, Button, ButtonVariant } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';

import VirtualMachinesOverviewTabDetailsConsoleConnect from './VirtualMachinesOverviewTabDetailsConsoleConnect';

type VirtualMachinesOverviewTabDetailsConsoleProps = {
  canConnectConsole: boolean;
  isHeadlessMode: boolean;
  isVMRunning: boolean;
  vmName: string;
  vmNamespace: string;
};

const VirtualMachinesOverviewTabDetailsConsole: FC<
  VirtualMachinesOverviewTabDetailsConsoleProps
> = ({ canConnectConsole, isHeadlessMode, isVMRunning, vmName, vmNamespace }) => {
  const { t } = useKubevirtTranslation();
  const [{ actions, state }, setState] = useState<ConsoleComponentState>({
    actions: {},
    state: ConsoleState.init,
    type: VNC_CONSOLE_TYPE,
  });
  const enableConsole = isVMRunning && !isHeadlessMode && canConnectConsole;
  const showConnect =
    !enableConsole || // connect component is also empty state here
    state === ConsoleState.disconnected ||
    state === ConsoleState.connecting;
  // eslint-disable-next-line no-console
  console.log(
    'Foo.overview.render',
    canConnectConsole,
    isHeadlessMode,
    isVMRunning,
    vmName,
    vmNamespace,
    state,
  );
  return (
    <Bullseye className="console-overview">
      <div className="link">
        <Button
          onClick={() =>
            window.open(
              `/k8s/ns/${vmNamespace}/kubevirt.io~v1~VirtualMachine/${vmName}/console/standalone`,
            )
          }
          icon={<ExternalLinkAltIcon className="icon" />}
          iconPosition="end"
          isDisabled={!enableConsole}
          variant={ButtonVariant.link}
        >
          {t('Open web console')}
        </Button>
      </div>
      {enableConsole && (
        <HideConsole isHidden={state !== ConsoleState.connected}>
          <StableVncConsole
            basePath={getConsoleBasePath({ name: vmName, namespace: vmNamespace })}
            setState={setState}
            viewOnly
          />
        </HideConsole>
      )}
      {showConnect && (
        <div className="console-vnc">
          <VirtualMachinesOverviewTabDetailsConsoleConnect
            connect={actions?.connect}
            isConnecting={state === ConsoleState.connecting}
            isDisabled={!enableConsole}
            isHeadlessMode={isHeadlessMode}
          />
        </div>
      )}
    </Bullseye>
  );
};

export default memo(VirtualMachinesOverviewTabDetailsConsole);
