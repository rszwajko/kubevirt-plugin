import React, { FC, useMemo } from 'react';

import { V1VirtualMachine, V1VirtualMachineInstance } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { getAutoAttachPodInterface } from '@kubevirt-utils/resources/vm';
import { NetworkPresentation } from '@kubevirt-utils/resources/vm/utils/network/constants';
import { getPrintableNetworkInterfaceType } from '@kubevirt-utils/resources/vm/utils/network/selectors';
import { getInterfacesAndNetworks } from '@kubevirt-utils/resources/vm/utils/network/utils';
import { isEmpty } from '@kubevirt-utils/utils/utils';
import {
  ListPageFilter,
  useListPageFilter,
  VirtualizedTable,
} from '@openshift-console/dynamic-plugin-sdk';

import useNetworkColumns from '../../hooks/useNetworkColumns';
import useNetworkRowFilters from '../../hooks/useNetworkRowFilters';
import { isInterfaceEphemeral, isPendingHotPlugNIC, isPendingRemoval } from '../../utils/utils';

import AutoAttachedNetworkEmptyState from './AutoAttachedNetworkEmptyState';
import NetworkInterfaceRow from './NetworkInterfaceRow';

type NetworkInterfaceTableProps = {
  vm: V1VirtualMachine;
  vmi: V1VirtualMachineInstance;
};

export type SimpeNicPresentation = {
  desired?: NetworkPresentation;
  desiredLinkState?: string;
  iface: { macAddress?: string; model?: string };
  interfaceName?: string;
  isInterfaceEphemeral: boolean;
  isPending: boolean;
  linkState?: string;
  network: { multus?: { networkName: string }; name: string };
  type: string;
};

const NetworkInterfaceList: FC<NetworkInterfaceTableProps> = ({ vm, vmi }) => {
  const filters = useNetworkRowFilters();

  const networkInterfacesData: SimpeNicPresentation[] = useMemo(
    () =>
      getInterfacesAndNetworks(vm, vmi)
        .map(({ current, desired }) => ({
          desired,
          desiredLinkState: desired?.iface?.state,
          iface: {
            macAddress:
              current?.status?.mac ?? current?.iface?.macAddress ?? desired?.iface?.macAddress,
            model: current?.iface?.model ?? desired?.iface?.model,
          },
          interfaceName: current?.status?.interfaceName,
          isInterfaceEphemeral: !!isInterfaceEphemeral(current?.network, current?.status),
          isPending:
            isPendingHotPlugNIC(vm, vmi, current?.network?.name) ||
            isPendingRemoval(vm, vmi, current?.network?.name),
          linkState: (current?.status as any)?.linkState,
          network: {
            multus: current?.network?.multus ?? desired?.network?.multus,
            name: current?.network?.name ?? desired?.network?.name,
            pod: current?.network?.pod ?? desired?.network?.pod,
          },
          type: getPrintableNetworkInterfaceType(current?.iface ?? desired?.iface),
        }))
        .map((obj) => ({ ...obj, metadata: { name: obj.network?.name } })),
    [vm, vmi],
  );

  const [data, filteredData, onFilterChange] = useListPageFilter(networkInterfacesData, filters);

  const columns = useNetworkColumns();

  const autoattachPodInterface = getAutoAttachPodInterface(vm) !== false;

  return (
    <>
      <ListPageFilter data={data} loaded onFilterChange={onFilterChange} rowFilters={filters} />
      <VirtualizedTable
        columns={columns}
        data={filteredData}
        EmptyMsg={() => <AutoAttachedNetworkEmptyState isAutoAttached={autoattachPodInterface} />}
        loaded={!isEmpty(vm)}
        loadError={false}
        Row={NetworkInterfaceRow}
        rowData={{ vm, vmi }}
        unfilteredData={data}
      />
    </>
  );
};

export default NetworkInterfaceList;
