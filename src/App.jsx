import { QuestProvider } from '@questlabs/react-sdk';
import './App.css'
import AllRoutes from './Router/AllRoutes';
import Loader from './assets/Misc/Loader';
import '@questlabs/react-sdk/dist/style.css'
import { Toaster } from 'react-hot-toast';
import MainPage from './Components/MainPage/MainPage';
import AppContext from './Components/Common/appContext';




function App() {

  return (
    <>
      <AppContext>
        <div>
          <Loader />
          <Toaster
            position="top-right"
          />
            <AllRoutes />
            {/* <MainPage/> */}
        </div>
      </AppContext>
    </>
  )
}

export default App
