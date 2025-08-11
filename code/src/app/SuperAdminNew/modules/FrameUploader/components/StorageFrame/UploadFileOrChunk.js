// import axios from "axios";
// export const uploadFileOrChunk = async (
//   file,
//   presignedPostData,
//   updateProgressCallback,
//   setError,
//   setFileName,
//   setStatus,
//   setFileType,
//   type,
//   user,
//   selectedDataSourceName
// ) => {
//   const formData = new FormData();
//   Object.keys(presignedPostData.fields).forEach(key => {
//     formData.append(key, presignedPostData.fields[key]);
//   });
//
//   if (file.upload) {
//     formData.append("file", file.upload);
//   } else {
//     // Assuming the whole file object for the other type of upload
//     formData.append("file", file);
//   }
//   const fileName = file?.filename ? file?.filename : file?.name;
//   const fileType = file?.upload?.type ? file?.upload?.type : file?.type;
//   try {
//     await axios.post(presignedPostData.url, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       },
//       onUploadProgress: event => updateProgressCallback(event.progress)
//     });
//
//     setStatus(prevErrors => [...prevErrors, "Succeeded"]);
//     setFileType(prevErrorsFile => [...prevErrorsFile, fileType]);
//     setFileName(prevErrorsFile => [...prevErrorsFile, fileName]);
//     if (type === "demoGraphics") {
//       const storedActiveOrganization = sessionStorage.getItem('activeOrganization');
//       const org_id = JSON.parse(storedActiveOrganization)
//       // await createFace({
//       //   filename: fileName,
//       //   demographics_id: selectedDataSourceName?.id,
//       //   organization_id: org_id?.id
//       // });
//     }
//   } catch (error) {
//     setStatus(prevErrors => [...prevErrors, "Failed"]);
//     setError(prevErrors => [...prevErrors, error.code]);
//     setFileType(prevErrorsFile => [...prevErrorsFile, fileType]);
//     setFileName(prevErrorsFile => [...prevErrorsFile, fileName]);
//   }
// };
