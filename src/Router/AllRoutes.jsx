import { Route, Routes } from "react-router-dom";
import { routesConfig } from "../assets/Config/routesConfig";




export default function AllRoutes() {


    return (
        <Routes>
            {
                routesConfig.map((routes, index) => (
                    <Route path={routes.path} element={routes.component} key={index} />
                ))
            }
        </Routes>
    )
}