import React, { FC } from 'react';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { Label, Tooltip } from '@patternfly/react-core';

type RecommendationLabelProps = {
  priority: number;
  recommendationCount: number;
};

const fromPriorityToLabels = (priority, recommendationCount, t) => {
  if (priority === 0) {
    return {
      label: t('Most recommended'),
      tooltip: t('The most recommended StorageProfile option.'),
    };
  }

  if (priority > 0 && priority < recommendationCount) {
    return {
      label: t('Recommended'),
      tooltip: t('Ranks {{priority}} among options recommended in the StorageProfile.', {
        priority: priority + 1,
      }),
    };
  }

  return {
    label: t('Not recommended'),
    tooltip: t('The option is missing in the StorageProfile.'),
  };
};

const RecommendationLabel: FC<RecommendationLabelProps> = ({ priority, recommendationCount }) => {
  const { t } = useKubevirtTranslation();
  const { label, tooltip } = fromPriorityToLabels(priority, recommendationCount, t);

  return (
    <Tooltip content={tooltip}>
      <Label isCompact variant="outline">
        {label}
      </Label>
    </Tooltip>
  );
};

export default RecommendationLabel;
