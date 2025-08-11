import React, {lazy, Suspense, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import { LayoutSplashScreen } from "../_metronic/layout";
import { BuilderPage } from "./Admin/pages/BuilderPage";
import { LocationPage } from "./Admin/pages/LocationPage";
import { DashboardPage } from "./Admin/pages/DashboardPage";
import SubscriptionTabPage from "./Admin/pages/SubscriptionTabPage";
import MyResultsTabPage from "./Admin/pages/MyResultsTabPage";
import { ComplaintPage } from "./Admin/pages/ComplaintPage";
import { Supervisor } from "./Admin/pages/SupervisorPage";
import { ADMIN_URL } from "../enums/constant";
import { EmployeePage } from "./Admin/pages/EmployeePage";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { FeedbackPage } from "./Admin/modules/Feedback/components/FeedbackPage";
import { AttendancePage } from "./Admin/pages/AttendancePage";
import { ViolationPage } from "./Admin/pages/ViolationPage";
import { AllNotificationPage } from "./Admin/pages/AllNotificationPage";
import { CameraPage } from "./Admin/pages/CameraPage";
import Cookies from "universal-cookie";
import MyEventsTabPage from "./Admin/pages/MyEventsTabPage";
import AllCameraPage from "./Admin/pages/AllCameraPage";
import AllCameraLogPage from "./Admin/pages/AllCameraLogPage";
import {getAllDeployedRTSPJobsDetails} from "./Admin/modules/DashboardGraph/_redux";
import {setSubscription} from "../redux/subscriptionReducer";
import AllCameraStatusPage from "./Admin/pages/AllCameraStatusPage";



const ModelCategoriesTabPage = lazy(() =>
  import("./Admin/pages/ModelCategoriesTabPage")
);


export default function AdminBasePage() {
  const dispatch = useDispatch();
  // const [user1, setUser] = useState(false);

  const { user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user?.id && new Cookies().get("access_token"),
      user: auth.user
    }),
    shallowEqual
  );

      useEffect(() => {
    if (user) {
      getAllDeployedRTSPJobsDetails()
        .then(response => {
          if (response && response.isSuccess) {
            dispatch(setSubscription(true));
            // setUser(true);
          }
        })
        .catch(error => {
          // setUser(false);
          dispatch(setSubscription(false));
          if (error.detail) {
            console.log(error.detail);
          } else {
            console.log("Something went Wrong");
          }
        });
    }

    }, []);

  return (
    <>
      {!user ? (
        <Routes>
          <Route
            path={ADMIN_URL + "/model-categories"}
            element={<ModelCategoriesTabPage />}
          />
          <Route
            path={ADMIN_URL + "/locations"}
            element={<LocationPage />}
          />
          <Route
            path={ADMIN_URL + "/employee"}
            element={<EmployeePage />}
          />
          <Route
            path={ADMIN_URL + "/addSupervisor"}
            element={<Supervisor />}
          />
          <Route
            path={ADMIN_URL + "/attendance"}
            element={<AttendancePage />}
          />
          <Route
            path={ADMIN_URL + "/violation"}
            element={<ViolationPage />}
          />
          <Route
            path={"/allNotification"}
            element={<AllNotificationPage />}
          />
          <Route
            path={ADMIN_URL + "/subscriptions"}
            element={<SubscriptionTabPage />}
          />
          {/*<Route path={"/complaints"} element={<ComplaintPage />} />*/}
          {/*<Route path="/feedbacks" element={<FeedbackPage />} />*/}
        </Routes>
      ) : null}
      {user && (
        <Suspense fallback={<LayoutSplashScreen />}>
          <Routes>
            <Route
              path={ADMIN_URL + "/dashboard"}
              element={<DashboardPage />}
            />
            <Route path={ADMIN_URL + "/cameras"} element={<CameraPage />} />
            <Route
              path={ADMIN_URL + "/model-categories"}
              element={<ModelCategoriesTabPage />}
            />
            <Route
              path={ADMIN_URL + "/subscriptions"}
              element={<SubscriptionTabPage />}
            />
            <Route path={"/my-results"} element={<MyResultsTabPage />} />
            <Route path={"/my-events"} element={<MyEventsTabPage />} />
            <Route path={ADMIN_URL + "/builder"} element={<BuilderPage />} />
            <Route
              path={ADMIN_URL + "/locations"}
              element={<LocationPage />}
            />
            <Route path={"/complaints"} element={<ComplaintPage />} />
            <Route
              path={ADMIN_URL + "/addSupervisor"}
              element={<Supervisor />}
            />
            <Route
                path={ADMIN_URL + "/allCamera"}
                element={<AllCameraPage />}
            />
              <Route
                  path={ADMIN_URL + "/camera-logs"}
                  element={<AllCameraLogPage />}
              />
              <Route
                  path={ADMIN_URL + "/camera-status"}
                  element={<AllCameraStatusPage />}
              />
            <Route
              path={ADMIN_URL + "/employee"}
              element={<EmployeePage />}
            />
            <Route
              path={ADMIN_URL + "/attendance"}
              element={<AttendancePage />}
            />
            <Route
              path={ADMIN_URL + "/violation"}
              element={<ViolationPage />}
            />
            <Route
              path={"/allNotification"}
              element={<AllNotificationPage />}
            />
            <Route path="/feedbacks" element={<FeedbackPage />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}
