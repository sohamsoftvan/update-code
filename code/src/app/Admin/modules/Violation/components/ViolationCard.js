import {CardMedia , CardContent ,Typography ,Tooltip ,Card} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Boundingbox from "image-bounding-box-custom";
import { Col, Row } from "react-bootstrap";

const useStyles = makeStyles({
  card: {
    maxWidth: 323,
    height: "100%",
    margin: "auto"
  },
  media: {
    height: 290
  },
  header: {
    paddingBottom: "0rem"
  },
  learnMore: {
    position: "absolute",
    bottom: 0
  }
});

export function ViolationCard({ data, cameradata }) {
  const classes = useStyles();
  const camera_name = cameradata[data.camera_id];
  return (
    <>
      {data ? (
        <Card className={clsx(classes.card)}>
          {/*<CardActionArea>*/}
          <CardMedia
            className={classes.media}
            title={"Violation"}
            alt={"Image Here"}
          >
            <Boundingbox
              className="row m-auto col-12 p-0 text-center"
              image={data?.image_url}
              // image='https://www.iotforall.com/wp-content/uploads/2018/02/Coming-Soon-to-a-Hotel-Near-You-AI-for-Building-Maintenance-696x428.jpg'
              boxes={data?.result?.detection.map(d => {
                if (d.label)
                  return {
                    coord: [
                      d.location[0],
                      d.location[1],
                      d.location[2] - d.location[0],
                      d.location[3] - d.location[1]
                    ],
                    label: d.label
                  };
                return null;
              })}
              options={{
                colors: {
                  normal: "red",
                  selected: "red",
                  unselected: "red"
                },
                style: {
                  maxWidth: "100%",
                  maxHeight: "100vh",
                  margin: "auto",
                  width: 520,
                  color: "red",
                  height: 299
                }
              }}
            />
          </CardMedia>
          <CardContent
            style={{
              minHeight: "119px",
              borderRadius: "100px",
              padding: "13px"
            }}
          >
            <Typography gutterBottom variant="h6" component="h1">
              <Tooltip
                className="tools"
                title={
                  <div className="tooltip-font">
                    {Object.keys(data?.counts).toString()}
                  </div>
                }
                placement={"top"}
              >
                <div
                  style={{ width: "auto" }}
                  className="short-label-name-length"
                >
                  <i style={{ color: "#525252" }} className="fas fa-tag mr-2" />
                  {Object.keys(data?.counts).toString()}
                </div>
              </Tooltip>
            </Typography>
            <Typography>
              <Row>
                <Col>
                  <i
                    style={{ color: "#525252" }}
                    className="fas fa-clock mr-2"
                  />
                  <span
                    style={{
                      fontSize: "inherit",
                      color: "#525252",
                      textAlign: "right",
                      marginTop: "auto"
                    }}
                  >
                    {new Date(data.created_date.$date)
                      .toLocaleString("default", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                      })
                      .toUpperCase()}
                  </span>
                  <span style={{ float: "right" }}>
                    <i
                      style={{ color: "#525252" }}
                      className="fas fa-camera mr-2"
                    />
                    <span style={{ fontSize: "inherit", color: "#525252" }}>
                      {camera_name}
                    </span>
                  </span>
                </Col>
              </Row>
            </Typography>
          </CardContent>
          {/*</CardActionArea>*/}
        </Card>
      ) : (
        <>
          <h3 align="center">No Violation Found</h3>
        </>
      )}
    </>
  );
}
