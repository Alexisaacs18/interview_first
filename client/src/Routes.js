import App from "./App";
import Companies from "./components/Companies/Companies";
import Contacts from "./components/Contacts/Contacts";
import OpenPositions from "./components/OpenPositions/OpenPositions";
import Company from "./components/Companies/Company";
import Contact from "./components/Contacts/Contact";
import OpenPosition from "./components/OpenPositions/OpenPosition";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Companies /> },
            { path: "/company/:id", element: <Company /> },
            { path: "/contacts", element: <Contacts /> },
            { path: "/contacts/:id", element: <Contact /> },
            { path: "/openpositions", element: <OpenPositions /> },
            { path: "/openpositions/:id", element: <OpenPosition /> }
        ]
    }
]

export default routes