import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CustomHostForm from "./components/CustomHostForm";
import DisplayEvents from "./components/DisplayEvents";
import Home from "./components/Home";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Responses from "./components/Responses";
import EmailForm from "./components/EmailForm";

function App() {
    const { catId } = useParams();
    useEffect(() => {
        console.log(catId);
    }, [catId]);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/events/:eventId"
                        element={<DisplayEventsWithHeader />}
                    />
                    <Route path="/home" element={<HomeWithHeader />} />
                    <Route path="/responses" element={<ResponsesWithHeader />} />
                    <Route path="/register" element={<RegisterWithHeader />} />
                    <Route path="/login" element={<LoginWithHeader />} />
                    <Route
                        path="/email-form/:subject/:message"
                        element={<EmailFormWithHeader />}
                    />
                    <Route
                        path="/customHostForm/:eventType"
                        element={<CustomHostFormWithHeader />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// Wrapper components with AppHeader
const DisplayEventsWithHeader = () => (
    <>
        <DisplayEvents />
    </>
);

const HomeWithHeader = () => (
    <>
        <AppHeader />
        <Home />
    </>
);

const ResponsesWithHeader = () => (
    <>
        <AppHeader />
        <Responses />
    </>
);

const RegisterWithHeader = () => (
    <>
        <AppHeader />
        <Register />
    </>
);

const LoginWithHeader = () => (
    <>
        <AppHeader />
        <Login />
    </>
);

const EmailFormWithHeader = () => (
    <>
        <AppHeader />
        <EmailForm />
    </>
);

const CustomHostFormWithHeader = () => (
    <>
        <AppHeader />
        <CustomHostForm />
    </>
);

export default App;
