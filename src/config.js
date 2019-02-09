const dev = {
  username: "us-east-1:9fb167a2-4c3f-4daf-839e-f6a4f8cc1937", // hannahstahl14@gmail.com
  photosURL: "https://bwuvkdw9nh.execute-api.us-east-1.amazonaws.com/dev/photosForUser/",
  cloudFrontURL: "https://d2tcvelh1961gb.cloudfront.net/"
};

const prod = {
  username: "us-east-1:405c07f6-7d89-4a9a-bfe8-ef68692718c2", // annettycrocker@gmail.com
  photosURL: "https://2kc44a3aii.execute-api.us-east-1.amazonaws.com/prod/photosForUser/",
  cloudFrontURL: "https://dbtk1jpf7jtg3.cloudfront.net/"
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default config;
