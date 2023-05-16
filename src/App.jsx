import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./assets/components/Layout";
import RequireAuth from "./assets/components/RequireAuth";
import LoadingScreen from "./assets/components/LoadingScreen/LoadingScreen";
import "./assets/global/globalStyle.scss";
import PersistLogin from "./assets/components/PersistLogin";
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

function App() {
  return (
    <Suspense fallback={<LoadingScreen status={true} />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public Routes */}
          <Route path="auth" element={<AuthPage />} />
          <Route path="forgot" element={<ForgotPassword />} />

          {/* to be protected */}

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Main />} />
              <Route path="/user/*" element={<Main />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/dummy" element={<Dummy />} />
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
