import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Main } from "../../pages/main/Main";
import { Tests } from "../../pages/tests/Tests";
import { Advices } from "../../pages/advices/Advices";
import { Events } from "../../pages/events/Events";
import { Bookmarks } from "../../pages/bookmarks/Bookmarks";
import { Calendar } from "../../pages/calendar/Calendar";
import { Myteam } from "../Myteam/Myteam";
import styles from "./app.module.css";
import { ProtectedRoutes } from "@/components/ProtectedRoutes";
import { RegisterPage } from "@/pages/register/RegisterPage";
import { RefreshPasswordPage } from "@/pages/refreshpassword/RefreshPasswordPage";
import { LoginPage } from "@/pages/login/LoginPage";

export const App = () => {
  const [loggedIn] = useState(true);

  return (
    <main className={styles.page}>
      <Routes>
        <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
          <Route path="/" element={<Main />} />

          <Route path="tests" element={<Tests />} />

          <Route path="advices" element={<Advices />} />

          <Route path="events" element={<Events />} />

          <Route path="bookmarks" element={<Bookmarks />} />

          <Route path="calendar" element={<Calendar />} />

          <Route path="myteam" element={<Myteam />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="password-reset" element={<RefreshPasswordPage />} />
      </Routes>
    </main>
  );
};
