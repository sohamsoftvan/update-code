import React from "react";

export function StatusFormatter(
    row
) {

    return (
        <>
            {row.status === false ?
                <span className="label label-lg label-light-danger label-inline">
                    pending
                  </span> :
                row.status === true ?
                    <span className="label label-lg label-light-success label-inline">
                    Deployed
                  </span> :
                    <span>
                        {row.experiment_status.toLowerCase()}
                    </span>
            }
        </>
    );
}
