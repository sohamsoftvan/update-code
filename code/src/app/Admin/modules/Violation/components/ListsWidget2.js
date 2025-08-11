/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

export function ListsWidget2({ className, keys, value, entities }) {
  let labelArr = [];
  return (
    <>
      <div
        className={`card card-custom ${className} mt-4 violation-card-heights`}
        style={{ backgroundColor: "#147b82" }}
      >
        {/* Header */}
        <div className="card-header border-0 mb-5">
          <h3 className="card-title font-weight-bolder text-white">
            Detection Report
          </h3>
        </div>

        {/* Body */}
        <div
          className="card-body pt-2 mb-5 violation-card-scroll violation-card-body"
          style={{ backgroundColor: "#147b82", borderRadius: "10px" }}
        >
          {keys.map((item, index) => {
            labelArr.push("Most Violations done by ");
            labelArr.push("Least Violations done by ");
            labelArr.push("Most violation occur in ");
            labelArr.push("Least violation occur in ");
            if (labelArr?.includes(item)) {
              return (
                <div className="d-flex align-items-center mb-10 violation-card">
                  <div className="symbol symbol-40 symbol-light-primary mr-5">
                    <span className="symbol-label">
                      <span className="svg-icon svg-icon-lg svg-icon-primary">
                        <SVG
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Home/Library.svg"
                          )}
                        ></SVG>
                      </span>
                    </span>
                  </div>

                  <div className="d-flex flex-column font-weight-bold">
                    <span className="text-white mb-1 font-size-lg">
                      {keys[index]}
                    </span>
                    <span className="text-white">{value[index]}</span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
}
