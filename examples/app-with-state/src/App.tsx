/* (c) Copyright Frontify Ltd., all rights reserved. */

import './App.css';
import { type PlatformAppContext, usePlatformAppBridge } from '@frontify/app-bridge';
import { Flex, FOCUS_VISIBLE_STYLE, Heading, IconArrowOutExternal20, merge } from '@frontify/fondue';
import { Button, TextInput } from '@frontify/fondue/components';
import { useEffect, useState } from 'react';

export const App = () => {
    const appBridge = usePlatformAppBridge();
    const [context, setContext] = useState<PlatformAppContext>();
    const [input, setInput] = useState('');
    const [userState, setUserState] = useState<Record<string, string>>();
    const [subscribedState, setSubscribedState] = useState<Record<string, string>>();

    useEffect(() => {
        if (!appBridge) {
            return;
        }

        setContext(appBridge.context().get());
    }, [appBridge]);

    const setState = () => {
        // Access the state of an individual user
        // This state persist for deployed Apps
        appBridge?.state('userState').set({ 'test-app': input });
    };

    const getState = () => {
        // Access  the current userState
        // This state persist if the app is deployed
        const appBridgeState = appBridge?.state('userState').get() as Record<string, string>;
        setUserState(appBridgeState);
    };

    const subscribeState = () => {
        // Subscribe to a userState Change
        // The callback is trigger when a new userState is set
        appBridge?.state('userState').subscribe((nextState, previousState) => {
            console.log('access to previous State', previousState);
            const subState = nextState as { settings: Record<string, string>; userState: Record<string, string> };
            setSubscribedState(subState.userState);
        });
    };

    const onInput = (value: string) => {
        setInput(value);
    };

    return (
        <div className="tw-font-body tw-h-screen tw-bg-base tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-6">
            <Heading size="xx-large" weight="strong">
                Hello World for user state!
            </Heading>
            <Flex direction="column">
                <p className="tw-text-text">
                    Congratulations! You have successfully connected your app to our platform.
                </p>
                {context && <p className="tw-text-text-weak tw-text-body-small">Surface: {context.surface}</p>}
            </Flex>

            <Flex>
                <p className="tw-text-text">Lets use our State:</p>
                <TextInput id={'id'} onChange={(e) => onInput(e.target.value)} value={input} />
                <Button onPress={() => setState()}>Set State</Button>
            </Flex>
            <Flex>
                <p className="tw-text-text">Get current state:</p>
                <Button onPress={() => getState()}>Get userState</Button>
                <p className="tw-text-text">{userState && userState['test-app']}</p>
            </Flex>

            <Flex>
                <p className="tw-text-text">Subscribe to userState changes:</p>
                <Button onPress={() => subscribeState()}>Subscribe to userState</Button>
                <p className="tw-text-text">{subscribedState && subscribedState['test-app']}</p>
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
