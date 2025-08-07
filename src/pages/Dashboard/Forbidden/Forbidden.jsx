
import { FaBan } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
            <FaBan className="text-red-500 text-6xl mb-4" />
            <h1 className="text-4xl font-bold mb-2">403 - Forbidden</h1>
            <p className="text-lg text-gray-500 mb-6">
                You don't have permission to access this page.
            </p>
            <Link to="/" className="btn btn-primary">
                Go to Home
            </Link>
        </div>
    );
};

export default Forbidden;
