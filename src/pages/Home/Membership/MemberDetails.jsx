
import React from "react";

const memberDetails = {
    name: "Nusrat Jahan",
    image: "https://i.pravatar.cc/150?img=45",
    role: "Community Hero",
    bio: "A passionate contributor known for her helpful posts, active support, and positive community impact.",
    posts: [
        { id: 1, title: "How to get started with React?", votes: 45 },
        { id: 2, title: "Tips for writing clear posts", votes: 38 },
        { id: 3, title: "Understanding MongoDB Aggregation", votes: 27 },
    ],
    totalPosts: 42,
    totalVotes: 360,
};

const MemberDetails = () => {
    return (
        <section className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex flex-col items-center bg-base-200 p-8 rounded-2xl shadow-md">
                    <img
                        src={memberDetails.image}
                        alt={memberDetails.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-primary mb-4"
                    />
                    <h2 className="text-3xl font-bold mb-2">{memberDetails.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">{memberDetails.role}</p>
                    <p className="text-gray-600 mb-6">{memberDetails.bio}</p>
                    <p className="text-gray-700 font-medium mb-6">
                        📝 Total Posts: {memberDetails.totalPosts} | 👍 Total Votes: {memberDetails.totalVotes}
                    </p>
                </div>

                {/* Member's posts */}
                <div className="mt-12 text-left">
                    <h3 className="text-2xl font-semibold mb-4">Top Posts</h3>
                    <ul className="space-y-4">
                        {memberDetails.posts.map((post) => (
                            <li
                                key={post.id}
                                className="p-4 bg-base-200 rounded-xl shadow hover:shadow-lg transition flex justify-between"
                            >
                                <span className="font-medium">{post.title}</span>
                                <span className="text-gray-500">👍 {post.votes}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default MemberDetails;
