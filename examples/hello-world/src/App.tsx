/* (c) Copyright Frontify Ltd., all rights reserved. */

import './App.css';
import '@frontify/fondue/style';
import { type PlatformAppContext, usePlatformAppBridge } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';
import { Flex, FOCUS_VISIBLE_STYLE, Heading, IconArrowOutExternal20, merge } from "@frontify/fondue";

export const App = () => {
    const appBridge = usePlatformAppBridge();
    const [context, setContext] = useState<PlatformAppContext>();

    useEffect(() => {
        if (!appBridge) {
            return;
        }

        setContext(appBridge.context().get());
    }, [appBridge]);

    return (
        <div className="tw-font-body tw-h-screen tw-bg-base tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-6">
            <Heading size="xx-large" weight="strong">Hello World!</Heading>
            <Flex direction="column">
                <p className="tw-text-text">Congratulations! You've successfully connected your app to our platform.</p>
                {
                    context && (
                        <p className="tw-text-text-weak tw-text-body-small">Surface: {context.surface}</p>
                    )
                }
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
                <IconArrowOutExternal20/>
                <span>Documentation</span>
            </a>
        </div>
    );
};
