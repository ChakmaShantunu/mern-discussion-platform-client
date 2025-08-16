import React from "react";

const FAQSection = () => {
    const faqs = [
        {
            question: "What is this platform about?",
            answer:
                "This platform is a MERN-based discussion forum where users can post, comment, and share ideas with the community.",
        },
        {
            question: "How can I become a member?",
            answer:
                "Simply sign up with your email or social login. Membership unlocks posting, commenting, and special features.",
        },
        {
            question: "Can I contribute resources?",
            answer:
                "Yes! Members can contribute knowledge resources, tutorials, and share experiences to help others.",
        },
        {
            question: "Who can be Member of the Month?",
            answer:
                "Active contributors with valuable posts, comments, and community support are eligible for Member of the Month.",
        },
    ];

    return (
        <section id="faq" className="py-12 bg-base-100">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-lg"
                        >
                            <input type="checkbox" />
                            <div className="collapse-title text-lg font-medium">{faq.question}</div>
                            <div className="collapse-content">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
