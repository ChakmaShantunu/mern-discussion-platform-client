
import React, { useState } from "react";

const HelpCenter = () => {
    const faqs = [
        {
            question: "How do I create a post?",
            answer:
                "To create a post, go to the 'Add Post' page from the navigation bar, fill in the required fields, and click Submit.",
        },
        {
            question: "How can I upgrade my membership?",
            answer:
                "You can upgrade your membership by visiting the 'Membership Tiers' section and selecting your preferred plan.",
        },
        {
            question: "What if I forget my password?",
            answer:
                "Click on 'Forgot Password' on the login page and follow the instructions to reset your password.",
        },
        {
            question: "How do I report inappropriate content?",
            answer:
                "Each post has a 'Report' option. Click on it and provide a reason. Our moderators will review it.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    Help <span className="text-primary">Center</span>
                </h2>
                <p className="text-center text-gray-600 mb-12">
                    Find answers to the most common questions or reach out to our support team.
                </p>

                {/* FAQ Section */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-lg p-4 bg-base-200 shadow-sm"
                        >
                            <button
                                className="w-full flex justify-between items-center font-semibold text-lg"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span>{openIndex === index ? "−" : "+"}</span>
                            </button>
                            {openIndex === index && (
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 text-center">
                    <p className="text-gray-700 mb-4">
                        Still need help? Our support team is here for you.
                    </p>
                    {/* <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80">
                        Contact Support
                    </button> */}
                </div>
            </div>
        </section>
    );
};

export default HelpCenter;
