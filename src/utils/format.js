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
export const removeAccents = (str) => {
  // remove accents
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
};
export const getImageURL = (data) =>
  `https://cfdshop.hn.ss.bfcplatform.vn/images/product/${data}`;
