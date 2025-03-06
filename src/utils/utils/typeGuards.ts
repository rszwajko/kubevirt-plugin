import { VirtualMachineModel } from 'src/views/dashboard-extensions/utils';

import { V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';

export const isVM = (source: unknown): source is V1VirtualMachine =>
  (source as V1VirtualMachine)?.kind === VirtualMachineModel.kind;
