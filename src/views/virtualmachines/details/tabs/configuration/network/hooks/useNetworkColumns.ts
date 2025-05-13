import { useMemo } from 'react';
import { TFunction } from 'react-i18next';

import { V1Interface } from '@kubevirt-ui/kubevirt-api/kubevirt';
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
import { getConfigInterfaceState } from '../utils/utils';

export const RUNTIME_LINK_STATE = <T extends { runtimeLinkState?: string }>(
  t: TFunction,
): TableColumn<T> => ({
  id: 'runtime_link_state',
  sort: (data, direction) =>
    data.sort((a, b) => compareWitDirection(direction, a?.runtimeLinkState, b?.runtimeLinkState)),
  title: t('Runtime state'),
  transforms: [sortable],
});

export const CONFIG_LINK_STATE = <
  T extends { config?: { iface?: V1Interface }; configLinkState?: string; isSRIOV: boolean },
>(
  t: TFunction,
): TableColumn<T> => ({
  id: 'config_link_state',
  sort: (data, direction) =>
    data.sort((a, b) =>
      compareWitDirection(
        direction,
        getConfigInterfaceState(a?.config?.iface, a?.configLinkState, a?.isSRIOV),
        getConfigInterfaceState(b?.config?.iface, b?.configLinkState, b?.isSRIOV),
      ),
    ),
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
        RUNTIME_LINK_STATE<SimpeNicPresentation>,
        CONFIG_LINK_STATE<SimpeNicPresentation>,
        TYPE<SimpeNicPresentation>,
        MAC_ADDRESS<SimpeNicPresentation>,
      ].map((builder) => builder(t)),
      ACTIONS,
    ];
  }, [t]);

  return columns;
};

export default useNetworkColumns;
