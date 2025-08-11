import momentTz from "moment-timezone";
const moment = require("moment-timezone");

export const getUtcTimeForViolation = (start_time, end_time) => {
  let arr = [];
  let utc_start_time = moment
    .utc(start_time, "HH mm")
    .format("HH mm")
    .split(" ")[0];
  let utc_start_min = moment
    .utc(start_time, "HH mm")
    .format("HH mm")
    .split(" ")[1];
  let utc_end_time = moment
    .utc(end_time, "HH mm")
    .format("HH mm")
    .split(" ")[0];
  let utc_end_min = moment
    .utc(end_time, "HH mm")
    .format("HH mm")
    .split(" ")[1];
  arr.push(utc_start_time, utc_start_min, utc_end_time, utc_end_min);
  return arr;
};

export const getUtcDateWithTimeForViolation = (
  start_time,
  end_time,
  currentDate
) => {
  let arr = [];
  let local_start_time = moment
    .utc(start_time, "HH mm")
    .local()
    .format("HH mm")
    .split(" ")[0];
  let local_end_time = moment
    .utc(end_time, "HH mm")
    .local()
    .format("HH mm")
    .split(" ")[0];
  let local_start_min = moment
    .utc(start_time, "HH mm")
    .local()
    .format("HH mm")
    .split(" ")[1];
  let local_end_min = moment
    .utc(end_time, "HH mm")
    .local()
    .format("HH mm")
    .split(" ")[1];

  let local_date = currentDate.toString().split("T")[0];
  let local_start_date_time =
    local_date + " " + local_start_time + ":" + local_start_min;
  let local_end_date_time =
    local_date + " " + local_end_time + ":" + local_end_min;
  let utcStartDate = momentTz
    .tz(local_start_date_time, "YYYY-MM-DD HH:mm", moment.tz.guess())
    .toISOString();
  let utcEndDate = momentTz
    .tz(local_end_date_time, "YYYY-MM-DD HH:mm", moment.tz.guess())
    .toISOString();
  arr.push(utcStartDate, utcEndDate);
  return arr;
};

export const getDayStartHourForViolation = (start_time, end_time) => {
  var start = moment
    .tz(moment.tz.guess())
    .startOf("day")
    .utc();
  return Number(
    start
      .toISOString()
      .split("T")[1]
      .split(":")[0]
  );
};
