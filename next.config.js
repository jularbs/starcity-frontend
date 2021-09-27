const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = withCss(
  withSass({
    env: {
      PAYMAYA_SK: process.env.PAYMAYA_SECRET_KEY,
      PAYMAYA_PK: process.env.PAYMAYA_PUBLIC_KEY,
      SPC_API: process.env.SPC_API,
      DOMAIN: process.env.DOMAIN,
    },
    webpack5: false,
    headers: () => {
      return [
        {
          source: "/:path*{/}?",
          headers: [
            {
              key: "Strict-Transport-Security",
              value: "max-age=31536000; includeSubDomains",
            },
          ],
        },
      ];
    },
    poweredByHeader: false,
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "public/img/",
              publicPath: "../img/",
            },
          },
        ],
      });
      config.module.rules.push({
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/webfonts/",
              publicPath: "../webfonts/",
              name: "[name].[ext]",
            },
          },
        ],
      });
      return config;
    },
  })
);
