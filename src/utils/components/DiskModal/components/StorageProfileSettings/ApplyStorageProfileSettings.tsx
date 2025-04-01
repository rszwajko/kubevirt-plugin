import React, { FC } from 'react';
import { useWatch } from 'react-hook-form';

import ErrorAlert from '@kubevirt-utils/components/ErrorAlert/ErrorAlert';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import useStorageProfileClaimPropertySets from '@kubevirt-utils/hooks/useStorageProfileClaimPropertySets';
import { Flex, FlexItem, Skeleton } from '@patternfly/react-core';

import { V1DiskFormState } from '../../utils/types';
import { DATAVOLUME_TEMPLATE_STORAGE_CLASS } from '../utils/constants';

import AccessMode from './AccessMode';
import VolumeMode from './VolumeMode';

import './ApplyStorageProfileSettings.scss';

const ApplyStorageProfileSettings: FC = () => {
  const { t } = useKubevirtTranslation();

  const storageClassName = useWatch<V1DiskFormState, typeof DATAVOLUME_TEMPLATE_STORAGE_CLASS>({
    defaultValue: '',
    name: DATAVOLUME_TEMPLATE_STORAGE_CLASS,
  });

  const { claimPropertySets, error, loaded } = useStorageProfileClaimPropertySets(
    storageClassName ?? '',
  );
  // eslint-disable-next-line no-console
  console.log('Render - ApplyStorageProfileSettings ', storageClassName);

  if (!loaded) {
    return <Skeleton screenreaderText={t('Loading StorageProfile')} />;
  }

  if (loaded && error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <Flex
      className="ApplyStorageProfileSettings--volume-access-section"
      spaceItems={{ default: 'spaceItems3xl' }}
    >
      <FlexItem>
        <VolumeMode claimPropertySets={claimPropertySets ?? []} />
      </FlexItem>
      <FlexItem>
        <AccessMode claimPropertySets={claimPropertySets ?? []} />
      </FlexItem>
    </Flex>
  );
};

export default ApplyStorageProfileSettings;
