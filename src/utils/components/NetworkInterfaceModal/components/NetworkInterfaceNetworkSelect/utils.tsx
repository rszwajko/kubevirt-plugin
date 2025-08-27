import React from 'react';
import { TFunction } from 'react-i18next';

import { interfaceTypesProxy } from '@kubevirt-utils/resources/vm/utils/network/constants';
import { parseDNS1123Label } from '@kubevirt-utils/utils/validation';
import { HelperText, HelperTextItem, Label, SelectOptionProps } from '@patternfly/react-core';

export const createNewNetworkOption = (value) => ({
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

export const getCreateNetworkOption = (input: string, t: TFunction): SelectOptionProps => {
  if (!input || input.split('/').length !== 2 || input.split('/').some((part) => !part)) {
    return {
      children: (
        <HelperText>
          <HelperTextItem variant="default">
            {t('Type namespace/network-name to add a network')}
          </HelperTextItem>
        </HelperText>
      ),
      isDisabled: true,
    };
  }

  const { getErrorMsg } =
    input
      .split('/')
      .map((part) => parseDNS1123Label(part))
      .find(({ isValid }) => !isValid) ?? {};
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

  return {
    children: (
      <>
        {t('Use "{{input}}"', { input })}{' '}
        <Label isCompact>{interfaceTypesProxy.bridge} Binding</Label>
      </>
    ),
  };
};
