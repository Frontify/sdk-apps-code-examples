import { useState } from 'react';

type BlueskyLoginProps = {
    onLoginSuccess: (identifier: string, password: string) => Promise<boolean>;
};
export const Login = ({ onLoginSuccess }: BlueskyLoginProps) => {
    const [credentials, setCredentials] = useState({
        identifier: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: { target: { name: string; value: string } }) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await onLoginSuccess(credentials.identifier, credentials.password);
        if (!success) {
            setError('Username or Password is wrong!');
            setCredentials({ identifier: '', password: '' });
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-gray-900 rounded-xl p-6">
            <div className="text-center mb-6">
                <svg className="w-12 h-12 text-blue-500 mx-auto" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="24" fill="currentColor" />
                    <path
                        d="M34 19.5L24 29.5L14 19.5"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <h1 className="text-white text-xl font-bold mt-4">Sign in to Bluesky</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Handle (e.g. user.bsky.social)"
                        value={credentials.identifier}
                        onChange={handleChange}
                        className="w-full bg-black text-white px-4 py-3 rounded-md border border-gray-800 placeholder-gray-600 focus:border-blue-500 outline-none"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="w-full bg-black text-white px-4 py-3 rounded-md border border-gray-800 placeholder-gray-600 focus:border-blue-500 outline-none"
                    />
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button
                    type="submit"
                    disabled={isLoading || !credentials.identifier || !credentials.password}
                    className={`w-full bg-blue-500 text-white font-bold py-3 rounded-full
              ${
                  isLoading || !credentials.identifier || !credentials.password
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
              }
              transition-colors`}
                >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            <div className="mt-6 flex justify-center space-x-4">
                <a
                    href="https://bsky.app/sign-up"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                >
                    Create account
                </a>
            </div>
        </div>
    );
};
