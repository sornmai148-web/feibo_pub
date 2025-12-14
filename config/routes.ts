export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  SEARCH: "/search",
  ERROR: "/error-fallback",

  //-- ONLY used with search
  $SEARCH: function (search: string) {
    return `${this.SEARCH}?${search ? `keywords=${search}` : ""}`;
  },

  //-- ONLY used with search
  $HOME_SEARCH: function (slug?: string, search?: string) {
    const slugCombine =
      slug && search
        ? `&keywords=${search}`
        : !slug && search
        ? `keywords=${search}`
        : "";
    return `${this.HOME}?${slug}${slugCombine}`;
  },

  $HOME_HEADER: function (home: "true") {
    return `${this.HOME}?${home ? `home=${home}` : ""}`;
  },

  //-- ONLY used with filter
  $FILTER: function (opt: {
    filterValue?: string;
    fieldId?: number;
    parentLabel?: string;
    subLabel?: string;
  }) {
    const { filterValue, parentLabel, subLabel, fieldId } = opt || {};
    return `${this.SEARCH}?${
      !!filterValue ? `filter_value=${filterValue?.trim()}` : ""
    }${!!parentLabel ? `&parent_label=${parentLabel}` : ""}${
      !!subLabel ? `&sub_label=${subLabel}` : ""
    }${!!fieldId ? `&field_id=${fieldId}` : ""}`;
  },

  $HOME: function (opt: {
    filterValue?: string;
    fieldId?: number;
    parentLabel?: string;
    subLabel?: string;
  }) {
    const { filterValue, parentLabel, subLabel, fieldId } = opt || {};
    return `${this.HOME}?${
      !!filterValue ? `filter_value=${filterValue?.trim()}` : ""
    }${!!parentLabel ? `&parent_label=${parentLabel}` : ""}${
      !!subLabel ? `&sub_label=${subLabel}` : ""
    }${!!fieldId ? `&field_id=${fieldId}` : ""}`;
  },
} as const;
