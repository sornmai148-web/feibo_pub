type IResponseWrapper<T> = {
  msg: string;
  code: number;
  data: T;
};

type CMSType = "news" | "job" | "rental" | "feibo";

export interface IFilterOptions {
  platType: CMSType;
  langCode: string;
}

interface SearchInnerFilter {
  fieldId?: number;
  values?: string[];
  fieldName?: "searchText";
  inputText?: string;
}

export interface ISearchOptions {
  contentType: CMSType;
  langCode: string;
  pageNum: number;
  pageSize: number;
  filters: Array<SearchInnerFilter>;
}

// categoryCodes

export interface IFilterValue {
  id: number;
  createTime: string;
  updateTime: string;
  fieldId: number;
  fieldValue: string;
  valueText: string;
  sort: number;
  status: number;
  parentId: number | null;
}

//-- Filter Option
export interface IFilter {
  id: number;
  createTime: string;
  updateTime: string;
  platType: CMSType;
  langCode: string;
  sort: number;
  fullSort: string;
  parentId: string | null;
  fieldName: string;
  displayName: string;
  fieldType: string;
  operator: string;
  status: number;
  code: string;
  parentCode: number | string | null;
  parentName: string | number;
  parentDisplay: string | number;
  values: Array<IFilterValue>;
}

export interface IMedia {
  id: number;
  createTime: string;
  updateTime: string;
  contentId: number;
  mediaType: string;
  url: string;
  sort: number;
  altText: string;
}

export interface IFeibo {
  id: number;
  createTime: string;
  updateTime: string;
  contentId: number;
  platType: CMSType;
  status: number;
  regionCode: string;
  isFeatured: number;
  publishTime: string | null;
  langCode: string;
  langId: number;
  title: string;
  body: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  searchText: string;
  categoryCodes: (string | number)[];
  meta: string | null;
  medias: IMedia[];
  actionTarget: { id: number; url: string };
}

export interface IAnnoucementOpt {
  platType: CMSType;
  langCode: string;
  lstStatus: string[];
}

interface IAnnoucement {
  id: number;
  createTime: string;
  updateTime: string;
  platType: CMSType;
  langCode: string;
  text: string;
  notifyType: string;
  notifyTarget: string;
  status: string;
  publishTime: string | null;
  validDays: number;
  createBy: string | null;
  updateBy: string | null;
  lstStatus: string | null;
}

//--- All export responses
export type IFilterResponse = IResponseWrapper<Array<IFilter>>;
export type IFeiboResponses = IResponseWrapper<{
  total: number;
  data: Array<IFeibo>;
}>;
export type IAnnoucementResponse = IResponseWrapper<Array<IAnnoucement>>;
