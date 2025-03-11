import React from 'react';

import { V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';
import {
  runningTourSignal,
  tourGuideVM,
} from '@kubevirt-utils/components/GuidedTour/utils/constants';
import HorizontalNavbar from '@kubevirt-utils/components/HorizontalNavbar/HorizontalNavbar';
import { SidebarEditorProvider } from '@kubevirt-utils/components/SidebarEditor/SidebarEditorContext';
import { isInstanceTypeVM } from '@kubevirt-utils/resources/instancetype/helper';
import useInstanceTypeExpandSpec from '@kubevirt-utils/resources/vm/hooks/useInstanceTypeExpandSpec';
import { isEmpty } from '@kubevirt-utils/utils/utils';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';

import { useVirtualMachineTabs } from './hooks/useVirtualMachineTabs';
import VirtualMachineNavPageTitle from './VirtualMachineNavPageTitle';

import './virtual-machine-page.scss';

export type VirtualMachineDetailsPageProps = {
  kind: string;
  name: string;
  namespace: string;
};

const VirtualMachineNavPage: React.FC<VirtualMachineDetailsPageProps> = ({
  kind,
  name,
  namespace,
}) => {
  const [vm, isLoaded, loadError] = useK8sWatchResource<V1VirtualMachine>(
    runningTourSignal.value
      ? null
      : {
          kind,
          name,
          namespace,
        },
  );

  const baseVm = runningTourSignal.value ? tourGuideVM : vm;
  const [instanceTypeExpandedSpec, expandedSpecLoading] = useInstanceTypeExpandSpec(baseVm);
  const vmToShow = isInstanceTypeVM(baseVm) ? instanceTypeExpandedSpec : baseVm;

  const pages = useVirtualMachineTabs();

  return (
    <SidebarEditorProvider>
      <VirtualMachineNavPageTitle
        isLoaded={isLoaded || !isEmpty(loadError)}
        name={name}
        vm={vmToShow}
      />
      <div className="VirtualMachineNavPage--tabs__main">
        <HorizontalNavbar
          error={loadError}
          loaded={isLoaded && !expandedSpecLoading}
          pages={pages}
          vm={vmToShow}
        />
      </div>
    </SidebarEditorProvider>
  );
};

export default VirtualMachineNavPage;
