import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const TagSection = ({ onTagClick }) => {
    const axiosInstance = useAxios();
    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosInstance.get('/tags')
            return res.data
        }
    })


    if (isLoading) return <p>Loading tags...</p>;
    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => (
                <button
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className="px-3 py-1 bg-white/20"
                >
                    #{tag}
                </button>
            ))}
        </div>
    );
};

export default TagSection;