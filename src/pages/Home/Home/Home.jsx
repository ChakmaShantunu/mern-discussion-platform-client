import React from 'react';
import Banner from '../Banner/Banner';
import PostsList from '../PostList/PostList';
import AnnouncementSection from '../../Dashboard/MakeAnnouncement/AnnouncementSection';
import TopContributors from '../TopContributors/TopContributors';
import KnowledgeResources from '../KnowledgeResources/KnowledgeResources';
import MemberOfTheMonth from '../Membership/MemberOfTheMonth';
import FAQSection from '../Faq/FAQSection';
import Subscription from '../Subscription/Subscription';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PostsList></PostsList>
            <AnnouncementSection></AnnouncementSection>
            <TopContributors></TopContributors>
            <FAQSection></FAQSection>
            <Subscription></Subscription>
            <MemberOfTheMonth></MemberOfTheMonth>
            <section id="resources">
                <KnowledgeResources></KnowledgeResources>
            </section>

        </div>
    );
};

export default Home;