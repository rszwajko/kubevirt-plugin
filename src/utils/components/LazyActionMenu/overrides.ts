import {
  AccessReviewResourceAttributes,
  useAccessReviewAllowed,
} from '@openshift-console/dynamic-plugin-sdk';
import { ImpersonateKind } from '@openshift-console/dynamic-plugin-sdk/lib/app/redux-types';

export const useAccessReview = (
  resourceAttributes: AccessReviewResourceAttributes,
  impersonate?: ImpersonateKind,
) => useAccessReviewAllowed(resourceAttributes, impersonate);
