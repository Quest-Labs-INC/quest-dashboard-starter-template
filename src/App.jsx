import { QuestProvider } from '@questlabs/react-sdk';
import './App.css'
import AllRoutes from './Router/AllRoutes';
import Loader from './assets/Misc/Loader';
import { appConfig } from './assets/Config/appConfig';
import '@questlabs/react-sdk/dist/style.css'
import { useEffect } from 'react';
import GeneralFunction from './assets/Functions/GeneralFunction';

function App() {

  useEffect(() => {
    GeneralFunction.shareInstance.getTheme()
  }, [])

  return (
    <>
      <div>
        <Loader/>
        <QuestProvider
          apiKey={appConfig?.API_KEY}
          entityId={appConfig?.ENTITY_ID}
          apiType='STAGING'
        >
          <AllRoutes/>
        </QuestProvider>
      </div>
    </>
  )
}

export default App
