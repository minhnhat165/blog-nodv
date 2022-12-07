import React, { lazy, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import SuspenseProgress from '../components/SuspenseProgress/SuspenseProgress';
import Layout, { layouts } from '../layouts/Layout';
import PeopleTab from '../pages/search/components/PeopleTab';
import StoriesTab from '../pages/search/components/StoriesTab';
import TopicsTab from '../pages/search/components/TopicsTab';
import ProtectedRoutes from './ProtectedRoutes';
const RedirectLogin = lazy(() => import('../pages/auth/RedirectLogin'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage'));
const AccountTab = lazy(() => import('../pages/setting/tab/AccountTab'));
const NotificationsTab = lazy(() =>
	import('../pages/setting/tab/NotificationsTab')
);
const PublishedTab = lazy(() => import('../pages/setting/tab/PublishedTab'));
const PickTopicPage = lazy(() => import('../pages/topic/PickTopicPage'));
const BookmarkPage = lazy(() => import('../pages/bookmark'));
const HomePage = lazy(() => import('../pages/home/HomePage'));
const NotificationsPage = lazy(() => import('../pages/notifications'));
const StoriesPage = lazy(() => import('../pages/stories/StoriesPage'));
const PostPage = lazy(() => import('../pages/post/PostPage'));
const WritePage = lazy(() => import('../pages/write/WritePage'));
const SettingPage = lazy(() => import('../pages/setting/SettingPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const HomePageLogout = lazy(() => import('../pages/home/HomePageLogout'));

export const appRoutes = {
	HOME: '/',
	HOME_TAB: '/:tab',
	POST: '/posts',
	POST_DETAIL: '/posts/:id',
	NOTIFICATION: '/notification',
	BOOKMARK: '/bookmark',
	STORIES: '/stories',
	WRITE: '/write',
	WRITE_EDIT: '/write/:id',
	SETTING: '/setting',
	SETTING_ACCOUNT: '/setting',
	SETTING_NOTIFICATION: '/setting/notification',
	SETTING_PUBLISHED: '/setting/published',
	AUTH: '/oauth2',
	AUTH_REDIRECT: '/oauth2/redirect',
	AUTH_LOGIN: '/oauth2/login',
	PROFILE: '/profile',
	PROFILE_USER: '/profile/:email',
	COMPONENT: '/component',
	TOPIC: '/topic',
	TOPIC_PICK: '/topic/pick',
	SEARCH: '/search',
	SEARCH_STORIES: '/search/posts',
	SEARCH_PEOPLE: '/search/users',
	SEARCH_TOPICS: '/search/topics',
};

export const routeConfig = [
	{
		path: appRoutes.HOME,
		element: <HomePageLogout />,
		protected: false,
		layout: layouts.HEADER_ONLY,
	},

	{
		path: appRoutes.POST,
		element: <PostPage />,
		protected: false,
		layout: layouts.DEFAULT,
		children: [
			{
				path: appRoutes.POST_DETAIL,
				element: <PostPage />,
			},
		],
	},
	{
		path: appRoutes.NOTIFICATION,
		element: <NotificationsPage />,
		protected: true,
		layout: layouts.DEFAULT,
	},
	{
		path: appRoutes.BOOKMARK,
		element: <BookmarkPage />,
		protected: true,
		layout: layouts.DEFAULT,
	},
	{
		path: appRoutes.STORIES,
		element: <StoriesPage />,
		protected: true,
		layout: layouts.DEFAULT,
	},
	{
		path: appRoutes.WRITE,
		element: <WritePage />,
		protected: true,
		layout: layouts.DEFAULT,
		children: [
			{
				path: appRoutes.WRITE_EDIT,
				element: <WritePage />,
			},
		],
	},
	{
		path: appRoutes.SETTING,
		element: <SettingPage />,
		protected: true,
		layout: layouts.DEFAULT,
		children: [
			{
				path: appRoutes.SETTING_ACCOUNT,
				element: <AccountTab />,
			},
			{
				path: appRoutes.SETTING_NOTIFICATION,
				element: <NotificationsTab />,
			},
			{
				path: appRoutes.SETTING_PUBLISHED,
				element: <PublishedTab />,
			},
		],
	},

	{
		path: appRoutes.AUTH,
		layout: layouts.NONE,
		children: [
			{ path: appRoutes.AUTH_REDIRECT, element: <RedirectLogin /> },
			{ path: appRoutes.AUTH_LOGIN, element: <LoginPage /> },
		],
	},
	{
		path: appRoutes.PROFILE,
		protected: true,
		layout: layouts.DEFAULT,
		children: [
			{
				path: appRoutes.PROFILE_USER,
				element: <ProfilePage />,
			},
		],
	},
	{
		path: appRoutes.TOPIC,
		protected: false,
		layout: layouts.NONE,
		children: [
			{
				path: appRoutes.TOPIC_PICK,
				element: <PickTopicPage />,
			},
		],
	},
	{
		path: appRoutes.SEARCH,
		protected: false,
		layout: layouts.DEFAULT,
		element: <SearchPage />,
		children: [
			{
				path: appRoutes.SEARCH_STORIES,
				element: <StoriesTab />,
			},
			{
				path: appRoutes.SEARCH_PEOPLE,
				element: <PeopleTab />,
			},
			{
				path: appRoutes.SEARCH_TOPICS,
				element: <TopicsTab />,
			},
		],
	},
];

const AppRoutes = () => {
	const { isLogin } = useSelector((state) => state.user.data);
	const routes = useMemo(() => {
		const protectedRoutes = {
			element: <ProtectedRoutes />,
			children: [],
		};
		const publicRoutesRoutes = {
			children: [],
		};
		routeConfig.forEach((route) => {
			if (route.protected) {
				protectedRoutes.children.push(route);
				return;
			}

			if (route.path === appRoutes.HOME && isLogin) {
				publicRoutesRoutes.children.push({
					path: appRoutes.HOME,
					element: <HomePage />,
					protected: false,
					layout: layouts.DEFAULT,
					children: [
						{
							path: appRoutes.HOME_TAB,
							element: <HomePage />,
							protected: false,
						},
					],
				});
			} else publicRoutesRoutes.children.push(route);
		});

		return [protectedRoutes, publicRoutesRoutes];
	}, [isLogin]);

	const routeElements = useRoutes(routes);

	return (
		<Layout>
			<SuspenseProgress>{routeElements}</SuspenseProgress>
		</Layout>
	);
};

export default memo(AppRoutes);
