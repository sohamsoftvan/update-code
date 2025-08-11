import React from "react";
import { useJsonToCsv } from "react-json-csv";
import * as PropTypes from "prop-types";
import CustomizedButtons from "./CustomizedButtons";

const { saveAsCsv } = useJsonToCsv();

export function CommonCSVDownloader(props) {
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
