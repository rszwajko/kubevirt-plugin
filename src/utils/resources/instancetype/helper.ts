import VirtualMachineClusterInstancetypeModel from '@kubevirt-ui/kubevirt-api/console/models/VirtualMachineClusterInstancetypeModel';
import VirtualMachineInstancetypeModel from '@kubevirt-ui/kubevirt-api/console/models/VirtualMachineInstancetypeModel';
import {
  V1InstancetypeMatcher,
  V1VirtualMachine,
  V1VirtualMachineInstance,
} from '@kubevirt-ui/kubevirt-api/kubevirt';
import { ensurePath, isEmpty } from '@kubevirt-utils/utils/utils';
import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';

import { getAnnotation, getNamespace } from '../shared';

import {
  CLUSTER_INSTANCE_TYPE_NAME_ANNOTATION,
  CLUSTER_PREFERENCE_NAME_ANNOTATION,
  NAMESPACED_INSTANCE_TYPE_NAME_ANNOTATION,
  NAMESPACED_PREFERENCE_NAME_ANNOTATION,
} from './constants';

export const getInstanceTypeModelFromMatcher = (
  instanceTypeMatcher: V1InstancetypeMatcher,
): K8sModel =>
  instanceTypeMatcher.kind.includes('cluster')
    ? VirtualMachineClusterInstancetypeModel
    : VirtualMachineInstancetypeModel;

export const isInstanceTypeVM = (vm: V1VirtualMachine): boolean =>
  !isEmpty(vm?.spec?.instancetype) ||
  !isEmpty(vm?.spec?.preference) ||
  !!getInstanceTypeNameFromAnnotation(vm) ||
  !!getPreferenceNameFromAnnotation(vm);

export const getInstanceTypeNameFromAnnotation = (
  vm: V1VirtualMachine | V1VirtualMachineInstance,
) =>
  getAnnotation(vm, NAMESPACED_INSTANCE_TYPE_NAME_ANNOTATION) ??
  getAnnotation(vm, CLUSTER_INSTANCE_TYPE_NAME_ANNOTATION);

export const getPreferenceNameFromAnnotation = (vm: V1VirtualMachine | V1VirtualMachineInstance) =>
  getAnnotation(vm, NAMESPACED_PREFERENCE_NAME_ANNOTATION) ??
  getAnnotation(vm, CLUSTER_PREFERENCE_NAME_ANNOTATION);

export const setPreferenceNameInAnnotation = (
  vm: V1VirtualMachine | V1VirtualMachineInstance,
  preferenceName: string,
) => {
  setAnnotation(
    vm,
    getNamespace(vm) ? NAMESPACED_PREFERENCE_NAME_ANNOTATION : CLUSTER_PREFERENCE_NAME_ANNOTATION,
    preferenceName,
  );
};

export const setInstanceTypeNameInAnnotation = (
  vm: V1VirtualMachine | V1VirtualMachineInstance,
  instanceTypeName: string,
) => {
  setAnnotation(
    vm,
    getNamespace(vm)
      ? NAMESPACED_INSTANCE_TYPE_NAME_ANNOTATION
      : CLUSTER_INSTANCE_TYPE_NAME_ANNOTATION,
    instanceTypeName,
  );
};

export const setAnnotation = (
  vm: V1VirtualMachine | V1VirtualMachineInstance,
  key: string,
  value: string,
) => {
  ensurePath(vm, 'metadata.annotations');
  vm.metadata.annotations[key] = value;
};
