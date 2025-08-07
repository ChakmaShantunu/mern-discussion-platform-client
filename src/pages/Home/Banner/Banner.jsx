import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import TagSection from '../TagSection/TagSection';
import bannerBg from '../../../assets/images/bannerbg.jpg';

const fetchPostsByTag = async (tag, axios) => {
    if (!tag.trim()) return [];
    const res = await axios.get('/posts/search', { params: { tag } });
    return res.data;
};

const Banner = () => {
    const axios = useAxios();
    const [searchTerm, setSearchTerm] = useState('');
    const [tags] = useState(['react', 'javascript', 'css', 'nodejs']);
    const navigate = useNavigate();

    const {
        data: searchResults = [],
        refetch,
        isFetching,
        isError
    } = useQuery({
        queryKey: ['posts', searchTerm],
        queryFn: () => fetchPostsByTag(searchTerm, axios),
        enabled: false,
    });

    const handleSearch = () => {
        if (searchTerm.trim()) {
            refetch();
        }
    };

    const onClickSearch = () => {
        handleSearch();
    };

    const onTagClick = (tag) => {
        setSearchTerm(tag);
        setTimeout(() => {
            handleSearch();
        }, 0);
    };

    return (
        <div data-aos="zoom-in-up"
            className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-cover bg-center flex items-center justify-center px-4"
            style={{ backgroundImage: `url('${bannerBg}')` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-4xl space-y-6 text-white text-center">

                {/* Search Area */}
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 drop-shadow text-info">
                        Search by Tag
                    </h2>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <input
                            type="text"
                            placeholder="Enter tag name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered w-full text-black"
                        />
                        <button
                            onClick={onClickSearch}
                            className="btn w-full sm:w-auto"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Tag List */}
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow max-h-[180px] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-2">Available Tags</h3>
                    <TagSection onTagClick={onTagClick} tags={tags} />
                </div>

                {/* Search Results */}
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow max-h-[200px] overflow-y-auto">
                    {isFetching ? (
                        <p className="text-center text-gray-200">Searching...</p>
                    ) : isError ? (
                        <p className="text-center text-red-400">Error loading data</p>
                    ) : searchResults.length === 0 ? (
                        <p className="text-center text-gray-200">No Data Found</p>
                    ) : (
                        searchResults.map((post) => (
                            <div data-aos="zoom-in-up"
                                key={post._id}
                                onClick={() => navigate(`/postDetails/${post._id}`)}
                                className="p-3 rounded mb-2 shadow bg-white/90 hover:bg-white transition cursor-pointer"
                            >
                                <h3 className="font-semibold text-black">{post.title}</h3>
                                <p className="text-sm text-gray-700">Tags: {post.tags.join(', ')}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

    );
};

export default Banner;
