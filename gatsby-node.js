const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

function getTranslatedPage(array, id, locale){
  let targetId = locale === "en" ? `${id}___es` : id.replace(/___es/, '')
  let translatedPage = array.find(p => p.node.id === targetId).node
  let translatedCategory = translatedPage.category === null || translatedPage.category === undefined ? "" : translatedPage.category.slug + "/"
  let oppositeLocale = locale === "en" ? "es" : "en"

  let result = {
    category: translatedCategory,
    slug: translatedPage.slug,
    locale: oppositeLocale
  }

  return result
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createLayout } = boundActionCreators
  const locales = ["en", "es"]

  locales.forEach(locale => {
    createLayout({
      component: path.resolve(`./src/templates/default-layout.js`),
      id: locale,
      context: {
        locale: locale,
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
          let translatedPage = getTranslatedPage(result.data.allContentfulPage.edges, edge.node.id, edge.node.node_locale)

          createPage({
            path: `/${edge.node.node_locale}/${category}${edge.node.slug}`,
            component: slash(productTemplate),
            layout: edge.node.node_locale,
            context: {
              id: edge.node.id,
              pageTitle: edge.node.title,
              translation: `/${translatedPage.locale}/${translatedPage.category}${translatedPage.slug}`,
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
            const section = edge.node.node_locale === "en" ? "brands" : "marcas"
            const translatedSection = edge.node.node_locale === "en" ? "marcas" : "brands"
            let translatedPage = getTranslatedPage(result.data.allContentfulProductBrand.edges, edge.node.id, edge.node.node_locale)
            createPage({
              path: `/${[edge.node.node_locale, section, edge.node.slug].join("/")}`,
              component: slash(brandTemplate),
              layout: edge.node.node_locale,
              context: {
                locale:  edge.node.node_locale,
                pageTitle: "Bella Vida Costa Rica",
                id: edge.node.id,
                translation: `/${[translatedPage.locale, translatedSection, translatedPage.slug].join("/")}`,
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
            path: `/${locale === "en" ? "" : locale}`,
            component: slash(homeTemplate),
            layout: locale,
            context: {
              locale: locale,
              pageTitle: "Bella Vida Costa Rica",
              translation: `/${locale === "en" ? locale + "/" : ""}`,
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
                    image {
                      sizes(maxWidth: 400, maxHeight: 150) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                      }
                    }
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
                    image {
                      sizes(maxWidth: 400, maxHeight: 150) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                      }
                    }
                  }
                }
              }
              allContentfulPage(filter: {category: {contentful_id: {eq: "2XUCff1tqo6SKIW68wmo2e"}}}) {
                edges {
                  node {
                    id
                    title
                    slug
                    node_locale
                    image {
                      sizes(maxWidth: 400, maxHeight: 150) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                      }
                    }
                  }
                }
              }
              allContentfulProject {
                edges {
                  node {
                    id
                    title
                    slug
                    node_locale
                    images {
                      sizes {
                        base64
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                      }
                    }
                    content{
                      content
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
          const listPageTemplate = path.resolve(`./src/templates/list-page.js`)
          const singlePageTemplate = path.resolve(`./src/templates/single.js`)
          const contactPageTemplate = path.resolve(`./src/templates/contact.js`)
          const products = result.data.allContentfulProduct.edges
          const brands = result.data.allContentfulProductBrand.edges
          const environmentPages = result.data.allContentfulPage.edges
          const projects = result.data.allContentfulProject.edges

          _.each(locales, locale => {
            createPage({
              path: `/${locale}/${locale === "en" ? "products" : "productos"}`,
              component: slash(listPageTemplate),
              layout: locale,
              context: {
                locale: locale,
                pageTitle: locale === "en" ? "Products" : "Productos",
                items: products.filter(p => p.node.node_locale === locale).map(p => ({id: p.node.id, title: p.node.title, slug: p.node.slug, image: p.node.image.sizes })),
                translation: `/${locales.filter(l => l != locale)[0]}/${locale === "en" ? "productos" : "products"}`,
              },
            })
            createPage({
              path: `/${locale}/${locale === "en" ? "brands" : "marcas"}`,
              component: slash(listPageTemplate),
              layout: locale,
              context: {
                locale: locale,
                pageTitle: locale === "en" ? "Brands" : "Nuestras Marcas",
                items: brands.filter(p => p.node.node_locale === locale).map(p => ({ id: p.node.id, title: p.node.title, slug: p.node.slug, image: p.node.image.sizes })),
                translation: `/${locales.filter(l => l != locale)[0]}/${locale === "en" ? "marcas" : "brands"}`,
              },
            })
            createPage({
              path: `/${locale}/${locale === "en" ? "environment" : "medio-ambiente"}`,
              component: slash(listPageTemplate),
              layout: locale,
              context: {
                locale: locale,
                pageTitle: locale === "en" ? "Environment" : "Medio Ambiente",
                items: environmentPages.filter(p => p.node.node_locale === locale).map(p => ({ id: p.node.id, title: p.node.title, slug: p.node.slug, image: p.node.image.sizes })),
                translation: `/${locales.filter(l => l != locale)[0]}/${locale === "en" ? "medio-ambiente" : "environment"}`,
              },
            })
            createPage({
              path: `/${locale}/${locale === "en" ? "projects" : "proyectos"}`,
              component: slash(listPageTemplate),
              layout: locale,
              context: {
                locale: locale,
                pageTitle: locale === "en" ? "Our Projects" : "Nuestros Proyectos",
                items: projects.filter(p => p.node.node_locale === locale).map(p => ({ id: p.node.id, title: p.node.title, slug: p.node.slug, image: p.node.images[0].sizes })),
                translation: `/${locales.filter(l => l != locale)[0]}/${locale === "en" ? "proyectos" : "projects"}`,
              },
            })
            createPage({
              path: `/${locale}/${locale === "en" ? "contact-us" : "contactenos"}`,
              component: slash(contactPageTemplate),
              layout: locale,
              context: {
                locale: locale,
                pageTitle: locale === "en" ? "Contact Us" : "Contáctenos",
                translation: `/${locales.filter(l => l != locale)[0]}/${locale === "en" ? "contactenos" : "contact-us"}`,
              },
            })
            _.each(result.data.allContentfulProject.edges, edge => {
              let translatedProjectPage = getTranslatedPage(result.data.allContentfulProject.edges, edge.node.id, edge.node.node_locale)
              createPage({
                path: `/${edge.node.node_locale}/${edge.node.node_locale === "en" ? "projects" : "proyectos"}/${edge.node.slug}`,
                component: slash(singlePageTemplate),
                layout: edge.node.node_locale,
                context: {
                  id: edge.node.id,
                  pageTitle: edge.node.title,
                  pageContent: edge.node,
                  translation: `/${translatedProjectPage.locale}/${translatedProjectPage.locale === "en" ? "projects" : "proyectos"}/${translatedProjectPage.slug}`,
                },
              })
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
            let translatedProductPage = getTranslatedPage(result.data.allContentfulProduct.edges, edge.node.id, edge.node.node_locale)
            createPage({
              path: `/${edge.node.node_locale}/${edge.node.node_locale === "en" ? "products" : "productos"}/${edge.node.slug}`,
              component: slash(productTemplate),
              layout: edge.node.node_locale,
              context: {
                id: edge.node.id,
                pageTitle: edge.node.title,
                translation: `/${translatedProductPage.locale}/${translatedProductPage.locale === "en" ? "products" : "productos"}/${translatedProductPage.slug}`,
              },
            })
          })

          resolve()
        })
      })
  })
}
