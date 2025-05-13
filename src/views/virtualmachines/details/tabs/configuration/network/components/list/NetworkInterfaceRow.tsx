import React, { FC } from 'react';

import { V1VirtualMachine, V1VirtualMachineInstance } from '@kubevirt-ui/kubevirt-api/kubevirt';
import EphemeralBadge from '@kubevirt-utils/components/badges/EphemeralBadge/EphemeralBadge';
import PendingBadge from '@kubevirt-utils/components/badges/PendingBadge/PendingBadge';
import { toNetworkNameLabel } from '@kubevirt-utils/constants/network-columns';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { NO_DATA_DASH } from '@kubevirt-utils/resources/vm/utils/constants';
import { RowProps, TableData } from '@openshift-console/dynamic-plugin-sdk';

import {
  getCurrentInterfaceState,
  getDesiredInterfaceState,
  getNetworkInterfaceStateIcon,
} from '../../utils/utils';

import NetworkInterfaceActions from './NetworkInterfaceActions';
import { SimpeNicPresentation } from './NetworkInterfaceList';

export type NetworkInterfaceRowProps = {
  obj: SimpeNicPresentation;
};

const NetworkInterfaceRow: FC<
  RowProps<
    SimpeNicPresentation,
    {
      vm: V1VirtualMachine;
      vmi: V1VirtualMachineInstance;
    }
  >
> = ({
  activeColumnIDs,
  obj: { desired, iface, interfaceName, isInterfaceEphemeral, isPending, linkState, network, type },
  rowData: { vm },
}) => {
  const { t } = useKubevirtTranslation();
  const nicName = network?.name;
  const LinkStateIcon = getNetworkInterfaceStateIcon(getCurrentInterfaceState(linkState));
  const DesiredLinkStateIcon = getNetworkInterfaceStateIcon(getDesiredInterfaceState(vm, nicName));

  return (
    <>
      <TableData activeColumnIDs={activeColumnIDs} id="name">
        {nicName || NO_DATA_DASH}
        {isPending && !isInterfaceEphemeral && <PendingBadge />}
        {isInterfaceEphemeral && <EphemeralBadge />}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="interfaceName">
        {interfaceName || NO_DATA_DASH}
        {isInterfaceEphemeral && <EphemeralBadge />}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="model">
        {iface?.model || NO_DATA_DASH}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="network">
        {toNetworkNameLabel(t, { network }) || NO_DATA_DASH}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="link_state">
        <LinkStateIcon />
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="desired_link_state">
        <DesiredLinkStateIcon />
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="type">
        {type}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} id="macAddress">
        {iface?.macAddress || NO_DATA_DASH}
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} className="pf-v6-c-table__action" id="">
        <NetworkInterfaceActions nicName={nicName} nicPresentation={desired} vm={vm} />
      </TableData>
    </>
  );
};

export default NetworkInterfaceRow;
