
import React from "react";

const guidelines = [
    {
        title: "Be Respectful",
        description:
            "Treat all members with kindness. Avoid personal attacks, hate speech, or harassment.",
    },
    {
        title: "Stay On Topic",
        description:
            "Keep discussions relevant to the category. Avoid spam, self-promotion, or unrelated content.",
    },
    {
        title: "Provide Constructive Feedback",
        description:
            "Encourage healthy discussions by offering thoughtful and respectful comments.",
    },
    {
        title: "No Plagiarism",
        description:
            "Share original content or give proper credit to the source of any material.",
    },
    {
        title: "Follow Platform Rules",
        description:
            "Adhere to QuickPost’s terms, and respect moderators' decisions and community policies.",
    },
];

const CommunityGuidelines = () => {
    return (
        <section className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Community <span className="text-primary">Guidelines</span>
                </h2>
                <p className="text-gray-600 mb-12">
                    To keep QuickPost safe and welcoming for everyone, please follow these simple rules.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {guidelines.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommunityGuidelines;
