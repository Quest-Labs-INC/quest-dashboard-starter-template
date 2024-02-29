import { QuestProvider } from '@questlabs/react-sdk';
import './App.css'
import AllRoutes from './Router/AllRoutes';
import Loader from './assets/Misc/Loader';
import '@questlabs/react-sdk/dist/style.css'
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const appConfig = {
  QUEST_ENTITY_ID: "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3",
  QUEST_ENTITY_NAME: "Quest Labs",
  QUEST_API_KEY: "k-e6ec8094-6eef-4e80-a804-112a63607bf5",
  QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID: "q-a5ebda7b-decf-4d4c-8ae6-174807254f9c",
  GOOGLE_REDIRECT_URI: "http://localhost:3000/login/",
  GOOGLE_CLIENT_ID: "857590091173-lm2tl3nqfvp2thd4nrhqidjuq2hroco8.apps.googleusercontent.com",
  QUEST_GET_STARTED_CAMPAIGN_ID: "q-6a23cba9-b2ac-403c-9425-d47165bd125e",
  QUEST_SEARCH_BAR_CAMPAIGN_ID: '',
}

const contentConfig = {
  login: {
    heading: "Supercharge your User Experience",
    description: "Start your journey to unlocking product-driven growth with Quest 💫"
  }
}

const bgColors = {
  "dark-color-premitive-grey-1": "#cbcbcb",
  "dark-color-premitive-grey-0": "#afafaf",
  "dark-color-premitive-grey-2": "#e2e2e2",
  "dark-color-premitive-grey-3": "#eeeeee",
  "dark-color-premitive-grey-4": "#f6f6f6",
  "dark-color-premitive-grey-5": "#ffffff",

  "dark-primary-bg-color-0": "#1c1a27",
  "dark-primary-bg-color-1": "#fbfafe",
  "dark-primary-bg-color-2": "#111018",
  "dark-primary-bg-color-3": "#1c1a27",
  "dark-primary-bg-color-4": "#3e3a58",

  "dark-primary-tile-color-0": "#f0fcec",
  "dark-primary-border-color": "#455a64",

  "light-color-premitive-grey-0": "#afafaf",
  "light-color-premitive-grey-1": "#757575",
  "light-color-premitive-grey-2": "#545454",
  "light-color-premitive-grey-3": "#333333",
  "light-color-premitive-grey-4": "#141414",
  "light-color-premitive-grey-5": "#000000",

  "light-primary-bg-color-0": "#7B68EE",
  "light-primary-bg-color-1": "#edf3ff",
  "light-primary-bg-color-2": "#ffffff",
  "light-primary-bg-color-3": "#e4e9f7",
  "light-primary-bg-color-4": "#ffffff",

  "light-primary-tile-color-0": "#d7f1f",
  "light-primary-tile-color": "#9a7ada",
}

function App() {

  const [theme, setTheme] = useState('dark');

  useEffect(() => {

    const getTheme = () => {
      let theme = localStorage.getItem("theme");

      if (theme && theme == "dark") {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
    getTheme();

  }, [theme])

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme, bgColors, appConfig, contentConfig }} >
        <div>
          <Loader />
          <QuestProvider
            apiKey={appConfig?.QUEST_API_KEY}
            entityId={appConfig?.QUEST_ENTITY_ID}
            apiType='STAGING'
          >
            <AllRoutes />
          </QuestProvider>
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
