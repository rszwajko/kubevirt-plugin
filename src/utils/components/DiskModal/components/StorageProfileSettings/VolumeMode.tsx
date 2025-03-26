import React, { FC, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { uniq } from 'lodash';

import { V1beta1StorageSpecVolumeModeEnum } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { ClaimPropertySets } from '@kubevirt-utils/types/storage';
import { FormGroup, Radio } from '@patternfly/react-core';

import { V1DiskFormState } from '../../utils/types';
import { ACCESS_MODE_FIELD, VOLUME_MODE_FIELD, VOLUMEMODE_FIELDID } from '../utils/constants';
import { getAccessModesForVolume, VOLUME_MODE_RADIO_OPTIONS } from '../utils/modesMapping';

import RecommendationLabel from './RecommendationLabel';

import './ApplyStorageProfileSettings.scss';
type VolumeModeProps = {
  allowAllModes: boolean;
  claimPropertySets: ClaimPropertySets;
};

const VolumeMode: FC<VolumeModeProps> = ({ allowAllModes, claimPropertySets }) => {
  const { t } = useKubevirtTranslation();

  const { setValue, watch } = useFormContext<V1DiskFormState>();

  const volumeMode = watch(VOLUME_MODE_FIELD);
  const recommendedVolumeModes = uniq(
    claimPropertySets
      .map((it) => it.volumeMode)
      .filter((mode) =>
        Object.values(V1beta1StorageSpecVolumeModeEnum).some((key) => key === mode),
      ),
  );

  const setBothModes = useCallback(
    (mode) => {
      const accessModes = getAccessModesForVolume(claimPropertySets, mode);
      setValue(VOLUME_MODE_FIELD, mode);
      setValue(ACCESS_MODE_FIELD, accessModes.length > 0 ? [accessModes[0]] : undefined);
    },
    [claimPropertySets, setValue],
  );

  useEffect(() => {
    if (volumeMode || !recommendedVolumeModes?.[0]) {
      return;
    }
    const mostRecommended = recommendedVolumeModes[0];
    setBothModes(mostRecommended);
  }, [volumeMode, recommendedVolumeModes, setBothModes]);

  return (
    <FormGroup fieldId={VOLUMEMODE_FIELDID} label={t('Volume Mode')}>
      {VOLUME_MODE_RADIO_OPTIONS.map(({ label, value }) => (
        <Radio
          label={
            <div className="labelWithGap">
              {label}
              <RecommendationLabel
                priority={recommendedVolumeModes.findIndex((it) => it === value)}
                recommendationCount={recommendedVolumeModes.length}
              />
            </div>
          }
          onChange={(event, checked) => {
            if (checked) {
              setBothModes(value);
            }
          }}
          id={value}
          isChecked={value === volumeMode}
          isDisabled={!recommendedVolumeModes?.includes(value) && !allowAllModes}
          key={value}
          name={VOLUME_MODE_FIELD}
        />
      ))}
    </FormGroup>
  );
};

export default VolumeMode;
