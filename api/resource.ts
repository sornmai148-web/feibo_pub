import * as I from "./interface";
import { fetchApi, fetchClientApi } from "./main";
import { group } from "radash";

type ResponseCustomType = Record<FieldType, Array<I.IFilter>>;

export async function getAllFilter() {
  try {
    const response = await fetchApi<I.IFilterResponse>("/filter/getFilters", {
      body: { platType: "feibo", langCode: "zh-cn" },
    });

    if (!!!response) return {} as ResponseCustomType;
    const groupFilterTypes = group(response.data, (f) => f.fieldName);

    return groupFilterTypes as ResponseCustomType;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFeiboList(options: I.ISearchOptions) {
  try {
    const response = await fetchClientApi<I.IFeiboResponses>(
      "/content/searchContent",
      { body: options }
    );

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAnnoucement(options: I.IAnnoucementOpt) {
  try {
    const response = await fetchApi<I.IAnnoucementResponse>("/notice/getList", {
      body: options,
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
