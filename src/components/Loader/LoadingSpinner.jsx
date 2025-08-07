// components/LoadingSpinner.jsx

const LoadingSpinner = ({ text = "Loading ..." }) => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
            <div className="w-14 h-14 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            <p className="mt-4 text-blue-600 dark:text-blue-300 text-sm font-medium">{text}</p>
        </div>
    );
};

export default LoadingSpinner;
