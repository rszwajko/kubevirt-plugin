import { useMemo } from 'react';
import { TFunction } from 'react-i18next';

import {
  ACTIONS,
  compareWitDirection,
  MAC_ADDRESS,
  MODEL,
  NAME,
  NETWORK,
} from '@kubevirt-utils/constants/network-columns';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { TableColumn } from '@openshift-console/dynamic-plugin-sdk';
import { sortable } from '@patternfly/react-table';

import { SimpeNicPresentation } from '../components/list/NetworkInterfaceList';

export const LINK_STATE = <T extends { linkState?: string }>(t: TFunction): TableColumn<T> => ({
  id: 'link_state',
  sort: (data, direction) =>
    data.sort((a, b) => compareWitDirection(direction, a?.linkState, b?.linkState)),
  title: t('Reported state'),
  transforms: [sortable],
});

export const DESIRED_LINK_STATE = <T extends { desiredLinkState?: string }>(
  t: TFunction,
): TableColumn<T> => ({
  id: 'desired_link_state',
  sort: (data, direction) =>
    data.sort((a, b) => compareWitDirection(direction, a?.desiredLinkState, b?.desiredLinkState)),
  title: t('Configured state'),
  transforms: [sortable],
});

const INTERFACE_NAME = <T extends { interfaceName?: string }>(t: TFunction): TableColumn<T> => ({
  id: 'interfaceName',
  sort: (data, direction) =>
    data.sort((a, b) => compareWitDirection(direction, a?.interfaceName, b?.interfaceName)),
  title: t('Interface'),
  transforms: [sortable],
});

const TYPE = <T extends { type?: string }>(t: TFunction): TableColumn<T> => ({
  id: 'type',
  sort: (data, direction) => data.sort((a, b) => compareWitDirection(direction, a?.type, b?.type)),
  title: t('Type'),
  transforms: [sortable],
});

const useNetworkColumns = () => {
  const { t } = useKubevirtTranslation();

  const columns: TableColumn<SimpeNicPresentation>[] = useMemo(() => {
    return [
      ...[
        NAME<SimpeNicPresentation>,
        INTERFACE_NAME<SimpeNicPresentation>,
        MODEL<SimpeNicPresentation>,
        NETWORK<SimpeNicPresentation>,
        LINK_STATE<SimpeNicPresentation>,
        DESIRED_LINK_STATE<SimpeNicPresentation>,
        TYPE<SimpeNicPresentation>,
        MAC_ADDRESS<SimpeNicPresentation>,
      ].map((builder) => builder(t)),
      ACTIONS,
    ];
  }, [t]);

  return columns;
};

export default useNetworkColumns;
