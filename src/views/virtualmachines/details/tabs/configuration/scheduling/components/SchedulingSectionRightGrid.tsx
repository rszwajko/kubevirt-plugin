import React, { FC, useCallback } from 'react';

import VirtualMachineModel from '@kubevirt-ui/kubevirt-api/console/models/VirtualMachineModel';
import { V1VirtualMachine, V1VirtualMachineInstance } from '@kubevirt-ui/kubevirt-api/kubevirt';
import DedicatedResourcesModal from '@kubevirt-utils/components/DedicatedResourcesModal/DedicatedResourcesModal';
import EvictionStrategyModal from '@kubevirt-utils/components/EvictionStrategy/EvictionStrategyModal';
import ShowEvictionStrategy from '@kubevirt-utils/components/EvictionStrategy/ShowEvictionStrategy';
import { useModal } from '@kubevirt-utils/components/ModalProvider/ModalProvider';
import SearchItem from '@kubevirt-utils/components/SearchItem/SearchItem';
import VirtualMachineDescriptionItem from '@kubevirt-utils/components/VirtualMachineDescriptionItem/VirtualMachineDescriptionItem';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { isInstanceTypeVM } from '@kubevirt-utils/resources/instancetype/helper';
import { getEvictionStrategy } from '@kubevirt-utils/resources/vm';
import { k8sUpdate } from '@openshift-console/dynamic-plugin-sdk';
import { DescriptionList, GridItem } from '@patternfly/react-core';

import DedicatedResources from './DedicatedResources';

type SchedulingSectionRightGridProps = {
  canUpdateVM: boolean;
  onUpdateVM?: (updatedVM: V1VirtualMachine) => Promise<V1VirtualMachine>;
  vm: V1VirtualMachine;
  vmi?: V1VirtualMachineInstance;
};

const SchedulingSectionRightGrid: FC<SchedulingSectionRightGridProps> = ({
  canUpdateVM,
  onUpdateVM,
  vm,
  vmi,
}) => {
  const { t } = useKubevirtTranslation();
  const { createModal } = useModal();

  const onSubmit = useCallback(
    (updatedVM: V1VirtualMachine) =>
      onUpdateVM
        ? onUpdateVM(updatedVM)
        : k8sUpdate({
            data: updatedVM,
            model: VirtualMachineModel,
            name: updatedVM?.metadata?.name,
            ns: updatedVM?.metadata?.namespace,
          }),
    [onUpdateVM],
  );

  return (
    <GridItem span={5}>
      <DescriptionList className="pf-v5-c-description-list">
        <VirtualMachineDescriptionItem
          descriptionHeader={
            <SearchItem id="dedicated-resources">{t('Dedicated resources')}</SearchItem>
          }
          messageOnDisabled={t(
            'Can not configure dedicated resources if the VirtualMachine is created from Instance Type',
          )}
          onEditClick={() =>
            createModal(({ isOpen, onClose }) => (
              <DedicatedResourcesModal
                headerText={t('Dedicated resources')}
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                vm={vm}
                vmi={vmi}
              />
            ))
          }
          data-test-id="dedicated-resources"
          descriptionData={<DedicatedResources vm={vm} />}
          isDisabled={isInstanceTypeVM(vm)}
          isEdit={canUpdateVM}
        />
        <VirtualMachineDescriptionItem
          descriptionHeader={
            <SearchItem id="eviction-strategy">{t('Eviction strategy')}</SearchItem>
          }
          onEditClick={() =>
            createModal(({ isOpen, onClose }) => (
              <EvictionStrategyModal
                headerText={t('Eviction strategy')}
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                vm={vm}
                vmi={vmi}
              />
            ))
          }
          data-test-id="eviction-strategy"
          descriptionData={<ShowEvictionStrategy evictionStrategy={getEvictionStrategy(vm)} />}
          isEdit={canUpdateVM}
        />
      </DescriptionList>
    </GridItem>
  );
};

export default SchedulingSectionRightGrid;
