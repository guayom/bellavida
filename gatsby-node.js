const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    //Generate pages from "Page" content type
    graphql(
      `
        {
          allContentfulPage {
            edges {
              node {
                id
                slug
                node_locale
                category {
                  slug
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        const productTemplate = path.resolve(`./src/templates/simple-page.js`)
        _.each(result.data.allContentfulPage.edges, edge => {

          let category = edge.node.category === null ? "" : edge.node.category.slug + "/"
          createPage({
            path: `/${edge.node.node_locale}/${category}${edge.node.slug}/`,
            component: slash(productTemplate),
            context: {
              id: edge.node.id,
            },
          })
        })
      })
      //Generate Home Pages
      .then(() => {
        const homeTemplate = path.resolve(`./src/templates/home.js`)
        const locales = ["en", "es"]
        _.each(locales, locale => {
          createPage({
            path: `/${locale === "en" ? "" : locale + "/"}`,
            component: slash(homeTemplate),
            context: {
              locale: locale,
            },
          })
        })
      })
      //Generate products
      .then(() => {
        graphql(
          `
            {
              allContentfulProduct {
                edges {
                  node {
                    id
                    slug
                    node_locale
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
          const productTemplate = path.resolve(`./src/templates/product.js`)
          _.each(result.data.allContentfulProduct.edges, edge => {
            createPage({
              path: `/${edge.node.node_locale}/${edge.node.node_locale === "en" ? "products" : "productos"}/${edge.node.slug}/`,
              component: slash(productTemplate),
              context: {
                id: edge.node.id,
              },
            })
          })

          resolve()
        })
      })
  })
}
