import React, { useState } from "react";

const Subscription = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setError("Email is required!");
            setMessage("");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address!");
            setMessage("");
            return;
        }

        setError("");
        setMessage("✅ Subscribed successfully!");
        setEmail("");
    };

    return (
        <section className="bg-base-200 py-16">
            <div className="max-w-2xl mx-auto text-center px-4">
                <h2 className="text-3xl font-bold mb-4">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-base-content/80 mb-6">
                    Stay updated with the latest news, updates, and special offers
                    delivered straight to your inbox.
                </p>

                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-center gap-3"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="input input-bordered w-full sm:flex-1"
                        required
                    />
                    <button type="submit" className="btn btn-primary w-full sm:w-auto">
                        Subscribe
                    </button>
                </form>

                
                {error && <p className="text-red-500 mt-3">{error}</p>}
                {message && <p className="text-green-600 mt-3">{message}</p>}
            </div>
        </section>
    );
};

export default Subscription;
