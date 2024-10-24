import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { useEffect, useState } from 'react';
import { getAssetsByIds, updateAssetTitle } from './helpers/graphql';
import { Button } from '@frontify/fondue/components';
import { Heading, Stack, Text, TextInput } from '@frontify/fondue';

const highlightMatches = (filename: string, query: string) => {
    if (!query) {
        return { highlightedText: filename, matchCount: 0 };
    }

    const parts = filename.split(new RegExp(`(${query})`, 'gi'));

    const matchCount = parts.filter((part) => part.toLowerCase() === query.toLowerCase()).length;

    const highlightedText = parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="tw-bg-box-negative-strong">
                {part}
            </span>
        ) : (
            part
        ),
    );

    return { highlightedText, matchCount };
};

const getResultCount = (matchCount: number, assetCount: number) => {
    if (matchCount === 0) {
        return 'No matches';
    }

    return `${matchCount} match${matchCount === 1 ? '' : 'es'} in ${assetCount} asset${assetCount === 1 ? '' : 's'}`;
};

type Asset = { id: string; previewUrl: string; title: string; extension: string };

export const App = () => {
    const appBridge = new AppBridgePlatformApp();
    const context = appBridge.context().get();

    const [assets, setAssets] = useState<Asset[]>([]);
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [matchCount, setMatchCount] = useState(0);
    const [matchingAssets, setMatchingAssets] = useState<Asset[]>([]);
    const [renamingInProgress, setRenamingInProgress] = useState(false);
    const [progressMessage, setProgressMessage] = useState('');

    const assetsAreFetched = assets.length > 0;
    const matchingAssetCount = matchingAssets.length;

    const handleFindTextChange = (value: string) => {
        setProgressMessage('');
        setFindText(value);
    };

    const handleReplaceTextChange = (value: string) => {
        setProgressMessage('');
        setReplaceText(value);
    };

    const renameAssets = async () => {
        const count = matchingAssetCount;
        let index = 1;

        setRenamingInProgress(true);

        for (const asset of matchingAssets) {
            setProgressMessage(`Renaming ${index} of ${count} asset${count === 1 ? '' : 's'}...`);

            const newTitle = asset.title.replace(new RegExp(findText, 'gi'), replaceText);

            try {
                const response = await appBridge.api({
                    name: 'executeGraphQl',
                    payload: {
                        query: updateAssetTitle(asset.id, newTitle),
                    },
                });

                asset.title = response.updateAsset.asset.title;
                index++;
            } catch (error) {
                console.error('Error renaming asset:', asset.id, error);
            }

            setAssets(assets);
        }

        setRenamingInProgress(false);
        setMatchCount(0);
        setProgressMessage(`Finished renaming ${count} asset${count === 1 ? '' : 's'}`);
    };

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

    useEffect(() => {
        let totalMatchCount = 0;
        const matchedAssets: Asset[] = [];

        assets.forEach((asset) => {
            const { matchCount } = highlightMatches(asset.title, findText);

            if (matchCount > 0) {
                matchedAssets.push(asset);
            }

            totalMatchCount += matchCount;
        });

        setMatchCount(totalMatchCount);
        setMatchingAssets(matchedAssets);
    }, [findText, assets]);

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
                        disabled={!assetsAreFetched}
                        value={findText}
                        onChange={handleFindTextChange}
                        onEnterPressed={() => {}}
                        onBlur={() => {}}
                    />
                    <Text>{getResultCount(matchCount, matchingAssetCount)}</Text>
                </div>
                <div className="tw-flex tw-gap-x-1 tw-items-center">
                    <TextInput
                        id="replace"
                        placeholder="Replace"
                        disabled={!assetsAreFetched}
                        value={replaceText}
                        onChange={handleReplaceTextChange}
                        onEnterPressed={() => {}}
                        onBlur={() => {}}
                    />
                    <Button disabled={matchCount === 0 || renamingInProgress} onPress={renameAssets}>
                        Rename all
                    </Button>
                </div>
                <div className="tw-flex tw-h-4">
                    <Text size="small">{progressMessage}</Text>
                </div>
            </div>
            <div id="file-list">
                {assetsAreFetched ? (
                    assets.map((asset) => {
                        const { highlightedText } = highlightMatches(asset.title, findText);

                        return (
                            <Stack direction="row" marginY={4} key={asset.id}>
                                <Text size="medium">
                                    <span className="tw-text-text">{highlightedText}</span>
                                    <span className="tw-text-text-weak">.{asset.extension}</span>
                                </Text>
                            </Stack>
                        );
                    })
                ) : (
                    <Text size="large" as="em">
                        Gathering names of selected assets ...
                    </Text>
                )}
            </div>
        </div>
    );
};
