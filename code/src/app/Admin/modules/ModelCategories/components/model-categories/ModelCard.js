import {CardMedia ,CardContent ,Typography ,CardActions ,Button ,Card} from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate} from "react-router-dom";
import clsx from "clsx";
import { ADMIN_URL } from "../../../../../../enums/constant";
import { setModelName } from "../../../../../../redux/subscriptionReducer";
import { useDispatch } from "react-redux";
const useStyles = makeStyles({
  card: {
    maxWidth: 380,
    height: "100%",
  },
  media: {
    height: 210,
  },
  header: {
    paddingBottom: "0rem",
  },
  learnMore: {
    position: "absolute",
    bottom: 0,
  },
});

export function ModelCard({ model }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const MODEL_CATEGORY_PAGE_BASE_URL = ADMIN_URL + "/model-categories/view";
  useEffect(() => {
    dispatch(setModelName(""));
    // eslint-disable-next-line
  }, []);
  return (
      //eslint-disable-next-line
      <Card className={clsx(classes.card)} className="new-card-css">
        {/*<CardActionArea>*/}
        <CardMedia
            className={classes.media}
            image={
                model?.model_banner_image?.model_banner_image ||
                "https://www.iotforall.com/wp-content/uploads/2018/02/Coming-Soon-to-a-Hotel-Near-You-AI-for-Building-Maintenance-696x428.jpg"
            }
            title={model?.model_name}
            alt={`${model?.model_name} Image`}
        />
        <CardContent style={{ minHeight: "140px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {model?.model_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {model?.model_description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
              size="small"
              className={classes.learnMore}
              color="primary"
              onClick={() => {
                navigate(`${MODEL_CATEGORY_PAGE_BASE_URL}/model/${model?.id}`);
              }}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
  );
}
