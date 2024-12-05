import { useState } from 'react';

export const Logout = ({ onLogout }: { onLogout: () => void }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            onLogout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
            setShowConfirm(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleLogoutClick}
                disabled={isLoggingOut}
                className="text-left px-4 py-3 text-blue-500 rounded-bl-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Log out</span>
            </button>

            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-black border border-gray-800 rounded-xl p-6 max-w-sm w-full">
                        <h3 className="text-xl font-bold text-white mb-2">Log out of the Bluesky App?</h3>
                        <p className="text-gray-400 mb-6">You can always log back in at any time.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 px-4 py-2 text-white bg-transparent hover:bg-gray-800 rounded-full font-medium border border-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmLogout}
                                disabled={isLoggingOut}
                                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium disabled:opacity-50"
                            >
                                {isLoggingOut ? 'Logging out...' : 'Log out'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
