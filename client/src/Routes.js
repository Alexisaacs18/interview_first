import App from "./App";
import Companies from "./components/Companies/Companies";
import Contacts from "./components/Contacts/Contacts";
import OpenPositions from "./components/OpenPositions/OpenPositions";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Companies /> },
            { path: "/contacts", element: <Contacts /> },
            { path: "/openpositions", element: <OpenPositions /> }
        ]
    }
]

export default routes