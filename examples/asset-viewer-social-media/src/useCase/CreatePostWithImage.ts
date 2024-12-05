import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { getUserCredentials } from './Authentication.ts';

const getBlobFromUrl = async (url: string) => {
    const response = await fetch(url + '?mod=v1/resize=400');
    return await response.blob();
};

const getCurrentImageAsBlob = async () => {
    const appBridge = new AppBridgePlatformApp();
    const context = appBridge.context().get();

    let urlResponse = '';
    let assetTitel = '';

    if (context.surface === 'assetViewer') {
        const { previewUrl, title } = await appBridge.api({
            name: 'getAssetResourceInformation',
            payload: { assetId: context.assetId },
        });
        if (previewUrl && title) {
            urlResponse = previewUrl;
            assetTitel = title;
        }
    }

    return { blob: await getBlobFromUrl(urlResponse), title: assetTitel };
};

export const createPostWithImage = async (text: string) => {
    const { blob, title } = await getCurrentImageAsBlob();
    const credentials = await getUserCredentials();

    if (credentials) {
        const { data } = await credentials.agent.uploadBlob(blob);

        await credentials.agent.post({
            text: text,
            embed: {
                $type: 'app.bsky.embed.images',
                images: [
                    {
                        alt: title,
                        image: data.blob,
                        aspectRatio: {
                            width: 1000,
                            height: 500,
                        },
                    },
                ],
            },
        });
    }
};
