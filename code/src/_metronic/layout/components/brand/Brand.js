import React, {useMemo} from "react";
import {Link} from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {toAbsoluteUrl} from "../../../_helpers";

export function Brand() {
    const uiService = useHtmlClassService();

    const layoutProps = useMemo(() => {
        return {
            brandClasses: uiService.getClasses("brand", true),
            asideSelfMinimizeToggle: objectPath.get(
                uiService.config,
                "aside.self.minimize.toggle"
            ),
            headerLogo: uiService.getLogo(),
            headerStickyLogo: uiService.getStickyLogo()
        };
    }, [uiService]);

    return (
        <>
            {/* begin::Brand */}
            <div
                className={`brand flex-column-auto ${layoutProps.brandClasses}`}
                id="kt_brand"
            >
                {/* begin::Logo */}
                <Link className="brand-logo">
            <span>
                {/*TUSKER AI*/}
                {window.location.host === "beta.tusker.ai" ? "TUSKER AI" :window.location.host === "vision.newra.ai" ?

                    <SVG
                        src={toAbsoluteUrl(
                            "/media/logos/Newra_Logo_White.svg"
                        )}
                        style={{ width: '200px', height: 'auto' }}

                    /> :window.location.host === 'demo.urhiro.com' ?
                        <SVG
                        src={toAbsoluteUrl(
                            "/media/logos/HiRO_Logo_Full_White.svg"
                        )}
                        style={{ width: '150px', height: '35px' }}
                        />
                        :
                        "TUSKER AI"

                }
            </span>
                    {/*<img alt="logo" src={layoutProps.headerLogo}/>*/}
                </Link>
                {/* end::Logo */}

                {layoutProps.asideSelfMinimizeToggle && (
                    <>
                        {/* begin::Toggle */}
                        <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
              <span className="svg-icon svg-icon-xl text-white">
                  <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Angle-double-left.svg")}/>
              </span>
                        </button>
                        {/* end::Toolbar */}
                    </>
                )}
            </div>
            {/* end::Brand */}
        </>
    );
}
