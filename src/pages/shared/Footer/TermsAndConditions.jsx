
import React from "react";

const TermsAndConditions = () => {
    return (
        <section data-aos="fade-up" className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    Terms & <span className="text-primary">Conditions</span>
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                    By accessing or using QuickPost, you agree to comply with the following
                    terms and conditions. Please read them carefully.
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h3>
                        <p className="text-gray-600">
                            By using QuickPost, you agree to these Terms & Conditions and our
                            Privacy Policy. If you do not agree, please discontinue using the
                            platform.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">2. User Responsibilities</h3>
                        <p className="text-gray-600">
                            You are responsible for maintaining the confidentiality of your
                            account and ensuring your activities follow community guidelines.
                            Any misuse of the platform may lead to suspension.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">3. Content Ownership</h3>
                        <p className="text-gray-600">
                            Users retain ownership of the content they create. However, by
                            posting on QuickPost, you grant us a license to display and share
                            your content within the platform.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">4. Prohibited Activities</h3>
                        <p className="text-gray-600">
                            You may not use QuickPost for illegal activities, spamming,
                            harassment, or distributing harmful content. Violations may result
                            in termination of your account.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">5. Limitation of Liability</h3>
                        <p className="text-gray-600">
                            QuickPost is not responsible for any damages, losses, or disputes
                            arising from the use of the platform or third-party content.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">6. Changes to Terms</h3>
                        <p className="text-gray-600">
                            We may update these Terms & Conditions at any time. Continued use
                            of the platform after updates means you accept the revised terms.
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

export default TermsAndConditions;
