import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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
                {announcements.map(({ _id, authorName, authorImage, title, description, createdAt }) => (
                    <li
                        key={_id}
                        className="p-4 bg-base-100 rounded-lg shadow transition-shadow duration-300 hover:shadow-md"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <img
                                src={authorImage}
                                alt={authorName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold">{authorName}</p>
                                <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{title}</h3>
                        <p className="">{description}</p>
                    </li>
                ))}
            </ul>

        </section>

    );
};

export default AnnouncementSection;
