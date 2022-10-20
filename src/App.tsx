import React from "react";

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

import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import { useTranslation } from "react-i18next";
import { ColorModeContextProvider } from "contexts";
import { supabaseClient } from "utility";
import { Title, Sider, Layout, Header } from "components/layout";
import authProvider from "./authProvider";

import { TrainerList, TrainerShow, PostCreate, PostEdit } from "pages/trainers";

import { CalendarList } from "pages/calendar";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          dataProvider={dataProvider(supabaseClient)}
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
