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
            <section className='py-12'>
                <Banner></Banner>
            </section>
            <section className='py-12'>
                <PostsList></PostsList>
            </section>
            <section className='py-12'>
                <AnnouncementSection></AnnouncementSection>
            </section>
            <section className='py-12'>
                <TopContributors></TopContributors>
            </section>
            <section className='py-12'>
                <FAQSection></FAQSection>
            </section>
            <section className='py-12'>
                <Subscription></Subscription>
            </section>
            <section className='py-12'>
                <MemberOfTheMonth></MemberOfTheMonth>
            </section>
            <section id="resources" className='py-12 px-4 md:px-8 lg:px-16'>
                <KnowledgeResources></KnowledgeResources>
            </section>

        </div>
    );
};

export default Home;