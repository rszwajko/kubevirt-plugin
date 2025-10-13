import { useEffect, useState } from 'react';

import { kubevirtConsole } from '@kubevirt-utils/utils/utils';
import {
  AccessReviewResourceAttributes,
  Action,
  GroupedMenuOption,
  K8sVerb,
  MenuOption,
  SelfSubjectAccessReviewKind,
} from '@openshift-console/dynamic-plugin-sdk';
import { ImpersonateKind } from '@openshift-console/dynamic-plugin-sdk/lib/app/redux-types';
import { FleetAccessReviewResourceAttributes } from '@stolostron/multicluster-sdk';
import { checkAccess as fleetCheckAccess } from '@stolostron/multicluster-sdk/lib/internal/checkAccess';

import { ActionDropdownItemType } from '../ActionsDropdown/constants';

import { CheckAccess } from './LazyActionMenu';

export const checkAccessForFleet = (
  accessReview: AccessReviewResourceAttributes | FleetAccessReviewResourceAttributes,
  _impersonate: ImpersonateKind,
) => {
  const {
    cluster = '',
    group = '',
    name = '',
    namespace = '',
    resource = '',
    subresource = '',
    verb = '' as K8sVerb,
  } = accessReview as FleetAccessReviewResourceAttributes;
  return fleetCheckAccess(group, resource, subresource, verb, name, namespace, cluster);
};

export const useAccessReview = (
  resourceAttributes: AccessReviewResourceAttributes,
  checkAccess: CheckAccess,
  impersonate?: ImpersonateKind,
): [boolean, boolean] => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setAllowed] = useState(false);
  // Destructure the attributes to pass them as dependencies to `useEffect`,
  // which doesn't do deep comparison of object dependencies.
  const {
    cluster = '',
    group = '',
    name = '',
    namespace = '',
    resource = '',
    subresource = '',
    verb = '' as K8sVerb,
  } = resourceAttributes as FleetAccessReviewResourceAttributes;
  const skipCheck = !group && !resource;
  useEffect(() => {
    if (skipCheck) {
      setAllowed(false);
      setLoading(false);
      return;
    }
    checkAccess(
      {
        cluster,
        group,
        name,
        namespace,
        resource,
        subresource,
        verb,
      } as AccessReviewResourceAttributes,
      impersonate,
    )
      .then((result: SelfSubjectAccessReviewKind) => {
        setAllowed(result.status.allowed);
        setLoading(false);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        kubevirtConsole.warn('SelfSubjectAccessReview failed', e);
        // Default to enabling the action if the access review fails so that we
        // don't incorrectly block users from actions they can perform. The server
        // still enforces access control.
        setAllowed(true);
        setLoading(false);
      });
  }, [
    setLoading,
    setAllowed,
    group,
    resource,
    subresource,
    verb,
    name,
    namespace,
    impersonate,
    skipCheck,
    checkAccess,
    cluster,
  ]);

  return [isAllowed, loading];
};

export const createLocalMenuOptions = (actions: ActionDropdownItemType[]): MenuOption[] =>
  actions.map((action) =>
    action.options?.length > 0
      ? { ...action, children: createLocalMenuOptions(action.options), submenu: true }
      : action,
  );

export const mergeOptions = (options: MenuOption[]): MenuOption[] =>
  Object.values(
    options.reduce(
      (acc, opt) =>
        acc[opt.id] ? { ...acc, [opt.id]: [...acc[opt.id], opt] } : { ...acc, [opt.id]: [opt] },
      {} as { [key: string]: MenuOption[] },
    ),
  ).map(
    (duplicates: MenuOption[]): MenuOption => ({
      // grouping is stable, take the first defined
      ...duplicates[0],
      children: mergeOptions(
        duplicates.flatMap((opt) => (opt as GroupedMenuOption)?.children ?? []),
      ),
    }),
  );

export const isAction = (obj: unknown): obj is Action => !!(obj as Action).cta;

export const flattenToAccessReview = (options: MenuOption[]): AccessReviewResourceAttributes[] =>
  options
    .flatMap((opt) =>
      isAction(opt) ? [opt.accessReview] : flattenToAccessReview(opt.children ?? []),
    )
    .filter(Boolean);
