import { Outlet } from "react-router-dom";

// import dei componenti
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <div className="main-container">
                <NavBar />
                <main>
                    <Outlet />
                </main>
            </div>


        </>
    )
}