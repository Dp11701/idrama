import type { GetServerSideProps } from "next";

const AppleAppSiteAssociationPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const association = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "C35729FR53.com.begamob.shortDrama",
          paths: ["/*"],
        },
      ],
    },
    webcredentials: {
      apps: ["C35729FR53.com.begamob.shortDrama"],
    },
  };

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(association));
  res.end();

  return { props: {} };
};

export default AppleAppSiteAssociationPage;
