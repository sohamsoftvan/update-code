// import React, { Suspense } from "react";
// import { Navigate, Routes, Route } from "react-router-dom";
// import { LayoutSplashScreen } from "../_metronic/layout";
// import { DashboardPage } from "./Admin/pages/DashboardPage";
// import { MyResultPage } from "./SuperAdmin/modules/MyResult/MyResultTable/MyResultPage";
// import Device from "./SuperAdmin/modules/Device";
// import ModelType from "./SuperAdmin/modules/ModelType";
// import FrameworkDetails from "./SuperAdmin/modules/FrameworkDetails";
// import DeploymentType from "./SuperAdmin/modules/DeploymentType";
// import InferJobs from "./SuperAdmin/modules/InferJobs";
// import DeploymentDetails from "./SuperAdmin/modules/DeploymentDetails";
// import DeployedDetails from "./SuperAdmin/modules/DeployedDetails";
// import AIModel from "./SuperAdmin/modules/AIModel";
// import {CompanyServicePage} from "./Admin/pages/companyService";
// import {NotificationSendPage} from "./Admin/pages/NotificationSendPage";
// import Locations from "./SuperAdminNew/modules/Location";
// import Cameras from "./SuperAdminNew/modules/Camera";
// import AddSupervisor from "./SuperAdminNew/modules/AddSupervisor";
// import Subscription from "./SuperAdminNew/modules/Subscriptions";
// import AllCamera from "./SuperAdminNew/modules/AllCamera";
// import AllCameraStatus from "./SuperAdminNew/modules/AllCameraStatus";
// import AllCameraLog from "./SuperAdminNew/modules/AllCameraLogs";
// import CompanyUser from "./SuperAdminNew/modules/CompanyUser";
// import CompanyUserAddPage from "./SuperAdminNew/modules/CompanyUser/components/companyUser-details-edit-dialog/CompanyUserAddPage";
// import ConfiguredUserDialog
//   from "./SuperAdminNew/modules/CompanyUser/components/companyUser-details-edit-dialog/ConfiguredUserDialog";
// import SubscriptionModelCompanyUser from "./SuperAdminNew/modules/SubscriptionModelCompanyUser";
// import CameraLabelMapping from "./SuperAdminNew/modules/CameraLabelMapping";
// import FrameUploader from "./SuperAdminNew/modules/FrameUploader";
//
// export default function SuperAdminBasePage(props) {
//   return (
//     <Suspense fallback={<LayoutSplashScreen />}>
//       <Routes>
//         <Route path="/myResult" element={<MyResultPage />} />
//         {/*<Route path="/users" element={<Users />} />*/}
//         <Route path="/device" element={<Device />} />
//         <Route path="/modelType" element={<ModelType />} />
//         <Route path="/frameworkDetails" element={<FrameworkDetails />} />
//         <Route path="/deploymentType" element={<DeploymentType />} />
//         <Route path="/inferJobs" element={<InferJobs />} />
//         <Route path="/aiModel" element={<AIModel {...props} />} />
//         <Route path="/deploymentDetails" element={<DeploymentDetails />} />
//         <Route path="/deployedDetails" element={<DeployedDetails />} />
//         <Route path="/dashboard" element={<DashboardPage />} />
//         <Route path="/users" element={<CompanyServicePage />} />
//         <Route path="/NotificationSend" element={<NotificationSendPage />} />
//         {/*<Route path="/my-page" element={<MyPage/>} />*/}
//         <Route path="/locations" element={<Locations />} />
//         <Route path="/cameras" element={<Cameras />} />
//         <Route path="/addSupervisor" element={<AddSupervisor />} />
//         <Route path="/subscriptions" element={<Subscription />} />
//         <Route path="/allCamera" element={<AllCamera />} />
//         <Route path="/camera-status" element={<AllCameraStatus />} />
//         <Route path="/camera-logs" element={<AllCameraLog />} />
//         <Route exact path="/company/company-user" element={<CompanyUser />} />
//         <Route path="/company/company-user/add-company-user" element={<CompanyUserAddPage />} />
//         <Route path="/company/company-user/configure-user" element={<ConfiguredUserDialog />} />
//         <Route path="/company/subscription-model" element={<SubscriptionModelCompanyUser />} />
//         <Route path="/company/camera-label-mapping" element={<CameraLabelMapping />} />
//         <Route path="/company/frame-uploader" element={<FrameUploader />} />
//         <Route path="*" element={<Navigate to="error/error-v3" replace />} />
//       </Routes>
//     </Suspense>
//   );
// }
