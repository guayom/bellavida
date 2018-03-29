require('dotenv').config()

const query = `{
  allContentfulProduct {
    edges {
      node {
        objectID: id
        slug
        node_locale
        title
        description {
          description
        }
      }
    }
  }
}`;

const queries = [
  {
    query,
    transformer: ({ data }) => data.allSitePage.edges.map(({ node }) => node),
  },
];

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: true,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Montserrat`]
      }
    },
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-69239129-1",
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_API_KEY,
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
        indexName: 'main',
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
  ],
};
