
import React from "react";

const AboutQuickPost = () => {
    return (
        <section data-aos="fade-up" className="bg-base-100 py-12 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    About <span className="text-primary">QuickPost</span>
                </h2>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                    QuickPost is a modern discussion and knowledge-sharing platform where
                    users can create posts, engage in meaningful discussions, upvote
                    quality content, and connect with a vibrant community. Whether you are
                    a learner, a mentor, or just someone curious — QuickPost gives you the
                    right space to share your ideas.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 shadow-md rounded-xl bg-base-200">
                        <h3 className="font-semibold text-lg mb-2">✨ Easy Posting</h3>
                        <p className="text-sm text-gray-600">
                            Share your thoughts quickly with a simple and user-friendly post
                            editor.
                        </p>
                    </div>

                    <div className="p-6 shadow-md rounded-xl bg-base-200">
                        <h3 className="font-semibold text-lg mb-2">👍 Voting System</h3>
                        <p className="text-sm text-gray-600">
                            Discover the best content through an interactive upvote and
                            downvote system.
                        </p>
                    </div>

                    <div className="p-6 shadow-md rounded-xl bg-base-200">
                        <h3 className="font-semibold text-lg mb-2">🌍 Community</h3>
                        <p className="text-sm text-gray-600">
                            Connect with learners and experts in a positive and engaging
                            environment.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutQuickPost;
