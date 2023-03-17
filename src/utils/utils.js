export const getLast12DatesString = () => {
  let dateString = "";
  const today = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    dateString += `&dates[]=${year}-${month}-${day}`;
  }

  return dateString;
};
