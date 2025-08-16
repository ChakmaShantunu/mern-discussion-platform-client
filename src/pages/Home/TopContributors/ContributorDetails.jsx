// src/components/ContributorDetails.jsx
import React from "react";
import { useParams } from "react-router";

const contributors = [
    {
        id: 1,
        name: "Ayesha Rahman",
        image: "https://i.pravatar.cc/150?img=32",
        role: "Top Voter",
        bio: "Ayesha is an active community member known for her insightful votes and consistent contributions across discussions.",
        totalPosts: 24,
        totalVotes: 180,
        topPosts: [
            { id: 1, title: "Understanding React State & Props", votes: 25 },
            { id: 2, title: "Tips for Effective Community Engagement", votes: 30 },
            { id: 3, title: "JavaScript Best Practices", votes: 20 },
        ],
        link: "/contributors/1"
    },
    {
        id: 2,
        name: "Tanvir Hossain",
        image: "https://i.pravatar.cc/150?img=12",
        role: "Discussion Leader",
        bio: "Tanvir leads engaging discussions and encourages community interaction across various topics.",
        totalPosts: 30,
        totalVotes: 150,
        topPosts: [
            { id: 1, title: "Node.js Best Practices", votes: 20 },
            { id: 2, title: "Building Scalable APIs", votes: 25 },
            { id: 3, title: "Async Programming in JS", votes: 15 },
        ],
        link: "/contributors/2"
    },
    {
        id: 3,
        name: "Joya Akter",
        image: "https://i.pravatar.cc/150?img=25",
        role: "Most Helpful",
        bio: "Joya is highly recognized for her helpful answers and support to newcomers in the community.",
        totalPosts: 18,
        totalVotes: 210,
        topPosts: [
            { id: 1, title: "CSS Tricks & Tips", votes: 40 },
            { id: 2, title: "TailwindCSS Components", votes: 35 },
            { id: 3, title: "Responsive Web Design", votes: 25 },
        ],
        link: "/contributors/3"
    },
];

const ContributorDetails = () => {
    const { id } = useParams();
    const contributor = contributors.find((c) => c.id === parseInt(id));

    if (!contributor) {
        return <p className="text-center mt-24">Contributor not found.</p>;
    }

    return (
        <section data-aos="fade-up" className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex flex-col items-center bg-base-200 p-8 rounded-2xl shadow-md">
                    <img
                        src={contributor.image}
                        alt={contributor.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-primary mb-4"
                    />
                    <h2 className="text-3xl font-bold mb-2">{contributor.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">{contributor.role}</p>
                    <p className="text-gray-600 mb-6">{contributor.bio}</p>
                    <p className="text-gray-700 font-medium mb-6">
                        📝 Total Posts: {contributor.totalPosts} | 👍 Total Votes: {contributor.totalVotes}
                    </p>
                </div>

                <div className="mt-12 text-left">
                    <h3 className="text-2xl font-semibold mb-4">Top Posts</h3>
                    <ul className="space-y-4">
                        {contributor.topPosts.map((post) => (
                            <li
                                key={post.id}
                                className="p-4 bg-base-200 rounded-xl shadow hover:shadow-lg transition flex justify-between"
                            >
                                <span className="font-medium">{post.title}</span>
                                <span className="text-gray-500">👍 {post.votes}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ContributorDetails;
