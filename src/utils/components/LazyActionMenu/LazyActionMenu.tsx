import * as React from 'react';
import * as _ from 'lodash';

import { Action, ActionServiceProvider, checkAccess } from '@openshift-console/dynamic-plugin-sdk';
import {
  ActionMenuVariant,
  LazyActionMenuProps,
} from '@openshift-console/dynamic-plugin-sdk/lib/api/internal-types';
import { Menu, MenuContent, MenuList, Popper } from '@patternfly/react-core';

import ActionMenuContent from './ActionMenuContent';
import ActionMenuToggle from './ActionMenuToggle';

type LazyMenuRendererProps = {
  actions: Action[];
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  toggleRef: React.RefObject<HTMLButtonElement>;
} & React.ComponentProps<typeof ActionMenuContent>;

const LazyMenuRenderer: React.FC<LazyMenuRendererProps> = ({
  actions,
  isOpen,
  menuRef,
  toggleRef,
  ...restProps
}) => {
  React.useEffect(() => {
    // Check access after loading actions from service over a kebab to minimize flicker when opened.
    // This depends on `checkAccess` being memoized.
    _.each(actions, (action: Action) => {
      if (action.accessReview) {
        checkAccess(action.accessReview).catch((e) =>
          // eslint-disable-next-line no-console
          console.warn('Could not check access for action menu', e),
        );
      }
    });
  }, [actions]);

  const menu = (
    <Menu containsFlyout onSelect={restProps.onClick} ref={menuRef}>
      <MenuContent data-test-id="action-items">
        <MenuList>
          <ActionMenuContent {...restProps} />
        </MenuList>
      </MenuContent>
    </Menu>
  );

  return <Popper isVisible={isOpen} placement="bottom-end" popper={menu} triggerRef={toggleRef} />;
};

const LazyActionMenu: React.FC<LazyActionMenuProps> = ({
  context,
  isDisabled,
  label,
  variant = ActionMenuVariant.KEBAB,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [initActionLoader, setInitActionLoader] = React.useState<boolean>(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  const hideMenu = () => {
    setIsOpen(false);
  };

  const handleHover = React.useCallback(() => {
    setInitActionLoader(true);
  }, []);

  return (
    <>
      <ActionMenuToggle
        isDisabled={isDisabled}
        isOpen={isOpen}
        menuRef={menuRef}
        onToggleClick={setIsOpen}
        onToggleHover={handleHover}
        toggleRef={toggleRef}
        toggleTitle={label}
        toggleVariant={variant}
      />
      {initActionLoader && (
        <ActionServiceProvider context={context}>
          {({ actions, loaded, options }) =>
            loaded && (
              <LazyMenuRenderer
                actions={actions}
                focusItem={options[0]}
                isOpen={isOpen}
                menuRef={menuRef}
                onClick={hideMenu}
                options={options}
                toggleRef={toggleRef}
              />
            )
          }
        </ActionServiceProvider>
      )}
    </>
  );
};

export default LazyActionMenu;
