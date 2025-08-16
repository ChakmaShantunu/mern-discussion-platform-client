
import React from "react";

const bestPractices = [
    {
        title: "Write Clear Titles",
        description:
            "Use descriptive titles that summarize your post. Clear titles help others understand the topic quickly.",
    },
    {
        title: "Be Concise & Relevant",
        description:
            "Keep your content focused on the topic. Avoid unnecessary information and stay on point.",
    },
    {
        title: "Provide Examples",
        description:
            "Include examples, screenshots, or code snippets to make your post more helpful and easy to understand.",
    },
    {
        title: "Engage with Comments",
        description:
            "Respond to questions or feedback on your posts to encourage discussion and improve engagement.",
    },
];

const PostingBestPractices = () => {
    return (
        <section data-aos="fade-up" className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Posting <span className="text-primary">Best Practices</span>
                </h2>
                <p className="text-gray-600 mb-12">
                    Tips for writing clear, helpful, and engaging posts.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bestPractices.map((item, index) => (
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

export default PostingBestPractices;
