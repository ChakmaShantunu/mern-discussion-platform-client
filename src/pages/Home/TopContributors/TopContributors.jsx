import React from 'react';
import { Link } from 'react-router';

const dummyContributors = [
    {
        id: 1,
        name: "Ayesha Rahman",
        image: "https://i.pravatar.cc/150?img=32",
        role: "Top Voter",
        posts: 24,
        votes: 180,
        link: "/contributors/1"
    },
    {
        id: 2,
        name: "Tanvir Hossain",
        image: "https://i.pravatar.cc/150?img=12",
        role: "Discussion Leader",
        posts: 30,
        votes: 150,
        link: "/contributors/2"
    },
    {
        id: 3,
        name: "Joya Akter",
        image: "https://i.pravatar.cc/150?img=25",
        role: "Most Helpful",
        posts: 18,
        votes: 210,
        link: "/contributors/3"
    },
];

const TopContributors = () => {
    return (
        <div data-aos="fade-up" className="my-24 mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">🔥 Top Contributors</h2>
            <p className="text-gray-600 mb-10">
                Meet the most active and impactful members of our community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dummyContributors.map((contributor, idx) => (
                    <div key={idx} className="bg-base-100 shadow-lg rounded-xl p-6 text-left">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={contributor.image}
                                alt={contributor.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-xl font-semibold">{contributor.name}</h3>
                                <p className="text-sm text-gray-500">{contributor.role}</p>
                            </div>
                        </div>
                        <p className="text-sm">
                            📝 Posts: <strong>{contributor.posts}</strong><br />
                            👍 Votes Received: <strong>{contributor.votes}</strong>
                        </p>

                        <Link
                            to={contributor.link}
                            className="mt-auto text-primary font-medium hover:underline"
                        >
                            See More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopContributors;
