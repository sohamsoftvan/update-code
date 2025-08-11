import { callTypes, ModelCategoriesSlice } from "./ModelCategorySlice";
import {
  getAllModelCategoriesEnabled,
} from "./ModelCategoryApi";
import { warningToast } from "../../../../../../utils/ToastMessage";

const { actions } = ModelCategoriesSlice;

export const fetchModelCategories = isPublic => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  getAllModelCategoriesEnabled()
    .then(response => {
      if (response && response.isSuccess) {
        if (isPublic) {
          dispatch(actions.modelCategoryFetched(response.data));
        } else {
          dispatch(actions.privateModelCategoryFetched(response.data));
        }
      } else {
        // warningToast("something went wrong");
      }
    })
    .catch(error => {
      error.clientMessage = "Can't find models catalogue";
      if (error.detail) {
        warningToast(error.detail);
      } else {
        warningToast("Something went Wrong");
      }
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
