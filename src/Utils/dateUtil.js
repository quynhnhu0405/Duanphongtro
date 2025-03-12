export const formatTimeAgo = (dateString) => {
  const postDate = new Date(dateString);
  const today = new Date();
  const differenceInTime = today - postDate;

  const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60));
  const differenceInHours = Math.floor(differenceInTime / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} phút trước`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours} giờ trước`;
  } else {
    return `${differenceInDays} ngày trước`;
  }
};
