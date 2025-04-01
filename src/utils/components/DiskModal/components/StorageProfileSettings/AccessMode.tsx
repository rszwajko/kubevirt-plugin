import React, { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { ClaimPropertySets } from '@kubevirt-utils/types/storage';
import { FormGroup, Radio } from '@patternfly/react-core';

import { V1DiskFormState } from '../../utils/types';
import { ACCESS_MODE_FIELD, ACCESS_MODE_FIELDID, VOLUME_MODE_FIELD } from '../utils/constants';
import { ACCESS_MODE_RADIO_OPTIONS, getAccessModesForVolume } from '../utils/modesMapping';

import RecommendationLabel from './RecommendationLabel';

import './ApplyStorageProfileSettings.scss';

type AccessModeProps = {
  claimPropertySets: ClaimPropertySets;
};

const AccessMode: FC<AccessModeProps> = ({ claimPropertySets = [] }) => {
  const { t } = useKubevirtTranslation();

  const { setValue } = useFormContext<V1DiskFormState>();

  const [accessModes = [], volumeMode] = useWatch<
    V1DiskFormState,
    [typeof ACCESS_MODE_FIELD, typeof VOLUME_MODE_FIELD]
  >({ name: [ACCESS_MODE_FIELD, VOLUME_MODE_FIELD] });

  const accessMode = accessModes?.[0];

  const accessModesForVolume = getAccessModesForVolume(claimPropertySets, volumeMode);
  // eslint-disable-next-line no-console
  console.log('Render - AccessMode', accessModes, volumeMode, claimPropertySets);
  return (
    <FormGroup fieldId={ACCESS_MODE_FIELDID} label={t('Access Mode')}>
      {ACCESS_MODE_RADIO_OPTIONS.map(({ label, value }) => (
        <Radio
          label={
            <div className="ApplyStorageProfileSettings--labelWithGap">
              {label}
              <RecommendationLabel
                priority={accessModesForVolume.findIndex((it) => it === value)}
                recommendationCount={accessModesForVolume.length}
              />
            </div>
          }
          onChange={(event, checked) => {
            if (checked) {
              setValue(ACCESS_MODE_FIELD, [value]);
            }
          }}
          className="ApplyStorageProfileSettings--rowPadding"
          id={value}
          isChecked={value === accessMode}
          key={value}
          name={ACCESS_MODE_FIELD}
        />
      ))}
    </FormGroup>
  );
};

export default AccessMode;
