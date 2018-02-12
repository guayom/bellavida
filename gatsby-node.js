const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createLayout } = boundActionCreators
  const locales = ["en", "es"]

  locales.forEach(locale => {
    createLayout({
      component: path.resolve(`./src/templates/default-layout.js`),
      id: locale,
      context: {
        locale: locale
      }
    })
  })

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
            layout: edge.node.node_locale,
            context: {
              id: edge.node.id,
              pageTitle: edge.node.title,
            },
          })
        })
      })
      //Generate Brand Pages
      .then(() => {
        graphql(
          `
            {
              allContentfulProductBrand {
                edges {
                  node {
                    id
                    slug
                    title
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
          const brandTemplate = path.resolve(`./src/templates/brand.js`)
          _.each(result.data.allContentfulProductBrand.edges, edge => {
            const section =  edge.node.node_locale === "en" ? "brands" : "marcas"
            createPage({
              path: `/${[edge.node.node_locale, section, edge.node.slug].join("/")}/`,
              component: slash(brandTemplate),
              layout: edge.node.node_locale,
              context: {
                locale:  edge.node.node_locale,
                pageTitle: "Bella Vida Costa Rica",
                id: edge.node.id
              },
            })
          })
        })
        }
      )
      //Generate Home Pages
      .then(() => {
        const homeTemplate = path.resolve(`./src/templates/home.js`)
        _.each(locales, locale => {
          createPage({
            path: `/${locale === "en" ? "" : locale + "/"}`,
            component: slash(homeTemplate),
            layout: locale,
            context: {
              locale: locale,
              pageTitle: "Bella Vida Costa Rica"
            },
          })
        })
      })
      //Generate Products Index
      .then(() => {
        graphql(
          `
            {
              allContentfulProduct {
                edges {
                  node {
                    id
                    title
                    slug
                    node_locale
                  }
                }
              }
              allContentfulProductBrand{
                edges {
                  node {
                    id
                    title
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
          const productsIndexTemplate = path.resolve(`./src/templates/list-page.js`)
          const products = result.data.allContentfulProduct.edges
          _.each(locales, locale => {
            createPage({
              path: `/${locale}/${locale === "en" ? "products" : "productos"}`,
              component: slash(productsIndexTemplate),
              layout: locale,
              context: {
                locale: locale,
                pageTitle: locale === "en" ? "Products" : "Productos",
                items: products.filter(p => p.node.node_locale === locale),
              },
            })
          })
        })
        }
      )
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
              layout: edge.node.node_locale,
              context: {
                id: edge.node.id,
                pageTitle: edge.node.title,
              },
            })
          })

          resolve()
        })
      })
  })
}
