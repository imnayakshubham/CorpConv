import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log("ErrorBoundary caught an error:", error, errorInfo, window.location);
    }

    render() {
        if (this.state.hasError) {
            return this.props?.fallback ?? <ErrorPage />;
        }

        return this.props.children;
    }
}


const ErrorPage = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="max-w-md text-center">
                <h1 className="text-6xl font-extrabold text-red-500 mb-4 animate-bounce">
                    Oops!
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                    Something went wrong. Please try reloading the page.
                </p>

                <div className='flex gap-2 justify-center items-center'>
                    <button
                        onClick={handleReload}
                        className="px-6 py-3 font-semibold text-white bg-red-500 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                        Reload Page
                    </button>

                    <a
                        href='/'
                        className="px-6 py-3 font-semibold border transition-transform duration-300 transform hover:scale-105 focus:outline-none"
                    >
                        Home Page
                    </a>
                </div>
            </div>

            <div className="absolute bottom-4 text-gray-500 text-sm">
                <p>Contact support if the problem persists.</p>
            </div>
        </div>
    );
};

export default ErrorBoundary;
