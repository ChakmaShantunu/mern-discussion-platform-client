import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import JoinUs from "../pages/Authentication/JoinUs/JoinUs";
import Register from "../pages/Authentication/Register/Register";
import PostDetails from "../pages/Home/PostList/PostDetails";
import PrivateRoute from "../routes/PrivateRoute";
import Membership from "../pages/Home/Membership/Membership";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import CommentPage from "../pages/Dashboard/Comment/CommentPage";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "../routes/AdminRoute";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import ReportedComments from "../pages/Dashboard/ReportedComments/ReportedComments";
import AnnouncementSection from "../pages/Dashboard/MakeAnnouncement/AnnouncementSection";
import Forbidden from "../pages/Dashboard/Forbidden/Forbidden";
import GettingStarted from "../pages/Home/KnowledgeResources/GettingStarted";
import PostingBestPractices from "../pages/Home/KnowledgeResources/PostingBestPractices";
import VotingAndRanking from "../pages/Home/KnowledgeResources/VotingAndRanking";
import ReportingAndModeration from "../pages/Home/KnowledgeResources/ReportingAndModeration";
import MembershipTiersExplained from "../pages/Home/KnowledgeResources/MembershipTiersExplained";
import CommunityGuidelines from "../pages/Home/KnowledgeResources/CommunityGuidelines";
import FeaturedDiscussions from "../pages/shared/Footer/FeaturedDiscussions";
import TopContributors from "../pages/shared/Footer/TopContributors";
import TagsAndCategories from "../pages/shared/Footer/TagsAndCategories";
import TermsAndConditions from "../pages/shared/Footer/TermsAndConditions";
import PrivacyPolicy from "../pages/shared/Footer/PrivacyPolicy";
import HelpCenter from "../pages/shared/Footer/HelpCenter";
import AboutQuickPost from "../pages/shared/Footer/AboutQuickPost";
import MemberDetails from "../pages/Home/Membership/MemberDetails";
import ContributorDetails from "../pages/Home/TopContributors/ContributorDetails";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/membership',
                element: <PrivateRoute><Membership></Membership></PrivateRoute>
            },
            {
                path: '/joinUs',
                Component: JoinUs
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/postDetails/:id',
                element: <PostDetails></PostDetails>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/post/${params.id}`, {
                    credentials: 'include'
                })
            },
            {
                path: 'announcementList',
                element: <AnnouncementSection></AnnouncementSection>
            },
            {
                path: 'gettingStarted',
                element: <GettingStarted></GettingStarted>
            },
            {
                path: 'postingBestPractices',
                element: <PostingBestPractices></PostingBestPractices>
            },
            {
                path: 'votingAndRanking',
                element: <VotingAndRanking></VotingAndRanking>
            },
            {
                path: 'reportingAndModeration',
                element: <ReportingAndModeration></ReportingAndModeration>
            },
            {
                path: 'membershipTiersExplained',
                element: <MembershipTiersExplained></MembershipTiersExplained>
            },
            {
                path: 'memberDetails',
                element: <MemberDetails></MemberDetails>
            },
            {
                path: 'communityGuidelines',
                element: <CommunityGuidelines></CommunityGuidelines>
            },
            {
                path: 'featuredDiscussions',
                element: <FeaturedDiscussions></FeaturedDiscussions>
            },
            {
                path: 'contributors/:id',
                element: <ContributorDetails></ContributorDetails>
            },
            {
                path: 'topContributors',
                element: <TopContributors></TopContributors>
            },
            {
                path: 'tagsAndCategories',
                element: <TagsAndCategories></TagsAndCategories>
            },
            {
                path: 'aboutQuickPost',
                element: <AboutQuickPost></AboutQuickPost>
            },
            {
                path: 'termsAndConditions',
                element: <TermsAndConditions></TermsAndConditions>
            },
            {
                path: 'privacyPolicy',
                element: <PrivacyPolicy></PrivacyPolicy>
            },
            {
                path: 'helpCenter',
                element: <HelpCenter></HelpCenter>
            },
            {
                path: '/forbidden',
                element: <Forbidden></Forbidden>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
            {
                path: 'myPosts',
                element: <MyPosts></MyPosts>
            },



            // admin only routes
            {
                path: 'makeAdmin',
                element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
            },
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'announcement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
            },
            {
                path: 'reportedComments',
                element: <AdminRoute><ReportedComments></ReportedComments></AdminRoute>
            }
        ]
    },
    {
        path: '/comments/:postId',
        element: <CommentPage></CommentPage>
    }

])