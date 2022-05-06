import {
  modelToGroupVersionKind,
  TemplateModel,
  V1Template,
} from '@kubevirt-ui/kubevirt-api/console';
import { V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';

import { getCPUcores, getMemorySize } from '../utils/CpuMemoryUtils';

type UseTemplateDefaultCpuMemory = (vm: V1VirtualMachine) => {
  data: {
    defaultMemory: { size: number; unit: string };
    defaultCpu: number;
  };
  loaded: boolean;
  error: any;
};

const useTemplateDefaultCpuMemory: UseTemplateDefaultCpuMemory = (vm) => {
  const templateName = vm?.metadata?.labels?.['vm.kubevirt.io/template'];
  const templateNamespace = vm?.metadata?.labels?.['vm.kubevirt.io/template.namespace'];

  const [template, templateLoaded, templateError] = useK8sWatchResource<V1Template>({
    groupVersionKind: modelToGroupVersionKind(TemplateModel),
    name: templateName,
    namespace: templateNamespace,
    isList: false,
  });

  if (!templateName || !templateNamespace) {
    return {
      data: null,
      loaded: true,
      error: null,
    };
  }

  const defaultMemory = getMemorySize(
    template?.objects?.[0]?.spec?.template?.spec?.domain?.resources?.requests?.memory,
  );
  const defaultCpu = getCPUcores(template?.objects?.[0]);

  return {
    data: {
      defaultMemory,
      defaultCpu,
    },
    loaded: templateLoaded,
    error: templateError,
  };
};

export default useTemplateDefaultCpuMemory;
