import React from "react";
import { useJsonToCsv } from "react-json-csv";
import * as PropTypes from "prop-types";
import CustomizedButtons from "./CustomizedButtons";

export function CommonCSVDownloader(props) {
  const { saveAsCsv } = useJsonToCsv();
  let { data = [], fields = {}, filename = "", className , buttonName } = props;
  return (
    <div className={className}>
        <CustomizedButtons
            title={buttonName}
            submit={() => saveAsCsv({ data, fields, filename })}
            color={"primary"}
        />
    </div>
  );
}

CommonCSVDownloader.propTypes = {
  data: PropTypes.array,
  fields: PropTypes.object,
  filename: PropTypes.string,
  className: PropTypes.string,
};
