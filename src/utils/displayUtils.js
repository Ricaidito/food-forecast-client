import ORIGINS from "../origins/productOrigins";
import CATEGORIES from "../categories/productCategories";

export const getDisplayOrigin = origin => {
  const originObj = ORIGINS.find(o => o.originValue === origin);
  return originObj ? originObj.text : "";
};

export const getDisplayCategory = category => {
  const categoryObj = CATEGORIES.find(c => c.categoryValue === category);
  return categoryObj ? categoryObj.text : "";
};
