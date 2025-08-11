import React, { useMemo } from "react";
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true),
    };
  }, [uiService]);

  const handleClick = (event) => {
    event.preventDefault();
    if (window.location.host === "beta.tusker.ai") {
      window.location.href = "http://tusker.ai/";
    }
  };


  return (
    <div
      className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="opacity-70 font-weight-bold order-2 order-md-1">
          <span className="opacity-70 font-weight-bold mr-2">2021-{today}</span>{" "}
          &copy;{" "}
          <a
              href={`${window.location.host} === "beta.tusker.ai" ? "http://tusker.ai/" : "" `}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 text-dark-75 font-weight-bold ml-2 text-hover-primary"
          >
            {window.location.host === "beta.tusker.ai" ? "TuskerAi" :window.location.host === "vision.newra.ai" ?
                "NewRA.AI" : window.location.host === 'demo.urhiro.com' ? "HiRO.AI" : "TuskerAi"}
            {/*TuskerAi*/}
          </a>
        </div>

        {/*<span className="opacity-70 font-weight-bold	text-white">&copy; 2021-{today+1}</span>*/}
        {/*<span className="opacity-70 font-weight-bold	text-white">*/}
        {/*              <a*/}
        {/*                  href="http://tusker.ai/"*/}
        {/*                  target="_blank"*/}
        {/*                  rel="noopener noreferrer"*/}
        {/*                  className="text-white ml-2 text-hover-primary"*/}
        {/*              >TuskerAi</a>*/}
        {/*          </span>*/}

      </div>
    </div>
  );
}
