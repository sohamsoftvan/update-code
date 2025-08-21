import React, {useState} from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {Grid} from "@mui/material";
import {warningToast} from "../../../../../../utils/ToastMessage";
import AutocompleteDropDownMenuNew from "../../../../../../utils/SuperAdmin/AutocompleteDropDownMenuNew";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";

export const UploadModal = ({
                                user,
                                selectedDataSourceName,
                                uploadModalStatus,
                                setUploadModalStatus,
                                type
                            }) => {
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);
    const [modalProgress, setModalProgress] = useState(false);
    const [showStatusTable, setShowStatusTable] = useState(false);
    const [uploadMode, setUploadMode] = useState("Local");
    const [rtspUrl, setRtspUrl] = useState("");
    const [rtspFrames, setRtspFrames] = useState([]);

    const LOCAL_FILE_LIMIT = 50;

    const allowedExtensions = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/avif",
        "image/webp",
    ];

    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const InputChange = e => {
        if (uploadMode !== "Local") return;
        let existingFiles = new Set(selectedfile.map(file => file.filename));

        if (selectedfile.length + e.target.files.length > LOCAL_FILE_LIMIT) {
            warningToast(`Upload limit reached: Maximum ${LOCAL_FILE_LIMIT} files at a time.`);
            return;
        }

        Array.from(e.target.files).forEach(file => {
            if (!allowedExtensions.includes(file.type)) {
                warningToast(`Invalid file type: ${file.name}. Allowed types are: ${allowedExtensions.join(", ")}`);
                return;
            }

            if (existingFiles.has(file.name)) {
                warningToast(`The file "${file.name}" is already selected.`);
                return;
            }

            let reader = new FileReader();
            reader.onloadend = () => {
                SetSelectedFile(preValue => [
                    ...preValue,
                    {
                        id: Date.now() + Math.random(),
                        filename: file.name,
                        fileimage: reader.result,
                        filesize: filesizes(file.size),
                        upload: file
                    }
                ]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDrop = (event) => {
        if (uploadMode !== "Local") return;
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (selectedfile.length + files.length > LOCAL_FILE_LIMIT) {
            warningToast(`Upload limit reached: Maximum ${LOCAL_FILE_LIMIT} files at a time.`);
            return;
        }

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            if (!allowedExtensions.includes(file.type)) {
                warningToast(`Invalid file type: ${file.name}.`);
                continue;
            }

            let reader = new FileReader();
            reader.onloadend = () => {
                SetSelectedFile(preValue => [
                    ...preValue,
                    {
                        id: Date.now() + Math.random(),
                        filename: file.name,
                        fileimage: reader.result,
                        filesize: filesizes(file.size),
                        upload: file
                    }
                ]);
            };
            reader.readAsDataURL(file);
        }
    };


    const DeleteSelectFile = id => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = selectedfile.filter(data => data.id !== id);
            SetSelectedFile(result);
        } else {
            // alert('No');
        }
    };

    const FileUploadSubmit = async e => {
        e.preventDefault();

        // form reset on submit
        e.target.reset();
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles(preValue => {
                    return [...preValue, selectedfile[index]];
                });
            }
            SetSelectedFile([]);
        } else {
            alert("Please select file");
        }
    };

    const DeleteFile = async id => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = Files.filter(data => data.id !== id);
            SetFiles(result);
        } else {
            // alert('No');
        }
    };

    const handleSubmit = () => {
        if (uploadMode === "Local") {
            if (selectedfile.length > LOCAL_FILE_LIMIT) {
                warningToast(
                    `Upload limit reached: Maximum ${LOCAL_FILE_LIMIT} files at a time. Please upload in batches.`
                );
            } else {
                if (selectedfile.length > 0) {
                    // uploadFiles(selectedfile);
                }
            }
        } else if (uploadMode === "RTSP") {
            if (!rtspUrl) {
                warningToast("Please enter an RTSP URL.");
                return;
            }
            setRtspFrames(["Frame 1", "Frame 2", "Frame 3"]);
        }
    };

    // useEffect(() => {
    //     if (isUploading) {
    //         handleuploadModal();
    //         setModalProgress(true);
    //     }
    // }, [isUploading]);

    const handleuploadModal = () => {
        SetSelectedFile([]);
        setUploadModalStatus(false);
    };

    // const handleStatusTable = () => {
    //     setError([]);
    //     setFileName([]);
    //     setStatus([]);
    //     setFileType([]);
    //     setModalProgress(false);
    // };
    // const totalProgress =
    //     Object.values(uploadProgress).reduce((acc, progress) => acc + progress, 0) /
    //     Object.keys(uploadProgress).length || 0;

    return (
        <>

            <CommonModal
                size="xl"
                show={uploadModalStatus}
                handleClose={handleuploadModal}
                arialabelledby="example-modal-sizes-title-lg"
                title={"Upload Data"}
                scrollable={true}
                closeButtonFlag={true}
                applyButton={true}
                content={
                    <>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item size={{xl : 6, xs :6 , md : 6, lg :6}}>
                                <span
                                    className={`float-end font-weight-boldest-500 ${uploadMode === "Local" && selectedfile.length > LOCAL_FILE_LIMIT && "image-validation"}`}
                                >
                                    {uploadMode === "Local" ? `Total: ${selectedfile.length}/${LOCAL_FILE_LIMIT}` : null}
                                </span>
                            </Grid>
                            <Grid item size={{xl : 6, xs :6 , md : 6, lg :6}} style={{textAlign: "right"}}>
                                <AutocompleteDropDownMenuNew
                                    className={"w-50"}
                                    id="upload-mode-autocomplete"
                                    options={[
                                        {id: "Local", label: "Local"},
                                        {id: "RTSP", label: "RTSP"}
                                    ]}
                                    value={{id: uploadMode, label: uploadMode}}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setUploadMode(newValue.id);
                                            SetSelectedFile([]);
                                            SetFiles([]);
                                            setRtspUrl("");
                                            setRtspFrames([]);
                                        }
                                    }}
                                    placeholder="Select Mode"
                                    style={{minWidth: 120}}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <div className="kb-data-box mt-5">
                            {uploadMode === "Local" ? (
                                <form onSubmit={FileUploadSubmit}>
                                    {selectedfile.length > LOCAL_FILE_LIMIT ? (
                                        <div className="kb-file-upload">
                                            <div className="file-upload-box">
                                                <span className={"image-validation"}>
                                                    Upload limit reached: Maximum {LOCAL_FILE_LIMIT} files at a time.
                                                    Please upload in batches. {" "}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="kb-file-upload">
                                            <div className="file-upload-box" onDrop={handleDrop}
                                                 onDragOver={(e) => e.preventDefault()}>
                                                <input
                                                    accept={
                                                        ".png, .jpg, .jpeg, .mp4, .avi, .webp, .ts, .mov, .flv, .wmv, .mkv, .gif"
                                                    }
                                                    type="file"
                                                    id="fileupload"
                                                    className="file-upload-input"
                                                    onChange={InputChange}
                                                    multiple
                                                />
                                                <span>
                                                    Drag and drop or{" "}
                                                    <span className="file-link">Choose your files</span>
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="kb-attach-box mb-3 file-atc-box">
                                        <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
                                            {selectedfile.map((data, index) => {
                                                const {
                                                    id,
                                                    filename,
                                                    fileimage,
                                                    datetime,
                                                    filesize
                                                } = data;
                                                return (
                                                    <div
                                                        className="file-container"
                                                        style={{width: "245px", position: "relative"}}
                                                        key={id}
                                                    >
                                                        <span
                                                            style={{
                                                                position: "absolute",
                                                                top: "-1px",
                                                                right: "-5px",
                                                                cursor: "pointer",
                                                                backgroundColor: "#147b82",
                                                                borderRadius: "50%",
                                                                width: "24px",
                                                                height: "24px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                zIndex: 2,
                                                                color: "rgba(255,255,255,0.8)"
                                                            }}
                                                            title="Delete"
                                                            onClick={() => DeleteSelectFile(id)}
                                                        >
                                                            ×
                                                        </span>
                                                        {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                                                            <div className="file-image">
                                                                <img src={fileimage} alt={filename}/>
                                                            </div>
                                                        ) : (
                                                            <div className="file-image">
                                                                <i className="far fa-file-alt"></i>
                                                            </div>
                                                        )}
                                                        <div className="file-detail">
                                                            <h6>{filename}</h6>
                                                            <p>
                                                                <div>Size: {filesize}</div>
                                                                <div className="mt-2">
                                                                    Modified Time: {datetime}
                                                                </div>
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div style={{marginTop: 16}}>
                                    <FormFieldCommon
                                        value={rtspUrl}
                                        variant={"outlined"}
                                        placeholder={"Enter RTSP URL"}
                                        onChange={(e) => setRtspUrl(e.target.value)}
                                        fullWidth
                                        sx={{width: "50%"}}
                                    />
                                    {rtspUrl && (
                                        <div style={{marginTop: 24}}>
                                            <h5>RTSP Frame Preview (placeholder)</h5>
                                            <div style={{display: "flex", gap: 8}}>
                                                {rtspFrames.length === 0 ? (
                                                    <span>Click 'Upload' to fetch frames from RTSP.</span>
                                                ) : (
                                                    rtspFrames.map((frame, idx) => (
                                                        <div key={idx} style={{
                                                            border: "1px solid #ccc",
                                                            padding: 8
                                                        }}>{frame}</div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {Files.length > 0 ? (
                                <div className="kb-attach-box">
                                    <hr/>
                                    {Files.map((data, index) => {
                                        const {id, filename, fileimage, datetime, filesize} = data;
                                        return (
                                            <div className="file-atc-box" key={index}>
                                                {filename.match(/.(jpg|jpeg|png|gif|svg|mkv)$/i) ? (
                                                    <div className="file-image">
                                                        <img src={fileimage} alt="" lazyload="true"/>
                                                    </div>
                                                ) : (
                                                    <div className="file-image">
                                                        <i className="far fa-file-alt"></i>
                                                    </div>
                                                )}
                                                <div className="file-detail">
                                                    <h6>{filename}</h6>
                                                    <p>
                                                        <span>Size : {filesize}</span>
                                                        <span className="ml-3">
                                                            Modified Time : {datetime}
                                                        </span>
                                                    </p>
                                                    <div className="file-actions">
                                                        <button
                                                            className="file-action-btn"
                                                            onClick={() => DeleteFile(id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </>

                }
                submitEmployee={handleSubmit}

            />

            {/*<ProgressbarModal*/}
            {/*    uploadProgress={uploadProgress}*/}
            {/*    title={"Upload Data Progress"}*/}
            {/*    modalProgress={modalProgress}*/}
            {/*    isUploading={isUploading}*/}
            {/*    convertedArray={convertedArray}*/}
            {/*    totalProgress={totalProgress}*/}
            {/*    handleStatusTable={handleStatusTable}*/}
            {/*/>*/}

            {/*<TableInModal*/}
            {/*    title={"Uploaded File Status"}*/}
            {/*    showStatusTable={showStatusTable}*/}
            {/*    convertedArray={convertedArray}*/}
            {/*    handleStatusTable={handleStatusTable}*/}
            {/*/>*/}
        </>
    );
};
