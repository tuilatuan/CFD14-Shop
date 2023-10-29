const REGREX = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

const validate = (rules, values) => {
  let errObj = {};
  for (const ruleKey in rules) {
    for (const rule of rules[ruleKey]) {
      if (typeof rule === "function") {
        const message = rule(values[ruleKey], values);
        console.log("message", message);
        if (!!message) {
          errObj[ruleKey] = message || "Du lieu nhap sai";
          break;
        }
      }
      //kiem tra require

      if (rule.require) {
        if (!!!values[ruleKey]) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập";
          break;
        }
      }
      //kiem tra regrex
      if (rule.regrex instanceof RegExp) {
        if (!rule.regrex.test(values[ruleKey])) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      } else if (rule.regrex in REGREX) {
        if (!REGREX[rule.regrex].test(values[ruleKey])) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      }
    }
  }
  return errObj;
};

export const requireRule = (message) => {
  return {
    require: true,
    message,
  };
};
export const regrexRule = (regrex, message) => {
  return {
    regrex,
    message,
  };
};

export default validate;
