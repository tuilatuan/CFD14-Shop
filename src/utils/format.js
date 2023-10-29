import moment from "moment";
import { DATE_FORMAT } from "../constants/format";

export const formatDate = (date, format = DATE_FORMAT) => {
  if (!date) return "";
  return moment(date).format(format);
};

export const formatCurrency = (data, type = "vi-VN") => {
  if (!data || isNaN(data)) return 0;
  return data.toLocaleString(type);
};
export const transformNumberToPercent = (number) => {
  if (!number) return 0;
  return number * 100;
};
