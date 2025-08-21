import { Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { Card } from "@mui/material";
import {
  CardBody,
  CardHeader
} from "../../../../../../_metronic/_partials/controls";
import { ModelCard } from "./ModelCard";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSubheader } from "../../../../../../_metronic/layout";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/ModelCategories/ModelCategoryActions";
import {
  getOneModelCategoryEnabled,
  getSearchDataOfModal,
  getAllModelMainCategory,
  getAllAIModelsByCategoryList
} from "../../_redux/ModelCategories/ModelCategoryApi";
import BlockUi from "react-block-ui";
import { Button } from "@mui/material";
import { warningToast } from "../../../../../../utils/ToastMessage";
import * as auth from "../../../Auth";

const useStyles = makeStyles({
  header: {
    paddingBottom: "0rem"
  },
  title: {
    display: "inline-flex",
    margin: "1rem 0"
  },
  search: {
    marginBottom: "10px"
  },
  card: {
    marginTop: 50
  }
});

// eslint-disable-next-line

function ModelCategoriesPrivate(props) {
  const dispatch = useDispatch();
  const { modelCategoryList, listLoading } = useSelector(
      state => ({
        modelCategoryList: state.modelCategory.privateEntities,
        listLoading: state.modelCategory.listLoading
      }),
      shallowEqual
  );

  const [models, setModels] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [apiFlag, setAPIFlag] = useState(false);
  const [searchDataCalled, setSearchDataCalled] = useState(false);
  const [searchedResponseData, setSearchedResponseData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([1]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [flag, setFlag] = useState(false);
  const classes = useStyles();
  const subheader = useSubheader();
  subheader.setTitle("Marketplace");

  const generateOptions = array => {
    let options = [];
    for (let y = 0; y < array.length; y++) {
      let data = array[y];
      options.push({
        value: data.id,
        label: data.model_category_name
      });
    }
    return options;
  };

  useEffect(() => {
    if (!props.isPublic) {
      let objectCategory = [];
      getAllModelMainCategory()
          .then(response => {
            if (response && response.data) {
              let object = response.data;
              for (let i = 0; i < object.length; i++) {
                objectCategory.push(object[i]);
              }
            }
            let obj = generateOptions(objectCategory);
            setCategoryOptions(obj);
          })
          .catch(error => {
            if (error.detail) {
              warningToast(error.detail);
            } else {
              warningToast("Something went Wrong");
            }
          });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!props.isPublic) {
      dispatch(actions.fetchModelCategories(props.isPublic));
      setModels([]);
    }
    // eslint-disable-next-line
  }, [apiFlag, props.isPublic]);

  async function fetchData() {
    if (modelCategoryList.length > 0) {
      for (const modelType of modelCategoryList) {
        try {
          setLoaderState(true);
          let res = await getOneModelCategoryEnabled(
              modelType.id,
              props.userid,
              props.isPublic
          );
          if (res) {
            //default 26 models display on the first render
            models.push(...res.data);
            setModels(models);
            setLoaderState(false);
          }
        } catch (error) {
          models.push([]);
          setModels([...models]);
          setLoaderState(false);
          if (error.detail) {
            warningToast(error.detail);
          } else {
            warningToast("Something went Wrong");
          }
        }
      }
    }
  }

  useEffect(() => {
    if (flag && !props.isPublic) {
      fetchData();
    } else {
      setFlag(true);
    }
    // eslint-disable-next-line
  }, [modelCategoryList]);

  const handleModelSearch = event => {
    setSearchValue(event.target.value);
    if (event.target.value.length > 3) {
      searchData(event.target.value);
    }
    if (event.target.value === "" || event.target.value === undefined) {
      setSearchDataCalled(false);
      setSearchedResponseData([]);
      setAPIFlag(!apiFlag); // to call original API
    }
  };
  const handleCategoryChange = id => {
    //API FOR FILTER MODELS BY CATEGORY

    if (selectedCategory.includes(parseInt(id))) {
      let category = parseInt(id);
      selectedCategory.splice(selectedCategory.indexOf(category), 1);
    } else {
      let notSelectedCategory = parseInt(id);
      selectedCategory.push(notSelectedCategory);
    }
    setLoaderState(true);
    if (selectedCategory.length > 0) {
      if (parseInt(id) !== 1) {
        if (selectedCategory.includes(1 || "1")) {
          selectedCategory.splice(selectedCategory.indexOf(1), 1);
        }
        getAllAIModelsByCategoryList(selectedCategory)
            .then(response => {
              if (response && response.data) {
                //new filter model set of perticular id
                models.push(...response.data);
                setModels(models);
                setLoaderState(false);
              }
            })
            .catch(error => {
              if (error.detail) {
                warningToast(error.detail);
              } else {
                warningToast("Something went Wrong");
              }
              setLoaderState(false);
            });
      } else {
        setSelectedCategory([1]);
        setModels([]);
        fetchData();
      }
    } else {
      setSelectedCategory([]);
      setLoaderState(false);
    }
  };

  const searchData = searchData => {
    let searchVal = searchValue;
    if (searchData && searchData !== null) {
      searchVal = searchData;
    }
    let objectDetection = [];
    // eslint-disable-next-line
    if (searchValue) {
      setSearchDataCalled(true);
      getSearchDataOfModal(searchVal, props.userid, props.isPublic)
          .then(response => {
            if (response && response.data) {
              let object = response.data;
              for (let i = 0; i < object.length; i++) {
                objectDetection.push(object[i]);
              }
              setSearchedResponseData(objectDetection);
            }
          })
          .catch(error => {
            if (error.detail) {
            } else {
              warningToast("Something went Wrong");
            }
            setSearchDataCalled(true);
            setSearchedResponseData([]);
          });
    } else {
      setSearchDataCalled(false);
      setSearchedResponseData([]);
    }
  };
  const handleTagChange = e => {
    //Reset Current Models
    models.splice(0, models.length);

    if (e.target.id === "1") {
      models.splice(0, models.length);
    }

    handleCategoryChange(e.target.id);
  };
  return (
      <>
        <InputGroup
            size="lg"
            onChange={handleModelSearch}
            // onBlur={searchData}
            className={classes.search}
        >
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-lg">
              Search Model{" "}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
              size="lg"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
          />
          <InputGroup.Append onClick={() => searchData(null)}>
            <Button
                variant="outline-secondary"
                style={{ backgroundColor: "#147b82" }}
            >
              <i className="flaticon2-magnifier-tool btn btn-hover-transparent-white" />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <BlockUi tag="div" blocking={listLoading} color="#147b82">
          <BlockUi tag="div" blocking={loaderState} color="#147b82">
            {searchDataCalled && (
                <Card className="example example-compact mb-4">
                  <CardHeader title={"Searched Result"}>
                    <CardBody>
                      {searchedResponseData.length ? (
                          <>
                            <Row className="mb-5">
                              {searchedResponseData.map(model => (
                                  <Col
                                      xl={4}
                                      md={4}
                                      sm={4}
                                      lg={4}
                                      className={classes.card}
                                  >
                                    <ModelCard model={model} />
                                  </Col>
                              ))}
                            </Row>
                          </>
                      ) : (
                          <>
                            <h3 className={"text-center"}>No results found</h3>
                          </>
                      )}
                    </CardBody>
                  </CardHeader>
                </Card>
            )}
            {!searchDataCalled && (
                <>
                  {modelCategoryList?.map(
                      (modelType, idx) =>
                          models[idx] &&
                          models[idx].length !== 0 && (
                              <div className="example example-compact mb-4">
                                <CardBody>
                                  <div>
                                    {props.isPublic && (
                                        <Col
                                            xl={12}
                                            md={12}
                                            sm={12}
                                            lg={12}
                                            style={{ maxHeight: "200px", overflowY: "auto" }}
                                        >
                                          {/*categoryOptions for display all model category*/}
                                          {categoryOptions.map((item, index) => {
                                            return (
                                                <>
                                                  <button
                                                      key={index}
                                                      id={index + 1}
                                                      name={item.label}
                                                      className={
                                                        selectedCategory.includes(item.value)
                                                            ? "tag2"
                                                            : "tag"
                                                      }
                                                      onClick={e => handleTagChange(e)}
                                                  >
                                                    {item.label}
                                                  </button>
                                                </>
                                            );
                                          })}
                                        </Col>
                                    )}
                                  </div>
                                  {/*<div className="separator separator-dashed my-7"></div>*/}
                                  <div className="mt-2"></div>
                                  {idx < models.length ? (
                                      <>
                                        <Row className="mb-5">
                                          {models?.map(model => (
                                              <Col
                                                  xl={4}
                                                  md={4}
                                                  sm={4}
                                                  lg={4}
                                                  className={classes.card}
                                              >
                                                <ModelCard model={model} />
                                              </Col>
                                          ))}
                                        </Row>
                                      </>
                                  ) : null}
                                </CardBody>
                              </div>
                          )
                  )}
                </>
            )}
          </BlockUi>
        </BlockUi>
      </>
  );
}

function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}
export default connect(mapStateToProps, auth.actions)(ModelCategoriesPrivate);
