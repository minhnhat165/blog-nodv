import { lazy } from "react";
import AccountTab from "../pages/setting/tab/AccountTab";
import NotificationsTab from "../pages/setting/tab/NotificationsTab";
import PublishedTab from "../pages/setting/tab/PublishedTab";
import AboutTab from "../pages/Profile/tab/AboutTab";
import HomeTab from "../pages/Profile/tab/HomeTab";
import ListTab from "../pages/Profile/tab/ListTab";
const BookmarkPage = lazy(() => import("../pages/bookmark"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const NotificationsPage = lazy(() => import("../pages/notifications"));
const StoriesPage = lazy(() => import("../pages/stories/StoriesPage"));
const PostPage = lazy(() => import("../pages/post/PostPage"));
const WritePage = lazy(() => import("../pages/write/WritePage"));
const SettingPage = lazy(() => import("../pages/setting/SettingPage"));
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage"));

const routes = {
  home: "/",
  post: "/post/:id",
  notifications: "/notifications",
  bookmark: "/bookmark",
  stories: "/stories",
  write: "/write",
  setting: "/setting",
  profile: "/profile",
};
export const routesWithComponents = [
  {
    path: routes.home,
    component: HomePage,
  },
  {
    path: routes.notifications,
    component: NotificationsPage,
  },
  {
    path: routes.bookmark,
    component: BookmarkPage,
  },
  {
    path: routes.stories,
    component: StoriesPage,
  },
  {
    path: routes.write,
    component: WritePage,
  },
  {
    path: routes.post,
    component: PostPage,
  },
  {
    path: routes.setting,
    component: SettingPage,
    children: [
      { path: "", component: AccountTab },
      { path: "published", component: PublishedTab },
      { path: "notifications", component: NotificationsTab },
    ],
  },
  {
    path: routes.profile,
    component: ProfilePage,
    children: [
      { path: "", component: HomeTab },
      { path: "list", component: ListTab },
      { path: "about", component: AboutTab },
    ],
  },
];

export default routes;
