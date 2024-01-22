export const sumArrayNumber = (arr, initialValue = 0) => {
  return arr?.reduce((curr, next) => Number(curr) + Number(next), initialValue) || 0;
};
export const formatDateString = (inputDateString) => {
  // Tạo đối tượng Date từ chuỗi đầu vào

  const inputDate = new Date(inputDateString);

  // Lấy thông tin ngày, tháng và năm

  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0");

  const day = inputDate.getUTCDate().toString().padStart(2, "0");

  const year = inputDate.getUTCFullYear();
  // Xây dựng chuỗi định dạng mới

  const formattedDateString = `${year}/${month}/${day}`;

  return formattedDateString;
};
