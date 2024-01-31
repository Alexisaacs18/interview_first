import App from "./App";
import Companies from "./components/Companies/Companies";
import Contacts from "./components/Contacts/Contacts";
import OpenPositions from "./components/OpenPositions/OpenPositions";
import Company from "./components/Companies/Company";
import Contact from "./components/Contacts/Contact";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Companies /> },
            { path: "/company/:id", element: <Company /> },
            { path: "/contacts", element: <Contacts /> },
            { path: "/contacts/:id", element: <Contact /> },
            { path: "/openpositions", element: <OpenPositions /> }
        ]
    }
]

export default routes