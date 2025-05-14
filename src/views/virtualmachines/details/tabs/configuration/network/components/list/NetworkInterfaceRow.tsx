import React, { FC } from 'react';

import {
  V1Network,
  V1VirtualMachine,
  V1VirtualMachineInstance,
  V1VirtualMachineInstanceNetworkInterface,
} from '@kubevirt-ui/kubevirt-api/kubevirt';
import EphemeralBadge from '@kubevirt-utils/components/badges/EphemeralBadge/EphemeralBadge';
import PendingBadge from '@kubevirt-utils/components/badges/PendingBadge/PendingBadge';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { NO_DATA_DASH } from '@kubevirt-utils/resources/vm/utils/constants';
import { NetworkPresentation } from '@kubevirt-utils/resources/vm/utils/network/constants';
import { getPrintableNetworkInterfaceType } from '@kubevirt-utils/resources/vm/utils/network/selectors';
import { RowProps, TableData } from '@openshift-console/dynamic-plugin-sdk';

import {
  getAggregatedInterfaceState,
  getCurrentInterfaceState,
  getDesiredInterfaceState,
  getNetworkInterfaceStateIcon,
  isInterfaceEphemeral,
} from '../../utils/utils';

import NetworkInterfaceActions from './NetworkInterfaceActions';

export type NetworkInterfaceRowProps = {
  obj: NetworkPresentation;
};

const NetworkInterfaceRow: FC<
  RowProps<
    NetworkPresentation,
    {
      isInterfaceEphemeral: (
        network: V1Network,
        iface: V1VirtualMachineInstanceNetworkInterface,
      ) => undefined | V1VirtualMachineInstanceNetworkInterface;
      isPending: (network: V1Network) => boolean;
      vm: V1VirtualMachine;
      vmi: V1VirtualMachineInstance;
    }
  >
> = ({ activeColumnIDs, obj: { iface, network }, rowData: { isPending, vm, vmi } }) => {
  const { t } = useKubevirtTranslation();
  const ephemeralNic = isInterfaceEphemeral(network, iface);
  const nicName = network?.name;
  const InterfaceStateIcon = getNetworkInterfaceStateIcon(
    getAggregatedInterfaceState(
      getCurrentInterfaceState(vmi, nicName),
      getDesiredInterfaceState(vm, nicName),
    ),
  );

  return (
    <>
      <TableData activeColumnIDs={activeColumnIDs} id="name">
        {nicName || ephemeralNic?.interfaceName || NO_DATA_DASH}
        {isPending(network) && !ephemeralNic && <PendingBadge />}
        {ephemeralNic && <EphemeralBadge />}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="model">
        {iface.model || NO_DATA_DASH}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="network">
        {network?.pod ? t('Pod networking') : network?.multus?.networkName || NO_DATA_DASH}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="state">
        <InterfaceStateIcon />
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="type">
        {getPrintableNetworkInterfaceType(iface)}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="macAddress">
        {iface?.macAddress || ephemeralNic?.mac || NO_DATA_DASH}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} className="pf-v6-c-table__action" id="">
        <NetworkInterfaceActions nicName={nicName} nicPresentation={{ iface, network }} vm={vm} />
      </TableData>
    </>
  );
};

export default NetworkInterfaceRow;
