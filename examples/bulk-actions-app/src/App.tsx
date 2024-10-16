import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { useEffect, useState } from 'react';
import { getAssetIds } from './helpers/graphql';

export const App = () => {
    const appBridge = new AppBridgePlatformApp();
    const context = appBridge.context().get();
    const [images, setImages] = useState<{ previewUrl: string; title: string }[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            if (context.surface === 'assetBulkActions') {
                const endpointImages = (await appBridge.api({
                    name: 'executeGraphQl',
                    payload: { query: getAssetIds(context.selection.assets.ids) },
                })) as { assets: { previewUrl: string; title: string }[] };
                console.log(endpointImages);
                setImages(endpointImages.assets);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="w-100">
            <div className="grid grid-rows-10 grid-flow-col gap-10 justify-center">
                {images.length > 0 && images.map((image) => <img className="w-[10rem]" src={image.previewUrl} />)}
            </div>
        </div>
    );
};
