const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allContentfulProduct(filter: { node_locale: { eq: "en-US" } }) {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const productTemplate = path.resolve(`./src/templates/product.js`)
        _.each(result.data.allContentfulProduct.edges, edge => {
          createPage({
            path: `/en/products/${edge.node.slug}/`,
            component: slash(productTemplate),
            context: {
              id: edge.node.id,
            },
          })
        })
      })
      .then(() => {
        graphql(
          `
            {
              allContentfulProduct(filter: { node_locale: { eq: "es" } }) {
                edges {
                  node {
                    id
                    slug
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
              path: `/es/productos/${edge.node.slug}/`,
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
