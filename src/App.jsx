import AuthPage from "./assets/pages/AuthPage/AuthPage";
import "./assets/global/globalStyle.scss";
import ForgotPassword from "./assets/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./assets/pages/ResetPassword/ResetPassword";
import Navbar from "./assets/components/Main/Navbar/Navbar";
import Main from "./assets/pages/Main/Main";
import SideBar from "./assets/components/Main/Sidebar/SideBar";
import Settings from "./assets/pages/Settings/Settings";
import WorkspaceTasks from "./assets/pages/WorspaceTasks/WorkspaceTasks";
import NetworkIssue from "./assets/components/NetworkIssue/NetworkIssue";
import NotFound from "./assets/pages/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import Layout from "./assets/components/Layout";
import RequireAuth from "./assets/components/RequireAuth";
// import Spinner from "./assets/components/Spinner/Spinner";

function App() {
  return (
    // <main className="App">
    //   <AuthPage />
    //   {/* <ForgotPassword /> */}
    //   {/* <ResetPassword /> */}
    //   {/* <Navbar /> */}
    //   {/* <SideBar /> */}
    //   {/* <Main /> */}
    //   {/* <Settings /> */}
    //   {/* <WorkspaceTasks /> */}
    //   {/* <NetworkIssue /> */}
    //   {/* <NotFound /> */}
    //   {/* <Spinner /> */}
    // </main>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public Routes */}
        <Route path="auth" element={<AuthPage />} />
        <Route path="forgot" element={<ForgotPassword />} />

        {/* to be protected */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
