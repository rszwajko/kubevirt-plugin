import React from 'react';
import { Link } from 'react-router-dom-v5-compat';

import { VirtualMachineDetailsTab } from '@kubevirt-utils/constants/tabs-constants';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import useDisksTableData from '@kubevirt-utils/resources/vm/hooks/disk/useDisksTableData';
import { DiskRowDataLayout } from '@kubevirt-utils/resources/vm/utils/disk/constants';
import { VirtualizedTable } from '@openshift-console/dynamic-plugin-sdk';
import { Card, CardBody, CardTitle, Divider } from '@patternfly/react-core';

import { createURL } from '../../utils/utils';

import useVirtualMachinesOverviewTabDisksColumns from './hooks/useVirtualMachinesOverviewTabDisksColumns';
import VirtualMachinesOverviewTabDisksRow from './VirtualMachinesOverviewTabDisksRow';

import './virtual-machines-overview-tab-disks.scss';

const VirtualMachinesOverviewTabDisks = ({ vm, vmi }) => {
  const [disks, loaded, loadedError] = useDisksTableData(vm, vmi);
  const { t } = useKubevirtTranslation();
  const columns = useVirtualMachinesOverviewTabDisksColumns();

  return (
    <div className="VirtualMachinesOverviewTabDisks--main">
      <Card>
        <CardTitle className="pf-v6-u-text-color-subtle">
          <Link
            to={createURL(
              `${VirtualMachineDetailsTab.Configurations}/${VirtualMachineDetailsTab.Storage}`,
              location?.pathname,
            )}
          >
            {t('Storage ({{disks}})', { disks: disks.length || 0 })}
          </Link>
        </CardTitle>
        <Divider />
        <CardBody isFilled>
          <VirtualizedTable<DiskRowDataLayout>
            columns={columns}
            data={disks}
            loaded={loaded}
            loadError={loadedError}
            Row={VirtualMachinesOverviewTabDisksRow}
            unfilteredData={disks}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default VirtualMachinesOverviewTabDisks;
