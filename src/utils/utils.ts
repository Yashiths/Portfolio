const getImagePrefix = () => {
  return process.env.NODE_ENV === "production"
    ? "/Yashith Sasmitha/"
    : "";
};

export { getImagePrefix };
 
