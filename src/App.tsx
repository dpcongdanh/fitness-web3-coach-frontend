import React, { useEffect } from "react";

import { Refine } from "@pankod/refine-core";
import "./App.css";
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

import {
  TrainerList,
  TrainerShow,
  TrainerEdit,
  TrainerCreate,
} from "pages/trainers";

import { CalendarList } from "pages/calendar";

import { UserList } from "pages/users";

import { PostList, PostShow, PostEdit, PostCreate } from "pages/posts";

import { AccountSettings } from "pages/account-settings";

function App() {
  // const supabaseStorageString: string = localStorage.getItem(
  //   "supabase.auth.token"
  // ) as string;
  // const user_uuid =
  //   supabaseStorageString !== null
  //     ? JSON.parse(supabaseStorageString).currentSession.user.id
  //     : null;

  const dataProviderObj = dataProvider(supabaseClient);

  const liveProviderObj = liveProvider(supabaseClient);

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
              const userIdentity = await authProvider?.getUserIdentity?.();
              // const userProfile = await dataProviderObj.getOne({
              //   resource: "profiles",
              //   id: user_uuid,
              // });
              const userProfile = await dataProviderObj.getOne({
                resource: "profiles",
                id: userIdentity.id,
              });

              console.log(userProfile.data.role);
              const can: any = await enforcer.enforce(
                userProfile.data.role,
                resource,
                action
              );
              return Promise.resolve({ can });
            },
          }}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          dataProvider={dataProviderObj}
          liveProvider={liveProviderObj}
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
              create: TrainerCreate,
              edit: TrainerEdit,
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
              create: PostCreate,
              edit: PostEdit,
            },
            {
              name: "profiles",
              list: UserList,
              // show: UserShow,
              // create: UserCreate,
              // edit: UserEdit,
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
