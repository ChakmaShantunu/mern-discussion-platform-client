
import React from "react";

const tiersInfo = [
    {
        name: "Free",
        description: "Access basic features, create and browse posts, and interact with the community.",
    },
    {
        name: "Premium",
        description: "All Free features + unlimited posts, priority support, and exclusive content access.",
    },
    {
        name: "Pro",
        description: "All Premium features + Pro badge, featured post promotion, and advanced analytics.",
    },
];

const MembershipTiersExplained = () => {
    return (
        <section className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Membership Tiers <span className="text-primary">Explained</span>
                </h2>
                <p className="text-gray-600 mb-12">
                    See the benefits of different membership levels.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiersInfo.map((tier, index) => (
                        <div
                            key={index}
                            className="p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                            <p className="text-gray-600 mb-4">{tier.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MembershipTiersExplained;
