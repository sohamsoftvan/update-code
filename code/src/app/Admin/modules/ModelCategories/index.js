import React from "react";
import { Route, Switch } from "react-router-dom";
import Model from "./components/model";
import { ADMIN_URL } from "../../../../enums/constant";
import Navigation from "./components/model-categories/Navigation";

export function ModelCategoryPage({ history }) {
  const MODEL_CATEGORY_PAGE_BASE_URL = ADMIN_URL + "/model-categories/view";

  return (
    <Switch>
      <Route exact path={`${MODEL_CATEGORY_PAGE_BASE_URL}`}>
        <Navigation />
      </Route>
      <Route exactMatch path={`${MODEL_CATEGORY_PAGE_BASE_URL}/model/:id`}>
        {({ match }) => <Model id={match?.params?.id} />}
      </Route>
    </Switch>
  );
}
