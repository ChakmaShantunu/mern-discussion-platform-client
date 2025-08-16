
import React from "react";

const PrivacyPolicy = () => {
    return (
        <section data-aos="fade-up" className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    Privacy <span className="text-primary">Policy</span>
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                    At QuickPost, we value your privacy. This policy explains how we
                    collect, use, and protect your personal information.
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
                        <p className="text-gray-600">
                            We may collect information such as your name, email address,
                            profile details, and usage activity when you sign up or use our
                            services.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">2. How We Use Your Information</h3>
                        <p className="text-gray-600">
                            Your data helps us provide a better experience, improve our
                            platform, enable communication, and ensure community safety.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">3. Data Protection</h3>
                        <p className="text-gray-600">
                            We use industry-standard security measures to protect your
                            information. However, no method of transmission online is 100%
                            secure.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">4. Sharing of Information</h3>
                        <p className="text-gray-600">
                            We do not sell or rent your personal data. We may share limited
                            information with trusted partners or if required by law.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">5. Your Choices</h3>
                        <p className="text-gray-600">
                            You can update or delete your account anytime. You also control
                            what personal information you share on QuickPost.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">6. Changes to Policy</h3>
                        <p className="text-gray-600">
                            We may update this Privacy Policy from time to time. Updates will
                            be posted on this page with a revised date.
                        </p>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mt-10 text-center">
                    Last updated: August 16, 2025
                </p>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
