export const PostConfirmation = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>

                <h2 className="text-white text-xl font-bold mb-2">Post sent!</h2>

                <p className="text-gray-400 mb-6">Your post was sent successfully. </p>

                <div className="flex gap-3 w-full">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
