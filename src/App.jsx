import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

//*Components
import Layout from "./assets/components/Layout";
import RequireAuth from "./assets/components/RequireAuth";
import PersistLogin from "./assets/components/PersistLogin";
import FallbackLoading from "./assets/components/FallbackLoading/FallbackLoading";
const AcceptInvitePage = lazy(() =>
  import("./assets/pages/AcceptInvite/AcceptInvitePage")
);
const AuthPage = lazy(() => import("./assets/pages/AuthPage/AuthPage"));
const ForgotPassword = lazy(() =>
  import("./assets/pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./assets/pages/ResetPassword/ResetPassword")
);
const Main = lazy(() => import("./assets/pages/Main/Main"));
const NotFound = lazy(() => import("./assets/pages/NotFound/NotFound"));
const Dummy = lazy(() => import("./assets/components/Dummy/Dummy"));

//*CSS
import "./assets/global/globalStyle.scss";

function App() {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public Routes */}
          <Route path="auth" element={<AuthPage />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="invite/:inviteInfo" element={<AcceptInvitePage />} />
          {/* protected */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Main />} />
              <Route path="/user/*" element={<Main />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/404" element={<NotFound />} />
            </Route>
          </Route>
          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
