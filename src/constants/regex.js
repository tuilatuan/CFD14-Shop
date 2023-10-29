export const REGREX = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};
export const MESSAGE = {
  require: "Vui lòng điền thông tin ",
  email: "Vui lòng nhập đúng định dạng email",
  password: {
    regex: "Vui lòng nhập đúng định dạng mật khẩu",
    length: "Độ dài mật khẩu trên 6 kí tự",
  },
};
