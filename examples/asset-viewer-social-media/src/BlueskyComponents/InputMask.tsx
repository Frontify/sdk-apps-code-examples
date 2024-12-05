import { useState } from 'react';

type BlueSkyInputMaskProps = {
    imageSrc: string;
    onSubmit: (input: string) => void;
};

export const InputMask = ({ imageSrc, onSubmit }: BlueSkyInputMaskProps) => {
    const [post, setPost] = useState('');
    const [charCount, setCharCount] = useState(300);

    const handlePostChange = (input: string) => {
        setPost(input);
        setCharCount(300 - input.length);
    };

    const onSubmitInput = () => {
        onSubmit(post);
    };
    return (
        <div className="w-full max-w-2xl bg-[#161e27] text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <img
                        className="rounded-full"
                        alt=""
                        draggable="false"
                        src="https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:mf3v5yiwchlvkrhqrfofdjxn/bafkreif6bim4ci67uw3hymet2x5odo27zh67bee423adimxdi6kuldu4dy@jpeg"
                    />
                </div>

                <div className="flex-1">
                    <textarea
                        value={post}
                        onChange={(e) => handlePostChange(e.target.value)}
                        placeholder="What's up?"
                        className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-gray-500 text-lg"
                        rows={3}
                    />
                    <div className="relative mt-2 rounded-2xl overflow-hidden">
                        <img src={imageSrc} className="w-1/3 rounded-2xl" />
                    </div>
                    <div className="border-t border-gray-700 mt-3 pt-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1"></div>

                            <div className="flex items-center space-x-3">
                                {charCount > 0 && <span className="text-sm text-gray-400">{charCount}</span>}
                                <button
                                    className={`px-4 py-1.5 rounded-full font-bold ${
                                        post.length === 0
                                            ? 'bg-blue-500/50 text-gray-300 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                    disabled={post.length === 0}
                                    onClick={onSubmitInput}
                                >
                                    Post
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center text-blue-500 text-sm">
                            <svg
                                className="w-4 h-4 mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            <span>Anybody can interact</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
