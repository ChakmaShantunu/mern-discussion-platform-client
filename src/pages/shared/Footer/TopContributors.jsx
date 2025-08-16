
import React from "react";

const contributors = [
    {
        id: 1,
        name: "Alice",
        contributions: 120,
        avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: 2,
        name: "Bob",
        contributions: 95,
        avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
        id: 3,
        name: "Charlie",
        contributions: 75,
        avatar: "https://i.pravatar.cc/150?img=3",
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
                {contributors.map((contributor, idx) => (
                    <div key={idx} className="bg-base-100 shadow-lg rounded-xl p-6 text-left">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={contributor.avatar}
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopContributors;
