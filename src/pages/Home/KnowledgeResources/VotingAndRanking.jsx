
import React from "react";

const votingInfo = [
    {
        title: "Upvotes & Downvotes",
        description:
            "Users can upvote posts they find helpful or interesting, and downvote posts that are irrelevant or low quality. Votes determine the post’s popularity.",
    },
    {
        title: "Impact on Visibility",
        description:
            "Posts with higher upvotes appear at the top of relevant feeds and search results. This ensures the best content gets more exposure.",
    },
    {
        title: "Fair Ranking",
        description:
            "Our ranking system considers votes, post age, and engagement to provide a fair visibility for all content.",
    },
];

const VotingAndRanking = () => {
    return (
        <section className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Voting & <span className="text-primary">Ranking System</span>
                </h2>
                <p className="text-gray-600 mb-12">
                    How upvotes and downvotes impact content visibility.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {votingInfo.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VotingAndRanking;
