
import React, { useState } from "react";

const TagsAndCategories = () => {
    const categories = ["Programming", "Design", "Education", "Lifestyle", "Technology"];
    const tags = ["React", "Node.js", "MongoDB", "TailwindCSS", "Express", "JavaScript"];

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);

    return (
        <section className="bg-base-100 py-16 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    Tags & <span className="text-primary">Categories</span>
                </h2>
                <p className="text-center text-gray-600 mb-12">
                    Browse posts by category or explore popular tags to find what interests you.
                </p>

                {/* Categories */}
                <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg border transition ${selectedCategory === cat
                                        ? "bg-primary text-white border-primary"
                                        : "bg-base-200 hover:bg-primary/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-3 py-1 text-sm rounded-full cursor-pointer border transition ${selectedTag === tag
                                        ? "bg-primary text-white border-primary"
                                        : "bg-base-200 hover:bg-primary/10"
                                    }`}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Selected Filter Info */}
                {(selectedCategory || selectedTag) && (
                    <div className="mt-10 p-4 bg-base-200 rounded-lg text-center">
                        <p className="text-gray-700">
                            {/* Showing posts in{" "} */}
                            <span className="font-semibold text-primary">
                                {selectedCategory ? selectedCategory : ""}{" "}
                                {selectedTag ? `#${selectedTag}` : ""}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TagsAndCategories;
