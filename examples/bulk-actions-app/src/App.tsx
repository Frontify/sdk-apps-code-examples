import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { useEffect, useState } from 'react';
import { getAssetIds } from './helpers/graphql';
import { Button } from '@frontify/fondue/components';
import { Heading, TextInput } from '@frontify/fondue';

export const App = () => {
    const appBridge = new AppBridgePlatformApp();
    const context = appBridge.context().get();
    const [images, setImages] = useState<{ previewUrl: string; title: string; extension: string }[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            if (context.surface === 'assetBulkActions') {
                const endpointImages = await appBridge.api({
                    name: 'executeGraphQl',
                    payload: { query: getAssetIds(context.selection.assets.ids) },
                });
                console.log(endpointImages);
                setImages(endpointImages.assets);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="tw-flex tw-flex-col tw-py-10 tw-px-10 tw-gap-y-6">
            <Heading size="xx-large" weight="strong">
                Bulk Rename Files
            </Heading>
            <div className="tw-flex tw-flex-col tw-gap-y-2">
                <div className="tw-flex tw-items-center tw-gap-x-2">
                    <TextInput
                        id="find"
                        placeholder="Find"
                        value={''}
                        onChange={() => {}}
                        onEnterPressed={() => {}}
                        onBlur={() => {}}
                    />
                    <div className="tw-text-text-weak">No matches</div>
                </div>
                <div className="tw-flex tw-gap-x-1">
                    <TextInput
                        id="replace"
                        placeholder="Replace"
                        value={''}
                        onChange={() => {}}
                        onEnterPressed={() => {}}
                        onBlur={() => {}}
                    />
                    <Button disabled={true} onPress={() => {}}>
                        Rename all
                    </Button>
                </div>
            </div>
            <div id="file-list">
                {images.length > 0 &&
                    images.map((image) => (
                        <p id="results">
                            <span className="tw-text-text">{image.title}</span>
                            <span className="tw-text-text-weak">.{image.extension}</span>
                        </p>
                    ))}
            </div>
        </div>
    );
};
