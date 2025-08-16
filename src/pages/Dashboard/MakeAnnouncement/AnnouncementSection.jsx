import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';

const AnnouncementSection = () => {
    const axiosSecure = useAxiosSecure();

    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            console.log(res.data);
            return res.data;

        }
    });

    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    if (announcements.length === 0) return null;

    return (
        <section data-aos="fade-up" className="p-6 rounded mx-auto mb-24 shadow">
            {/* Section Heading */}
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold mb-2">📢 Announcements</h2>
                <p className="">
                    Stay updated with the latest platform-wide news, system updates, and important alerts.
                </p>
            </div>

            {/* Announcement List */}
            <ul className="space-y-6">
                {announcements.map((announcement) => (
                    <li
                        key={announcement._id}
                        className="p-4 bg-base-100 rounded-lg shadow transition-shadow duration-300 hover:shadow-md relative"
                        onClick={() => setSelectedAnnouncement(announcement)}
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <img
                                src={announcement.authorImage}
                                alt={announcement.authorName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold">{announcement.authorName}</p>
                                <p className="text-xs text-gray-500">{new Date(announcement.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{announcement.title}</h3>
                        <p>{announcement.description.slice(0, 50)}...</p>

                        {selectedAnnouncement?._id === announcement._id && (
                            <div className="absolute left-0 top-full mt-2 w-full bg-base-100 p-4 rounded-lg shadow-lg z-10">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent parent li click
                                        setSelectedAnnouncement(null);
                                    }}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
                                >
                                    ✕
                                </button>

                                <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
                                <p>{announcement.description}</p>
                            </div>
                        )}
                    </li>

                ))}
            </ul>
        </section>

    );
};

export default AnnouncementSection;
