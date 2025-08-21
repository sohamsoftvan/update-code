import React from "react";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import * as auth from "../../../Auth";
import ModelCategories from "./index";
import ModelCategoriesPrivate from "./ModelCategoriesPrivate";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activekey: "public",
      isPublic: true
    };
  }
  componentDidMount() {}
  handleKey(key) {
    this.setState({
      activekey: key,
      isPublic: key === "public"?true:false
    });
  }
  render() {
    return (
        <Card className="example example-compact">
          <CardBody>
            <Tabs
                id="controlled-tab-example"
                activeKey={this.state.activekey}
                onSelect={e => this.handleKey(e)}
                style={{
                  fontSize: "1.275rem",
                  fontWeight: "500",
                  marginBottom: "18px"
                }}
            >
              <Tab eventKey="public" title="Public">
                <ModelCategories isPublic={this.state.isPublic} userid={this.props.user.id} />
              </Tab>

              <Tab eventKey="private" title="Private">

                <ModelCategoriesPrivate
                    isPublic={this.state.isPublic}
                    userid={this.props.user.id}
                />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
    );
  }
}
function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}
export default connect(mapStateToProps, auth.actions)(Navigation);
