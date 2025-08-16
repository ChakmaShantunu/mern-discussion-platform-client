import React from 'react';
import { Link } from 'react-router';

const featuredMember = {
    name: "Nusrat Jahan",
    image: "https://i.pravatar.cc/150?img=45",
    bio: "A passionate contributor known for her helpful posts, active support, and positive community impact.",
    posts: 42,
    votes: 360,
    role: "Community Hero"
};

const MemberOfTheMonth = () => {
    return (
        <div data-aos="fade-up" className="my-24 max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">🏆 Member of the Month</h2>
            <p className="text-gray-500 mb-10">
                Celebrating outstanding contribution and positive impact in our community.
            </p>

            <Link to="memberDetails">
                <div className="bg-base-100 shadow-lg rounded-xl p-8 flex flex-col items-center">
                    <img
                        src={featuredMember.image}
                        alt={featuredMember.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary mb-4"
                    />
                    <h3 className="text-2xl font-semibold">{featuredMember.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{featuredMember.role}</p>
                    <p className="text-gray-500 text-sm mb-4">{featuredMember.bio}</p>
                    <p className="text-sm">
                        📝 Posts: <strong>{featuredMember.posts}</strong> | 👍 Votes: <strong>{featuredMember.votes}</strong>
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default MemberOfTheMonth;
