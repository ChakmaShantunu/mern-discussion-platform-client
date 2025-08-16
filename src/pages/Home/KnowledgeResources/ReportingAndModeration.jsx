
import React from "react";

const reportingInfo = [
    {
        title: "Report Inappropriate Content",
        description:
            "If you find a post that violates our community guidelines, click the 'Report' button on the post. Provide a reason, and our moderators will review it promptly.",
    },
    {
        title: "Moderation Process",
        description:
            "Our moderation team monitors reported content to ensure community safety. Posts that violate rules may be removed, and users may receive warnings or account suspension.",
    },
];

const ReportingAndModeration = () => {
    return (
        <section data-aos="fade-up" className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Reporting & <span className="text-primary">Moderation</span>
                </h2>
                <p className="text-gray-600 mb-12">
                    How to report inappropriate content and how moderation works.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reportingInfo.map((item, index) => (
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

export default ReportingAndModeration;
