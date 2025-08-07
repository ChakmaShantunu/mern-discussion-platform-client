import React from 'react';
import { FaCrown, FaMedal } from 'react-icons/fa';

const Badge = ({ role, badge }) => {

    if (role === 'member' || badge === 'gold') {
        badge = {
            label: 'Gold Badge',
            color: 'bg-yellow-500',
            icon: <FaCrown className="text-yellow-200 w-5 h-5" />,
        };
    } else if (role !== 'member') {
        badge = {
            label: 'Bronze Badge',
            color: 'bg-amber-700',
            icon: <FaMedal className="text-yellow-300 w-5 h-5" />,
        };
    }

    if (!badge) return null;

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold ${badge.color}`}>
            {badge.icon}
            {badge.label}
        </div>
    );
};

export default Badge;