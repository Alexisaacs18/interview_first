import App from "./App";
import Companies from "./components/Compnaies/Companies";
import Contacts from "./components/Contacts/Contacts";
import OpenPositions from "./components/OpenPositions/OpenPositions";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Companies /> },
            { path: "/contacts", element: <Contacts /> },
            { path: "/OpenPositions", element: <OpenPositions /> }
        ]
    }
]

export default routes