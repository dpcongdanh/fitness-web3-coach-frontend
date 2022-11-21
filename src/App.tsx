import React, { useEffect } from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-mui";

import { newEnforcer } from "casbin";

import { model, adapter } from "./accessControl";

import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import { useTranslation } from "react-i18next";
import { ColorModeContextProvider } from "contexts";
import { supabaseClient } from "utility";
import { Title, Sider, Layout, Header } from "components/layout";
import authProvider from "./authProvider";

import { TrainerList, TrainerShow } from "pages/trainers";

import { CalendarList } from "pages/calendar";

import { UserList } from "pages/users";

import { PostList, PostShow } from "pages/posts";

import { AccountSettings } from "pages/account-settings";

function App() {
  const user_uuid = JSON.parse(
    localStorage.getItem("supabase.auth.token") as string
  ).currentSession.user.id;

  const dataProviderObj = dataProvider(supabaseClient);

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  useEffect(() => {
    document.title = "PT Hunter";
  }, []);

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          accessControlProvider={{
            can: async ({ resource, action, params }) => {
              const enforcer = await newEnforcer(model, adapter);
              const userProfile = await dataProviderObj.getOne({
                resource: "profiles",
                id: user_uuid,
              });
              console.log(userProfile.data.role);
              // console.log(params?.resource);
              const can = await enforcer.enforce(
                userProfile.data.role,
                resource,
                action
              );
              // const can = await enforcer.enforce(
              //   userData?.data.role,
              //   resource,
              //   action
              // );

              return Promise.resolve({ can });
            },
          }}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          dataProvider={dataProviderObj}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/register",
                element: <AuthPage type="register" />,
              },
              {
                path: "/forgot-password",
                element: <AuthPage type="forgotPassword" />,
              },
              {
                path: "/update-password",
                element: <AuthPage type="updatePassword" />,
              },
              {
                element: <AccountSettings />,
                path: "/account-settings",
                layout: true,
              },
            ],
          }}
          LoginPage={() => (
            <AuthPage
              type="login"
              providers={[
                {
                  name: "google",
                  label: "Sign in with Google",
                },
              ]}
              formProps={{
                defaultValues: {
                  email: "info@refine.dev",
                  password: "refine-supabase",
                },
              }}
            />
          )}
          resources={[
            {
              name: "trainers",
              list: TrainerList,
              show: TrainerShow,
              // create: PostCreate,
              // edit: PostEdit,
            },
            {
              name: "calendar",
              list: CalendarList,
              // show: TrainerShow,
              // create: PostCreate,
              // edit: PostEdit,
            },
            {
              name: "posts",
              list: PostList,
              show: PostShow,
              // create: PostCreate,
              // edit: PostEdit,
            },
            {
              name: "profiles",
              list: UserList,
              // show: PostShow,
              // create: PostCreate,
              // edit: PostEdit,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          i18nProvider={i18nProvider}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
