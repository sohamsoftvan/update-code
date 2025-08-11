import React from "react";

export function AIModelEditDialogHeader() {
    return (
        <>
            <div className="modal-header">
                <h5 className="modal-title" id="example-modal-sizes-title-lg">Add AI Model</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </>
    );
}
