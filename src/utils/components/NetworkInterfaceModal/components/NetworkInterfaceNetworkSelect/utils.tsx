import React, { FC, ReactNode } from 'react';
import { TFunction } from 'react-i18next';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { NamespaceModel } from '@kubevirt-utils/models';
import { interfaceTypesProxy } from '@kubevirt-utils/resources/vm/utils/network/constants';
import { getDNS1123LabelError } from '@kubevirt-utils/utils/validation';
import { getGroupVersionKindForModel, ResourceLink } from '@openshift-console/dynamic-plugin-sdk';
import { HelperText, HelperTextItem, Label, SelectOptionProps } from '@patternfly/react-core';
import { InfoIcon } from '@patternfly/react-icons';

import { GLOBAL_NAD_NAMESPACES } from '../hooks/useFetchNADs';

import { NetworkSelectTypeaheadOptionProps } from './NetworkInterfaceNetworkSelect';

export const createNewNetworkOption = (value): NetworkSelectTypeaheadOptionProps => ({
  optionProps: {
    children: (
      <>
        {value}
        <Label isCompact>{interfaceTypesProxy.bridge} Binding</Label>
      </>
    ),
  },
  type: interfaceTypesProxy.bridge,
  value,
});

export const getCreateNetworkOption =
  (validators: ((name: string) => ReactNode)[]) =>
  (input: string, t: TFunction): SelectOptionProps => {
    if (!input || input.split('/').length !== 2 || input.split('/').some((part) => !part)) {
      return {
        children: (
          <HelperText>
            <HelperTextItem icon={<InfoIcon />} variant="indeterminate">
              {t('Type namespace/network-name to use a different network')}
            </HelperTextItem>
          </HelperText>
        ),
        isDisabled: true,
      };
    }

    const getErrorMsg =
      // both namespace and NAD name are DNS labels
      input
        .split('/')
        .map((part) => getDNS1123LabelError(part))
        .find((getMsg) => getMsg);

    if (getErrorMsg) {
      return {
        children: (
          <HelperText>
            <HelperTextItem variant="error">{getErrorMsg(t)}</HelperTextItem>
          </HelperText>
        ),
        isDisabled: true,
      };
    }

    const [firstError] = validators.map((getMore) => getMore(input)).filter(Boolean);
    if (firstError) {
      return {
        children: (
          <HelperText>
            <HelperTextItem variant="error">{firstError}</HelperTextItem>
          </HelperText>
        ),
        isDisabled: true,
      };
    }

    return {
      children: (
        <>
          {t('Use "{{inputValue}}"', { inputValue: input })}{' '}
          <Label isCompact>{interfaceTypesProxy.bridge} Binding</Label>
        </>
      ),
    };
  };

const InvalidNADNamespace: FC<{ allowedNamespaces: string[] }> = ({ allowedNamespaces }) => {
  const { t } = useKubevirtTranslation();
  return (
    <>
      <p>{t('NetworkAttachmentDefinition namespace should be one of:')}</p>
      {allowedNamespaces.map((ns) => (
        <ResourceLink
          groupVersionKind={getGroupVersionKindForModel(NamespaceModel)}
          key={ns}
          name={ns}
          namespace={null}
        />
      ))}
    </>
  );
};

export const validateNADNamespace = (name: string, vmNamespace: string): ReactNode => {
  const allowedNamespaces = Array.from(new Set([vmNamespace, ...GLOBAL_NAD_NAMESPACES]));
  const [ns] = name.split('/');
  return (
    ns &&
    !allowedNamespaces.includes(ns) && <InvalidNADNamespace allowedNamespaces={allowedNamespaces} />
  );
};
