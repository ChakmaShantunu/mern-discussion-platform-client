import React from 'react';
import Banner from '../Banner/Banner';
import PostsList from '../PostList/PostList';
import AnnouncementSection from '../../Dashboard/MakeAnnouncement/AnnouncementSection';
import TopContributors from '../TopContributors/TopContributors';
import KnowledgeResources from '../KnowledgeResources/KnowledgeResources';
import MemberOfTheMonth from '../Membership/MemberOfTheMonth';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PostsList></PostsList>
            <AnnouncementSection></AnnouncementSection>
            <TopContributors></TopContributors>
            <MemberOfTheMonth></MemberOfTheMonth>
            <KnowledgeResources></KnowledgeResources>
            
        </div>
    );
};

export default Home;