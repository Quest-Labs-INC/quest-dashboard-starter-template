import { QuestProvider } from "@questlabs/react-sdk";
import "./App.css";
import AllRoutes from "./Router/AllRoutes";
import Loader from "./assets/Misc/Loader";
import { appConfig } from "./assets/Config/appConfig";
import "@questlabs/react-sdk/dist/style.css";
import { useEffect } from "react";
import GeneralFunction from "./assets/Functions/GeneralFunction";
import AppContext from "./Components/Common/AppContext";
import { ProviderConfig } from "./Components/Common/ProviderConfig";

function App() {
  useEffect(() => {
    GeneralFunction.shareInstance.getTheme();
  }, []);

  return (
    <>
      <div>
        <AppContext>
          <ProviderConfig>
            <Loader />
            <AllRoutes />
          </ProviderConfig>
        </AppContext>
      </div>
    </>
  );
}

export default App;
