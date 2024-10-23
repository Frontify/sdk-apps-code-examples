import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { useEffect, useState } from 'react';
import { getAssetsByIds } from './helpers/graphql';
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

const getResultCount = (count: number) => {
    if (count === 0) {
        return 'No matches';
    }

    return `${count} match${count === 1 ? '' : 'es'}`;
};

export const App = () => {
    const appBridge = new AppBridgePlatformApp();
    const context = appBridge.context().get();

    const [assets, setAssets] = useState<{ previewUrl: string; title: string; extension: string }[]>([]);
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [matchCount, setMatchCount] = useState(0);

    const assetsAreFetched = assets.length > 0;

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
        assets.forEach((asset) => {
            const { matchCount } = highlightMatches(asset.title, findText);
            totalMatchCount += matchCount;
        });
        setMatchCount(totalMatchCount);
    }, [findText, assets]);

    const renameAssets = () => {
        console.log('about to rename...');
    };

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
                        onChange={setFindText}
                        onEnterPressed={() => {}}
                        onBlur={() => {}}
                    />
                    <Text>{getResultCount(matchCount)}</Text>
                </div>
                <div className="tw-flex tw-gap-x-1">
                    <TextInput
                        id="replace"
                        placeholder="Replace"
                        disabled={!assetsAreFetched}
                        value={replaceText}
                        onChange={setReplaceText}
                        onEnterPressed={() => {}}
                        onBlur={() => {}}
                    />
                    <Button disabled={matchCount === 0} onPress={renameAssets}>
                        Rename all
                    </Button>
                </div>
            </div>
            <div id="file-list">
                {assetsAreFetched ? (
                    assets.map((asset, index) => {
                        const { highlightedText } = highlightMatches(asset.title, findText);

                        return (
                            <Stack direction="row" marginY={4} key={index}>
                                <Text size="medium">
                                    <span className="tw-text-text">{highlightedText}</span>
                                    <span className="tw-text-text-weak">.{asset.extension}</span>
                                </Text>
                            </Stack>
                        );
                    })
                ) : (
                    <Text size="large" as="em">
                        Gathering filenames of selected assets ...
                    </Text>
                )}
            </div>
        </div>
    );
};
