import { request } from "../../../../../../utils/APIRequestService";
import { HttpRequest } from "../../../../../../enums/http.methods";

const GET_ALL_ENABLED_MODEL_Types = "/get_all_enabled_model_types";
const GET_ONE_MODEL_TYPE = "/get_model_by_model_type_id";
const GET_ONE_ENABLED_MODEL_TYPE = "/get_enabled_model_by_model_type_id";
const GET_SEARCH_DATA_OF_MODAL = "/enabled_model_search";
const GET_ALL_MODEL_MAIN_CATEGORY = "/get_all_model_main_category";
const GET_MODELS_BY_LIST_OF_CATEGORY_ID =
  "/get_models_by_list_of_model_category_id";


export async function getAllModelCategoriesEnabled() {
  return await request({
    endpoint: GET_ALL_ENABLED_MODEL_Types,
    method: HttpRequest.GET
  });
}

export async function getOneModelCategory(categoryId) {
  return await request({
    endpoint: GET_ONE_MODEL_TYPE + `?model_type_id=${categoryId}`,
    method: HttpRequest.GET
  });
}

export async function getOneModelCategoryEnabled(categoryId, userid, isPublic) {
  let endpoint = GET_ONE_ENABLED_MODEL_TYPE + `?model_type_id=${categoryId}`;
  if (!isPublic) {
    endpoint =
      GET_ONE_ENABLED_MODEL_TYPE +
      `?model_type_id=${categoryId}&user_id=${userid}`;
  }
  return await request({
    endpoint: endpoint,
    method: HttpRequest.GET
  });
}

export async function getSearchDataOfModal(searchValue, userid, isPublic) {
  let endpoint = GET_SEARCH_DATA_OF_MODAL + "?model_name=" + searchValue;
  if (!isPublic) {
    endpoint =
      GET_SEARCH_DATA_OF_MODAL +
      "?model_name=" +
      searchValue +
      `&user_id=${userid}`;
  }
  return await request({
    endpoint: endpoint,
    method: HttpRequest.GET
  });
}

export async function getAllModelMainCategory() {
  return await request({
    endpoint: GET_ALL_MODEL_MAIN_CATEGORY,
    method: HttpRequest.GET
  });
}

export async function getAllAIModelsByCategoryList(data) {
  return await request({
    endpoint: GET_MODELS_BY_LIST_OF_CATEGORY_ID,
    method: HttpRequest.POST,
    body: JSON.stringify(data)
  });
}
