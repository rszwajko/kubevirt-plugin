import { useCallback, useEffect, useState } from 'react';

import { ConfigMapModel, RoleBindingModel, RoleModel } from '@kubevirt-ui/kubevirt-api/console';
import {
  IoK8sApiCoreV1ConfigMap,
  IoK8sApiRbacV1Role,
  IoK8sApiRbacV1RoleBinding,
} from '@kubevirt-ui/kubevirt-api/kubernetes';
import { k8sCreate, k8sPatch } from '@openshift-console/dynamic-plugin-sdk';

import { featuresConfigMapInitialState, featuresRole, featuresRoleBinding } from './constants';
import { UseFeaturesValues } from './types';
import useFeaturesConfigMap from './useFeaturesConfigMap';

type UseFeatures = (featureName: string) => UseFeaturesValues;

export const useFeatures: UseFeatures = (featureName) => {
  const { featuresConfigMapData, isAdmin } = useFeaturesConfigMap();
  const [featureConfigMap, loaded, loadError] = featuresConfigMapData;
  const [featureEnabled, setFeatureEnabled] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    if (loadError?.code === 404) {
      setError(loadError);

      const createResources = async () => {
        await k8sCreate<IoK8sApiCoreV1ConfigMap>({
          data: featuresConfigMapInitialState,
          model: ConfigMapModel,
        });

        await k8sCreate<IoK8sApiRbacV1Role>({
          data: featuresRole,
          model: RoleModel,
        });

        await k8sCreate<IoK8sApiRbacV1RoleBinding>({
          data: featuresRoleBinding,
          model: RoleBindingModel,
        });
      };

      try {
        createResources();
        setFeatureEnabled(featuresConfigMapInitialState.data[featureName] === 'true');
        setLoading(false);
        setError(null);
      } catch (createError) {
        setError(createError);
      }

      return;
    }

    if (!loaded && loadError) {
      setFeatureEnabled(false);
      setLoading(false);
    }

    if (loaded) {
      switch (featureConfigMap?.data?.[featureName]) {
        case 'true':
          setFeatureEnabled(true);
          break;
        case 'false': {
          setFeatureEnabled(false);
          break;
        }
        // In case of features config-map exists but there is a new feature to enter that is missing
        case undefined:
        case null: {
          const applyMissingFeatures = async () => {
            await k8sPatch({
              data: [
                {
                  op: 'replace',
                  path: `/data/${featureName}`,
                  value: featuresConfigMapInitialState.data[featureName],
                },
              ],
              model: ConfigMapModel,
              resource: featureConfigMap,
            });
          };

          try {
            applyMissingFeatures();
            setFeatureEnabled(featuresConfigMapInitialState.data[featureName] === 'true');
          } catch (updateError) {
            setError(updateError);
          }
          break;
        }
        default:
          setFeatureEnabled(featureConfigMap?.data?.[featureName]);
      }
      setLoading(false);
      return;
    }
  }, [loadError, featureConfigMap, loaded, featureName, featureEnabled]);

  const toggleFeature = useCallback(
    async (value: boolean) => {
      setLoading(true);

      try {
        const promise = await k8sPatch({
          data: [{ op: 'replace', path: `/data/${featureName}`, value: value.toString() }],
          model: ConfigMapModel,
          resource: featureConfigMap,
        });
        setError(null);
        setFeatureEnabled(promise?.data?.[featureName] === 'true');
        setLoading(false);
        return promise;
      } catch (updateError) {
        setLoading(false);
        setError(updateError);
      }
    },
    [featureConfigMap, featureName],
  );

  return {
    canEdit: isAdmin,
    error,
    featureEnabled,
    loading: loading && !loadError,
    toggleFeature,
  };
};
