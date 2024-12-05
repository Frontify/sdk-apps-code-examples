import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { useEffect, useState } from 'react';
import { InputMask } from './BlueskyComponents/InputMask.tsx';
import { Login } from './BlueskyComponents/Login.tsx';
import { Logout } from './BlueskyComponents/Logout.tsx';
import { PostConfirmation } from './BlueskyComponents/PostConfirmation.tsx';
import { authorizeUser, logoutUser } from './useCase/Authentication.ts';
import { createPostWithImage } from './useCase/CreatePostWithImage.ts';

export const Router = ({
    init,
    loggedIn,
    setLoggedIn,
}: {
    init: boolean;
    loggedIn: boolean;
    setLoggedIn: (state: boolean) => void;
}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [image, setImage] = useState<string | undefined>();

    useEffect(() => {
        const initializeImage = async () => {
            const appBridge = new AppBridgePlatformApp();
            const context = appBridge.context().get();
            if (context.surface === 'assetViewer') {
                const assetResource = await appBridge.api({
                    name: 'getAssetResourceInformation',
                    payload: { assetId: context.assetId },
                });
                setImage(assetResource.previewUrl);
            }
        };

        initializeImage();
    }, []);

    if (init) {
        return <div className="flex flex-col rounded-xl bg-[#161e27]"></div>;
    }

    if (!loggedIn) {
        return (
            <Login
                onLoginSuccess={async (identifier, password) => {
                    const success = await authorizeUser({ identifier, password });
                    if (success) {
                        setLoggedIn(true);
                    }

                    return success;
                }}
            />
        );
    }

    if (showConfirmation) {
        return <PostConfirmation onClose={() => setShowConfirmation(false)} />;
    }

    return (
        <>
            <InputMask
                imageSrc={image + '?mod=v1/resize=400'}
                onSubmit={(input) => {
                    setShowConfirmation(true);
                    createPostWithImage(input);
                }}
            />
            <Logout
                onLogout={() => {
                    logoutUser();
                    setLoggedIn(false);
                }}
            />
        </>
    );
};
