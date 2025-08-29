import { TFunction } from 'react-i18next';

const dns1123LabelRegexp = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;

const dns1123LabelErrMsg = (t: TFunction) =>
  t(
    "a lowercase RFC 1123 label must consist of lower case alphanumeric characters or '-', and must start and end with an alphanumeric character",
  );

// DNS1123LabelMaxLength is a label's max length in DNS (RFC 1123)
const DNS1123LabelMaxLength = 63;

const maxNameLengthErrorMsg = (t: TFunction) =>
  t('Maximum name length is {{ maxNameLength }} characters', {
    maxNameLength: DNS1123LabelMaxLength,
  });

// IsDNS1123Label tests for a string that conforms to the definition of a label in
// DNS (RFC 1123).
export const isDNS1123Label = (value: string): boolean => parseDNS1123Label(value).isValid;

export const parseDNS1123Label = (
  value: string,
): { getErrorMsg?: (t: TFunction) => string; isValid: boolean } => {
  if (value?.length > DNS1123LabelMaxLength) {
    return { getErrorMsg: maxNameLengthErrorMsg, isValid: false };
  }
  if (!dns1123LabelRegexp.test(value)) {
    return { getErrorMsg: dns1123LabelErrMsg, isValid: false };
  }
  return { isValid: true };
};
