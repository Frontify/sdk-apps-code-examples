/* (c) Copyright Frontify Ltd., all rights reserved. */

import './App.css';
import { AppBridgePlatformApp } from '@frontify/app-bridge';
import { Flex, FOCUS_VISIBLE_STYLE, Heading, IconArrowOutExternal20, merge } from '@frontify/fondue';

export const App = () => {
    /**
     * The App-Bridge package is included as a dependency by default.
     * In this example, we are retrieving the context from the App
     *
     * For more information, please refer to our documentation.
     */
    const appBridge = new AppBridgePlatformApp();

    /**
     * We recommend building your apps using our Design System, Fondue.
     * fondue-tokens are often used for styling.
     * All the Tailwind classes derived from our tokens have the 'tw-' prefix.
     */
    return (
        <div className="tw-font-body tw-h-screen tw-bg-base tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-6">
            <Heading size="xx-large" weight="strong">
                Hello World!
            </Heading>
            <Flex direction="column">
                <p className="tw-text-text">
                    Congratulations! You have successfully connected your app to our platform.
                </p>
                <p className="tw-text-text-weak tw-text-body-small">Surface: {appBridge.context().get().surface}</p>
            </Flex>

            <a
                data-test-id="documentation-link"
                href="https://developer.frontify.com/"
                target="blank"
                rel="noreferrer"
                className={merge([
                    FOCUS_VISIBLE_STYLE,
                    'tw-bg-button-background tw-border-button-border hover:tw-bg-button-background-hover active:tw-bg-button-background-pressed  tw-group tw-border tw-box-box tw-relative tw-flex tw-gap-2 tw-items-center tw-justify-center tw-cursor-pointer tw-font-body tw-font-medium tw-rounded tw-px-4 tw-h-9 tw-text-body-medium',
                ])}
            >
                <IconArrowOutExternal20 />
                <span>Documentation</span>
            </a>
        </div>
    );
};
