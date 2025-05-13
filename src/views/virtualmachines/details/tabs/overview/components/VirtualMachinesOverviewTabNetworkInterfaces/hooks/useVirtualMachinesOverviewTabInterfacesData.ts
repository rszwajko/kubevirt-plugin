import { V1VirtualMachine, V1VirtualMachineInstance } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { getInterfacesAndNetworks } from '@kubevirt-utils/resources/vm/utils/network/utils';

import { InterfacesData } from '../utils/types';

type UseVirtualMachinesOverviewTabInterfacesData = (
  vm: V1VirtualMachine,
  vmi: V1VirtualMachineInstance,
) => InterfacesData[];

const useVirtualMachinesOverviewTabInterfacesData: UseVirtualMachinesOverviewTabInterfacesData = (
  vm: V1VirtualMachine,
  vmi: V1VirtualMachineInstance,
) =>
  getInterfacesAndNetworks(vm, vmi).map(({ current, desired }) => ({
    iface: desired?.iface,
    ipAddresses: current?.iface?.ipAddresses?.map((ip) => ({
      interfaceName: current?.iface?.interfaceName,
      ip,
    })),
    network: current?.network ?? desired?.network,
  }));

export default useVirtualMachinesOverviewTabInterfacesData;
