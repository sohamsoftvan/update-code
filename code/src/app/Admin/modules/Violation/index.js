import React from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {Tab, Tabs} from "react-bootstrap";
import ViolationAttendance from "./ViolationAttendance";
import ViolationReports from "./ViolationReports";
import {connect} from "react-redux";
import * as auth from "../Auth";
import {ViolationInsights} from "./ViolationInsights";
import {ViolationUIProvider} from "./ViolationUIContext";
import {ADMIN_ROLE, SUPERVISOR_ROLE} from "../../../../enums/constant";
import {ViolationNotificationPage} from "./ViolationNotification/ViolationNotificationPage";

class ViolationTabPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activekey: "configurations",
      violationNotification : false,
      violationNotificationId : null
    };
  }
  componentDidMount() {
    const { user } = this.props;
    let userRole = user.roles[0].role;
    this.setState({
      userRole: userRole,
    });
    if (userRole === ADMIN_ROLE) {
      this.setState({
        activekey: "insights",
      });
    } else if (userRole === SUPERVISOR_ROLE) {
      this.setState({
        activekey: "insights",
      });
    }
  }
  handleKey(key) {
    this.setState({
      activekey: key,
    });
  }

  violationNotification =(cellContent , row) =>{
    this.setState({
      violationNotification : !this.state.violationNotification,
      violationNotificationId : row,
      // activekey: "configurations",
    })
  }

  render() {
    const {violationNotification} = this.state
    return (
      <ViolationUIProvider>
        <Card className="example example-compact">
          <CardBody>

            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.activekey}
              onSelect={(e) => this.handleKey(e)}
              style={{ fontSize: "1.275rem", fontWeight: "500" }}
            >
              <Tab eventKey="insights" title="Insights">
                <ViolationInsights activekey={this.state.activekey} />
              </Tab>
              <Tab eventKey="results" title="Reports">
                <ViolationReports activekey={this.state.activekey} />
              </Tab>
              {this.state.userRole === ADMIN_ROLE && (
                <Tab eventKey="configurations" title="Configurations">
                  {!violationNotification ?
                      <ViolationAttendance
                          violationNotification={( row)=>this.violationNotification(row)}
                          activekey={this.state.activekey}
                      /> :
                      <ViolationNotificationPage
                          violationNotification={( row)=>this.violationNotification(row)}
                      />
                  }
                </Tab>
              )}
            </Tabs>
          </CardBody>
        </Card>
      </ViolationUIProvider>
    );
  }
}
function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}
export default connect(mapStateToProps, auth.actions)(ViolationTabPage);
