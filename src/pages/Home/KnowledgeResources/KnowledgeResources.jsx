import React from 'react';
import { Link } from 'react-router';

const resources = [
    {
        title: "Getting Started with the Forum",
        description: "Learn how to create an account, post, and interact with others.",
        link: "/gettingStarted"
    },
    {
        title: "Community Guidelines",
        description: "Understand the rules and values that shape our platform.",
        link: "/guides/community-guidelines"
    },
    {
        title: "Posting Best Practices",
        description: "Tips for writing clear, helpful, and engaging posts.",
        link: "/guides/posting-best-practices"
    },
    {
        title: "Voting and Ranking System",
        description: "How upvotes and downvotes impact content visibility.",
        link: "/guides/voting-system"
    },
    {
        title: "Membership Tiers Explained",
        description: "See the benefits of different membership levels.",
        link: "/guides/membership"
    },
    {
        title: "Reporting and Moderation",
        description: "How to report inappropriate content and how moderation works.",
        link: "/guides/reporting"
    },
];

const KnowledgeResources = () => {
    return (
        <div data-aos="fade-up" className="my-24 mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">📚 Knowledge Resources</h2>
            <p className="text-gray-600 mb-10">
                Explore helpful guides, tutorials, and community documentation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {resources.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-base-100 shadow-md rounded-xl p-6 border border-gray-200 hover:border-info transition duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                        {/* <a
                            href={item.link}
                            className="text-primary font-semibold hover:underline"
                        >
                            Read More →
                        </a> */}
                        <Link to={item.link} className="text-primary font-semibold hover:underline">
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeResources;
