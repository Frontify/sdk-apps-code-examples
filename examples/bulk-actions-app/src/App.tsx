import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { useEffect, useState } from 'react';
import { getAssetsByIds } from './helpers/graphql';
import { Button } from '@frontify/fondue/components';
import { Heading, TextInput } from '@frontify/fondue';

export const App = () => {
    const appBridge = new AppBridgePlatformApp();
    const context = appBridge.context().get();

    const [assets, setAssets] = useState<{ previewUrl: string; title: string; extension: string }[]>([]);

    useEffect(() => {
        const fetchAssets = async () => {
            if (context.surface !== 'assetBulkActions') {
                return;
            }

            const response = await appBridge.api({
                name: 'executeGraphQl',
                payload: { query: getAssetsByIds(context.selection.assets.ids) },
            });

            setAssets(response.assets);
        };

        fetchAssets();
    }, []);

    return (
        <div className="tw-flex tw-flex-col tw-py-10 tw-px-10 tw-gap-y-6">
            <Heading size="xx-large" weight="strong">
                Bulk Rename Assets
            </Heading>
            <div className="tw-flex tw-flex-col tw-gap-y-2">
                <div className="tw-flex tw-items-center tw-gap-x-2">
                    <TextInput
                        id="find"
                        placeholder="Find"
                        disabled={true}
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
                        disabled={true}
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
                {assets.length > 0 &&
                    assets.map((asset) => (
                        <p id="results">
                            <span className="tw-text-text">{asset.title}</span>
                            <span className="tw-text-text-weak">.{asset.extension}</span>
                        </p>
                    ))}
            </div>
        </div>
    );
};
