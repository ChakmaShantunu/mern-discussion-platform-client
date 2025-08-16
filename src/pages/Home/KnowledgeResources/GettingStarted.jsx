// src/components/GettingStarted.jsx
import React from "react";

const gettingStartedSteps = [
    {
        title: "Create Your Account",
        description:
            "Sign up with your email or social account to get started. Complete your profile to personalize your experience.",
    },
    {
        title: "Explore the Forum",
        description:
            "Browse posts, categories, and tags to find topics that interest you. Use search to quickly locate discussions.",
    },
    {
        title: "Start Posting",
        description:
            "Click 'Add Post' to share your questions, ideas, or knowledge with the community. Make sure to follow posting best practices.",
    },
    {
        title: "Engage & Interact",
        description:
            "Comment on posts, upvote helpful content, and participate in discussions to connect with other members.",
    },
];

const GettingStarted = () => {
    return (
        <section className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Getting Started with the <span className="text-primary">Forum</span>
                </h2>
                <p className="text-gray-600 mb-12">
                    Learn how to create an account, post, and interact with others.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gettingStartedSteps.map((step, index) => (
                        <div
                            key={index}
                            className="p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600 mb-4">{step.description}</p>
                            <a
                                href="/help"
                                className="text-primary font-medium hover:underline"
                            >
                                Read More →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GettingStarted;
