// import { useState, useEffect } from "react";
// import pLimit from "p-limit";
// import { useDispatch } from "react-redux";
//
//
// export const useUploadFiles = ({ user, selectedDataSourceName, type }) => {
//   const dispatch = useDispatch();
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [uploadErrors, setUploadErrors] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState([]);
//   const [fileName, setFileName] = useState([]);
//   const [fileType, setFileType] = useState([]);
//   const [status, setStatus] = useState([]);
//   const storedActiveOrganization = sessionStorage.getItem('activeOrganization');
//
//   useEffect(() => {
//     if (!isUploading) {
//       setUploadProgress({});
//       setUploadErrors([]);
//     }
//   }, [isUploading]);
//
//   const onUploadProgress = (file, progress) => {
//     const propertyName = file.filename ? file.filename : file.name;
//     setUploadProgress(prevProgress => ({
//       ...prevProgress,
//       [propertyName]: progress
//     }));
//   };
//
//
//   const uploadFiles = async files => {
//     const org_id = JSON.parse(storedActiveOrganization)
//     const filesArray = Array.from(files);
//     setIsUploading(true);
//     const limit = pLimit(fileUploadLimit);
//     let presignedPostData = "";
//     if (type === "demoGraphics") {
//       presignedPostData = await dispatch(
//         faceAction.getFaceUploadUrls(
//             org_id?.id,
//           selectedDataSourceName?.id
//         )
//       );
//     } else {
//       presignedPostData = await dispatch(
//         action.getUploadUrls(
//             org_id?.id,
//           selectedDataSourceName?.id
//         )
//       );
//     }
//     const uploadTasks = filesArray.map(file =>
//       limit(async () => {
//         try {
//           await uploadFileOrChunk(
//             file,
//             presignedPostData,
//             progress => onUploadProgress(file, progress),
//             setError,
//             setFileName,
//             setStatus,
//             setFileType,
//             type,
//             user,
//             selectedDataSourceName
//           );
//         } catch (error) {
//           setUploadErrors(prevErrors => [...prevErrors, error.message]);
//         }
//       })
//     );
//     await Promise.allSettled(uploadTasks).then(() => setIsUploading(false));
//   };
//   return {
//     uploadFiles,
//     uploadProgress,
//     uploadErrors,
//     isUploading,
//     error,
//     fileName,
//     status,
//     fileType,
//     setError,
//     setFileName,
//     setStatus,
//     setFileType
//   };
// };
//
// const fileUploadLimit = 3;
