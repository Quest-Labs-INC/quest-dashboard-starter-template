import { QuestProvider } from "@questlabs/react-sdk";
import "./App.css";
import AllRoutes from "./Router/AllRoutes";
import Loader from "./assets/Misc/Loader";
import "@questlabs/react-sdk/dist/style.css";
import AppContext from "./Components/Common/AppContext";
import { ProviderConfig } from "./Components/Common/ProviderConfig";

function App() {

  return (
    <>
      <div>
        <AppContext>
          {/* <ProviderConfig> */}
            <Loader />
            <AllRoutes />
          {/* </ProviderConfig> */}
        </AppContext>
      </div>
    </>
  );
}

export default App;
