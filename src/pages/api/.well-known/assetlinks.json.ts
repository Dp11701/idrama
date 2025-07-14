import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const assetlinks = [
    {
      relation: [
        "delegate_permission/common.handle_all_urls",
        "delegate_permission/common.get_login_creds",
      ],
      target: {
        namespace: "android_app",
        package_name: "movie.idrama.shorttv.apps",
        sha256_cert_fingerprints: [
          "01:B6:4C:07:3B:15:C1:22:91:D7:C7:FB:6C:EB:BC:9D:45:10:BD:B1:7F:E2:8F:B9:80:48:2F:67:77:89:9D:44",
        ],
      },
    },
  ];

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(assetlinks);
}
