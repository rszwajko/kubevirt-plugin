import React, { FC, MouseEvent, Ref, useEffect, useState } from 'react';

import DropdownToggle from '@kubevirt-utils/components/toggles/DropdownToggle';
import SelectToggle from '@kubevirt-utils/components/toggles/SelectToggle';
import { t } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { keyMaps } from '@kubevirt-utils/keyboard/keymaps/keymaps';
import { isKeyboardLayout, KeyboardLayout } from '@kubevirt-utils/keyboard/types';
import {
  Button,
  ButtonVariant,
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleAction,
  MenuToggleElement,
  Select,
  SelectOption,
} from '@patternfly/react-core';
import { SelectList } from '@patternfly/react-core';
import {} from '@patternfly/react-core';
import { PasteIcon } from '@patternfly/react-icons';

import { ConsoleState } from '../utils/ConsoleConsts';

import { AccessConsolesProps, typeMap } from './utils/accessConsoles';

import './access-consoles.scss';

const { connected } = ConsoleState;

export const AccessConsoles: FC<AccessConsolesProps> = ({
  isVnc,
  isWindowsVM,
  rfb,
  serialSocket,
  setType,
  type,
}) => {
  const [isOpenSelectType, setIsOpenSelectType] = useState<boolean>(false);
  const [isOpenSendKey, setIsOpenSendKey] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const defaultKeyboard: KeyboardLayout = 'en-us';
  const [selectedKeyboard, setSelectedKeyboard] = useState<KeyboardLayout>(defaultKeyboard);
  const [isKeyboardSelectOpen, setIsKeyboardSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    const statusCallback = () => setStatus(connected);
    rfb?.addEventListener('connect', statusCallback);

    () => rfb?.removeEventListener('connect', statusCallback);
  }, [rfb]);

  const customButtons = [
    {
      onClick: () => rfb?.sendCtrlAltDel(),
      text: 'Ctrl + Alt + Delete',
    },
    {
      onClick: () => rfb?.sendCtrlAlt1(),
      text: 'Ctrl + Alt + 1',
    },
    {
      onClick: () => rfb?.sendCtrlAlt2(),
      text: 'Ctrl + Alt + 2',
    },
  ];

  const onInjectTextFromClipboard = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    e.preventDefault();
    rfb?.sendPasteCMD(selectedKeyboard);
    serialSocket?.onPaste();
  };

  const onDisconnect = () => {
    rfb?.disconnect();
    serialSocket?.destroy();
  };

  const typeInLabel = t('Type into console ({{selectedKeyboard}})', { selectedKeyboard });
  return (
    <>
      {isVnc && (
        <Dropdown
          onSelect={(_event, value?: number | string) => {
            isKeyboardLayout(value) && setSelectedKeyboard(value);
            setIsKeyboardSelectOpen(false);
          }}
          toggle={(toggleRef: Ref<MenuToggleElement>) => (
            <MenuToggle
              splitButtonItems={[
                <MenuToggleAction
                  aria-label={typeInLabel}
                  key={typeInLabel}
                  onClick={onInjectTextFromClipboard}
                >
                  <PasteIcon />
                  {typeInLabel}
                </MenuToggleAction>,
              ]}
              className="vnc-paste-button"
              isExpanded={isKeyboardSelectOpen}
              onClick={() => setIsKeyboardSelectOpen(!isKeyboardSelectOpen)}
              ref={toggleRef}
              variant="secondary"
            >
              {selectedKeyboard}
            </MenuToggle>
          )}
          isOpen={isKeyboardSelectOpen}
          isScrollable
          onOpenChange={(isOpen) => setIsKeyboardSelectOpen(isOpen)}
          selected={selectedKeyboard}
          shouldFocusToggleOnSelect
        >
          <DropdownGroup>
            <DropdownItem description={defaultKeyboard} value={defaultKeyboard}>
              {keyMaps[defaultKeyboard].description}
            </DropdownItem>
          </DropdownGroup>
          <Divider component="li" />
          <DropdownList>
            {Object.entries(keyMaps)
              .filter(([value]) => value !== defaultKeyboard)
              .sort(([, a], [, b]) => a.description.localeCompare(b.description))
              .map(([value, def]) => (
                <DropdownItem description={value} key={value} value={value}>
                  {def.description}
                </DropdownItem>
              ))}
          </DropdownList>
        </Dropdown>
      )}
      {!isVnc && (
        <Button
          icon={
            <>
              <PasteIcon /> {t('Paste to console')}
            </>
          }
          className="vnc-paste-button"
          onClick={onInjectTextFromClipboard}
          variant={ButtonVariant.link}
        />
      )}

      <Select
        onSelect={(_, selection: string) => {
          setType(selection);
          setIsOpenSelectType(false);
        }}
        toggle={SelectToggle({
          className: 'access-consoles-selector',
          id: 'pf-v6-c-console__type-selector',
          isExpanded: isOpenSelectType,
          onClick: () => setIsOpenSelectType((prevIsOpen) => !prevIsOpen),
          selected: type,
        })}
        aria-label={t('Select console type')}
        isOpen={isOpenSelectType}
        onOpenChange={setIsOpenSelectType}
        placeholder={t('Select console type')}
        selected={type}
      >
        <SelectList>
          {Object.values(typeMap(isWindowsVM)).map((name: string) => {
            return (
              <SelectOption id={name} key={name} value={name}>
                {name}
              </SelectOption>
            );
          })}
        </SelectList>
      </Select>
      <Dropdown
        toggle={DropdownToggle({
          children: <>{t('Send key')}</>,
          className: 'access-consoles-selector',
          id: 'pf-v6-c-console__actions-vnc-toggle-id',
          isDisabled: !rfb,
          isExpanded: isOpenSendKey,
          onClick: () => setIsOpenSendKey((prevIsOpen) => !prevIsOpen),
        })}
        isOpen={isOpenSendKey}
        onOpenChange={setIsOpenSendKey}
        onSelect={() => setIsOpenSendKey(false)}
      >
        <DropdownList>
          {customButtons?.map(({ onClick, text }) => (
            <DropdownItem key={text} onClick={onClick}>
              {text}
            </DropdownItem>
          ))}
        </DropdownList>
      </Dropdown>
      <Button
        className="vnc-actions-disconnect-button"
        isDisabled={status !== connected}
        onClick={onDisconnect}
        variant={ButtonVariant.secondary}
      >
        {t('Disconnect')}
      </Button>
    </>
  );
};

AccessConsoles.displayName = 'AccessConsoles';
