
import React, { useEffect, useState } from "react";

const dummyDiscussions = [
    {
        id: 1,
        title: "How to Master React in 2025?",
        author: "Alice",
        date: "Aug 10, 2025",
        votes: 120,
    },
    {
        id: 2,
        title: "Node.js vs Deno: Which one to choose?",
        author: "Bob",
        date: "Aug 12, 2025",
        votes: 95,
    },
    {
        id: 3,
        title: "TailwindCSS Tips & Tricks",
        author: "Charlie",
        date: "Aug 14, 2025",
        votes: 75,
    },
];

const FeaturedDiscussions = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        setDiscussions(dummyDiscussions);
    }, []);

    return (
        <section className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    Featured <span className="text-primary">Discussions</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {discussions.map((discussion) => (
                        <div
                            key={discussion.id}
                            className="p-6 rounded-2xl shadow-md bg-base-200 hover:shadow-lg transition"
                        >
                            <h3 className="font-semibold text-lg mb-2">{discussion.title}</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                By {discussion.author} | {discussion.date}
                            </p>
                            <p className="text-sm font-medium">Votes: {discussion.votes}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedDiscussions;
