import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../layout";
import Demo2Dashboard from "./Demo2Dashboard";
import { shallowEqual, useSelector } from "react-redux";
import TopspinDashboardLatest from "./TopspinDashboardLatest";

export function Dashboard() {
    // Get UI configuration service
    const uiService = useHtmlClassService();

    // Get layout properties for the demo configuration
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(uiService.config, "demo"),
        };
    }, [uiService]);

    // Access the user data from the Redux store
    const { user } = useSelector(
        ({ auth }) => ({
            user: auth.user,
        }),
        shallowEqual
    );

    // Check if user is available and conditionally render components based on the email
    if (!user) {
        return <div>Loading...</div>; // Show loading if user data is not yet available
    }

    try {
        if (user?.user_email === "topspin_supervisor@tusker.ai") {
            return <>{layoutProps.demo === "demo1" && <TopspinDashboardLatest />}</>;
        }
        else if(user?.user_email) {
            return <>{layoutProps.demo === "demo1" && <Demo2Dashboard />}</>;
        }
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        return <div>Something went wrong.</div>; // Error fallback if rendering fails
    }
}

export default Dashboard;
