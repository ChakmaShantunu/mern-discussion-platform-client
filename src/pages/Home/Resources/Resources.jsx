import React from "react";
import { ExternalLink } from "lucide-react";

const resources = [
    {
        id: 1,
        title: "React Documentation",
        description: "Official React docs to learn and reference quickly.",
        link: "https://react.dev/",
    },
    {
        id: 2,
        title: "TailwindCSS Docs",
        description: "Utility-first CSS framework for building custom UIs.",
        link: "https://tailwindcss.com/docs",
    },
    {
        id: 3,
        title: "MongoDB Manual",
        description: "Full guide to MongoDB queries, indexing, and aggregation.",
        link: "https://www.mongodb.com/docs/manual/",
    },
    {
        id: 4,
        title: "Node.js Docs",
        description: "Official Node.js documentation for backend development.",
        link: "https://nodejs.org/en/docs",
    },
];

const Resources = () => {
    return (
        <div data-aos="fade-up" className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Resources</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="shadow-lg rounded-2xl hover:shadow-xl transition bg-base-200"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">
                                {resource.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{resource.description}</p>
                            <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                            >
                                Visit <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
