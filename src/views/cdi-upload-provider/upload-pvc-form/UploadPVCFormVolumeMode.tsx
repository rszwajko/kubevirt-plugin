import React, { FC, useMemo } from 'react';
import { Trans } from 'react-i18next';

import { V1beta1StorageSpecAccessModesEnum } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { VOLUME_MODE_RADIO_OPTIONS } from '@kubevirt-utils/components/ApplyStorageProfileSettings/utils';
import { getVolumeModeForProvisioner } from '@kubevirt-utils/components/DiskModal/components/utils/modesMapping';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { FormGroup, Radio } from '@patternfly/react-core';

type UploadPVCFormModeVolumeModeVolumeModeProps = {
  accessMode: V1beta1StorageSpecAccessModesEnum;
  loaded: boolean;
  onChange: (volumeMode: string) => void;
  provisioner: string;
  storageClass: string;
  volumeMode: string;
};

const UploadPVCFormModeVolumeMode: FC<UploadPVCFormModeVolumeModeVolumeModeProps> = ({
  accessMode,
  loaded,
  onChange,
  provisioner,
  storageClass,
  volumeMode,
}) => {
  const { t } = useKubevirtTranslation();

  const allowedVolumeModes: string[] = useMemo(
    () => (loaded ? getVolumeModeForProvisioner(provisioner, accessMode) : []),
    [loaded, provisioner, accessMode],
  );

  return (
    <FormGroup fieldId="volume-mode" isRequired label={t('Volume mode')}>
      {allowedVolumeModes?.length === 1 ? (
        <>
          {allowedVolumeModes?.[0]}

          <Trans ns="plugin__kubevirt-plugin" t={t}>
            Only {{ volumeMode }} volume mode is available for {{ storageClass }} with{' '}
            {{ accessMode }} access mode
          </Trans>
        </>
      ) : (
        VOLUME_MODE_RADIO_OPTIONS.map(({ label, value }) => (
          <Radio
            checked={value === volumeMode}
            id={value}
            isDisabled={!allowedVolumeModes?.includes(value)}
            key={value}
            label={label}
            name="volumeMode"
            onChange={(event) => onChange(event?.currentTarget?.value)}
            value={value}
          />
        ))
      )}
    </FormGroup>
  );
};

export default UploadPVCFormModeVolumeMode;
