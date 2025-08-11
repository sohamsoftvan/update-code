import React  from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {Tab, Tabs} from "react-bootstrap";
import Attendance from "./Attendance";
import Reports from "./Reports";
import {connect} from "react-redux";
import * as auth from "../Auth";


class AttendanceTabPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey : 'configurations' ,
        }
    }
    componentDidMount() {
        const {user} = this.props;
        let userRole = user.roles[0].role;
        this.setState({
            userRole:userRole
        })
        if(userRole === "admin") {
            this.setState({
                activeKey : 'configurations'
            })
        } else if(userRole === "supervisor") {
            this.setState({
                activeKey : 'results'
            })
        }
    }

    handleKey(key){
        this.setState({
            activeKey : key
        })
    }
    render() {
        return(
            <Card className="example example-compact">
                {/*<CardHeader title={"Deployment Details"}/>*/}
                <CardBody>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={this.state.activeKey}
                        onSelect={(e)=>this.handleKey(e)}
                        style={{fontSize: "1.275rem", fontWeight: "500"}}
                    >
                        {this.state.userRole === "admin" &&
                            <Tab eventKey="configurations" title="Configurations">
                                <Attendance/>
                            </Tab>
                        }
                        <Tab eventKey="results" title="Reports" >
                            <Reports />
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        )
    }
}
function mapStateToProps(state) {
    const { auth } = state;
    return { user: auth.user}
}
export default connect(mapStateToProps, auth.actions)(AttendanceTabPage);