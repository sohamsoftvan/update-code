import React from "react";
import CustomizedButtons from "./CustomizedButtons";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const CommonReactstrapModal = ({
                         show,
                         title,
                         content,
                         backdrop,
                         keyboard,
                         size,
                         arialabelledby,
                         closeButtonFlag,
                         id,
                         handleClose,
                         submitEmployee,
                         flag,
                         dialogClassName,
                         fullscreen,applyButton,footerCustom,style,footerContent,animation,
                         hideFooter

                     }) => {
    return (<Modal isOpen={show} toggle={handleClose}
                   backdrop={backdrop}
                   keyboard={keyboard}
                   size={size}
                   dialogClassName={dialogClassName}
                   fullscreen={fullscreen ? fullscreen : false}
                   aria-labelledby={arialabelledby}
                   centered
                   style={style}
                   animation={animation}
    >
        <ModalHeader closeButton={closeButtonFlag ? closeButtonFlag : false}>
            <h3 id="example-modal-sizes-title-lg">{title}</h3>
        </ModalHeader>
        <ModalBody>{content}</ModalBody>
        {!hideFooter &&
            <ModalFooter style={{ display:footerCustom && "block" }}>
                {footerCustom ? footerContent :
                    <>
                        <CustomizedButtons
                            size={"md"}
                            color={"secondary"}
                            title={"Cancel"}
                            flag={false}
                            submit={handleClose}
                        />
                        {applyButton &&
                            <CustomizedButtons
                                size={"md"}
                                color={"primary"}
                                title={id ? "Update" : "Save"}
                                flag={flag}
                                submit={submitEmployee}
                            />}
                    </>
                }
            </ModalFooter>
        }
    </Modal>);
};

export default CommonReactstrapModal;
