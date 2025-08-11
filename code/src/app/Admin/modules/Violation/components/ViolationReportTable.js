import React, {useEffect, useMemo, useRef, useState} from "react";
import {getAllDeployedRTSPJobsDetails, getReportMetadata, getReports} from "../_redux/ViolationAPI";
import {warningToast} from "../../../../../utils/ToastMessage";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../_redux/ViolationAction";
import {Col, Row} from "reactstrap";
import {useViolationUIContext} from "../ViolationUIContext";
import {ViolationCard} from "./ViolationCard";
import {makeStyles} from "@mui/styles";
import BlockUi from "react-block-ui";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/scss/bootstrap.scss";
import {getUtcDateWithTimeForViolation} from "../violationDateAndTimeConverter";

let currentPage = 1;
let temp = false;
let store_data = [];
const useStyles = makeStyles({
  header: {
    paddingBottom: "0rem",
  },
  title: {
    display: "inline-flex",
    margin: "1rem 0",
  },
  search: {
    marginBottom: "10px",
  },
  card: {
    height: 380,
    marginTop: 54,
  },
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 50,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

export function ViolationReportTable({
  violationSetting,
  dateValues,
  setDateValues,
  selectedTime,
  selectedLabel,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pagination = useRef();
  const perPage = 6;

  const violationUIContext = useViolationUIContext();
  const violationUIProps = useMemo(
    () => violationUIContext,
    [violationUIContext]
  );

  const [pageParams, setPageParams] = useState({ pageSize: 0, totalPages: 0 });
  const [currentItems, setCurrentItems] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [cameradata, setCameraData] = useState([]);
  const [displayData, setDisplayData] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.myResult }),
    shallowEqual
  );
  const { refreshResult } = currentState;

  function getMyReportMetadata(dateValues, selectedTime, pageNo) {
    setListLoading(true);
    let local_date = dateValues.toString().split("T")[0];
    let utc_date_time = getUtcDateWithTimeForViolation(
      violationSetting.start_time,
      violationSetting.end_time,
      local_date
    );
    getReportMetadata(
      utc_date_time[0],
      utc_date_time[1],
      selectedLabel.length > 0 ? selectedLabel : violationSetting.label,
      selectedTime
    )
      .then((response) => {
        if (response && response.isSuccess) {
          setListLoading(false);
          setPageParams({
            pageSize: response.data.page_size,
            totalPages: response.data.total_pages,
          });
          if (dateValues !== undefined && selectedTime !== NaN) {
            store_data = [];
            setData(store_data);
            currentPage = pageNo;
            getMyResults(pageNo);
          }
        } else throw new Error();
      })
      .catch((error) => {
        setListLoading(false);
        warningToast("Something went Wrong");
      });
  }

  function getMyResults(pageNo) {
    temp = false;
    setListLoading(true);
    setHasMore(true);
    let local_date = dateValues.toString().split("T")[0];
    let utc_date_time = getUtcDateWithTimeForViolation(
      violationSetting.start_time,
      violationSetting.end_time,
      local_date
    );
    getReports(
      utc_date_time[0],
      utc_date_time[1],
      selectedLabel.length > 0 ? selectedLabel : violationSetting.label,
      parseInt(selectedTime),
      pageNo
    )
      .then((response) => {
        if (response && response.isSuccess) {
          setCurrentItems(response.data);
          dispatch(actions.setMyReports(response.data));
          currentPage = pageNo;
          setListLoading(false);
          if (response.data.length > 0) {
            temp = true;
            if (pageNo === 1) {
              store_data = [];
            }
            store_data.push(response.data);
            setData(store_data);
            setDisplayData(temp);
            setHasMore(false);
          }
        } else throw new Error();
      })
      .catch((error) => {
        setListLoading(false);
        warningToast("Something went wrong !");
      });
  }

  useEffect(() => {
    //get result metadata for admin
    if (dateValues && selectedTime && selectedLabel) {
      setTimeout(() => {
        setData([]);
        getMyReportMetadata(dateValues, parseInt(selectedTime), 1);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [dateValues, selectedTime, selectedLabel]);

  const handleShow = () => {
    setShow(!show);
  };

  const fetchData = (e) => {
    setHasMore(true);
    getMyResults(currentPage + 1);
  };

  useEffect(() => {
    let camera_arr = {};
    getAllDeployedRTSPJobsDetails()
      .then((response) => {
        if (response && response.isSuccess) {
          response.data.map((job) => {
            job.deployment_job_rtsp_details.camera_settings.map((camera) => {
              camera_arr[camera.id] = camera.camera_name;
            });
          });
          setCameraData(camera_arr);
        } else throw new Error();
      })
      .catch((err) => {
        // warningToast('Something went wrong !');
        if (err.detail) {
          warningToast("Data Not found for RTSP job");
        } else {
          warningToast("Something went wrong");
        }
      });
  }, []);

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: pageParams.pageSize * pageParams.totalPages,
    sizePerPageList: [
      { text: pageParams.pageSize, value: pageParams.pageSize },
    ],
    sizePerPage: pageParams.pageSize,
    page: violationUIProps.queryParams.pageNumber,
  };

  return (
    <>
      <BlockUi blocking={listLoading} tag="div" color="#147b82">
        {displayData && data.length > 0 ? (
          <InfiniteScroll
            dataLength={data?.length}
            next={fetchData}
            hasMore={true}
            loader={null}
          >
            <Row className="mb-2 mt-2">
              {data?.map((item, index) =>
                item.map((x, y) => (
                  <Col xl={4} md={6} sm={12} lg={6} className={classes.card}>
                    <ViolationCard data={x} cameradata={cameradata} />
                  </Col>
                ))
              )}
            </Row>
          </InfiniteScroll>
        ) : (
          <h3 style={{ paddingTop: "40px" }} className="text-center">
            No Data Found
          </h3>
        )}
      </BlockUi>
    </>
  );
}
