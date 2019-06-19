// Create Home Pages
async function createHomePages(actions, reporter) {
  const { createPage, createPageDependency } = actions
  const homePages = [
    { locale: "en", path: "/", pageTitle: "Bellavida Costa Rica" },
    { locale: "es", path: "/es/", pageTitle: "Bellavida Costa Rica" },
  ]
  homePages.forEach(({ path, locale, pageTitle }) => {
    const translation = homePages.find(p => p.locale !== locale).path
    const id = `home-${locale}`
    reporter.info(`Creating page: ${path} -> ${translation}`)

    createPage({
      path,
      component: require.resolve("./src/templates/home.js"),
      context: { id, locale, translation, pageTitle },
    })

    createPageDependency({ path, nodeId: id })
  })
}

// Generate pages from "Page" content type
async function createSimplePages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      pages: allContentfulPage {
        edges {
          node {
            id
            slug
            node_locale
            title
            contentful_id
            category {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const pageEdges = (result.data.pages || {}).edges || []

  pageEdges.forEach(edge => {
    const {
      id,
      contentful_id,
      node_locale,
      slug,
      category,
    } = edge.node
    const genPath = (locale, category, slug) => {
      const catSlug = category ? category.slug + "/" : ""
      return `/${locale}/${catSlug}${slug}/`
    }
    const path = genPath(node_locale, category, slug)
    const translationNode = pageEdges.find(
      p =>
        p.node.contentful_id === contentful_id &&
        p.node.node_locale !== node_locale
    ).node
    const translation = genPath(
      translationNode.node_locale,
      translationNode.category,
      translationNode.slug
    )
    reporter.info(`Creating page: ${path} -> ${translation}`)

    createPage({
      path,
      component: require.resolve("./src/templates/simple-page.js"),
      context: {
        id: edge.node.id,
        contentful_id,
        pageTitle: edge.node.title,
        locale: node_locale,
        translation,
      },
    })

    createPageDependency({ path, nodeId: id })
  })
}

// Create Contact Pages
async function createContactPages(actions, reporter) {
  const { createPage, createPageDependency } = actions
  // const contactPages = [
  //   { locale: "en", path: "/en/contact-us/", pageTitle: "Contact Us" },
  //   { locale: "es", path: "/es/contactenos/", pageTitle: "Contáctenos" },
  // ]
  // contactPages.forEach( page => {
  //   const translation = contactPages.find(p => p.locale !== page.locale).path
  //   const id = `contact-${page.locale}`
  //   reporter.info(`Creating page: ${page.path} -> ${page.translation}`)

  //   createPage({
  //     path: page.path,
  //     component: require.resolve("./src/templates/contact.js"),
  //     context: { id: page.id, locale: page.locale, translation, pageTitle: page.pageTitle },
  //   })

  //   createPageDependency({ path: page.path, nodeId: id })
  // })

  reporter.info(`Creating page: "/en/contact-us/"`)
  createPage({
    path: "/en/contact-us/",
    component: require.resolve("./src/templates/contact.js"),
    context: {
      id: `contact-en`,
      locale: "en",
      translation: "/es/contactenos/",
      pageTitle: "Contact Us",
    },
  })

  reporter.info(`Creating page: "/es/contactactenos/"`)
  createPage({
    path: "/es/contactenos/",
    component: require.resolve("./src/templates/contact.js"),
    context: {
      id: `contact-en`,
      locale: "es",
      translation: "/en/contact-us/",
      pageTitle: "Contáctenos",
    },
  })
}

// Create product pages
async function createProductPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  
  const result = await graphql(`
    {
      products: allContentfulProduct {
        edges {
          node {
            id
            contentful_id
            node_locale
            slug
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const productEdges = (result.data.products || {}).edges || []

  // Generate products index pages
  const ProductIndexPages = [
    { locale: "en", path: "/en/products/", pageTitle: "Our Products" },
    { locale: "es", path: "/es/productos/", pageTitle: "Nuestros Productos" },
  ]
  ProductIndexPages.forEach(({ path, locale, pageTitle }) => {
    const translation = ProductIndexPages.find(p => p.locale !== locale).path
    reporter.info(`Creating page: ${path} -> ${translation}`)
    createPage({
      path,
      component: require.resolve("./src/templates/products.js"),
      context: {
        id: `products-${locale}`,
        locale: locale,
        pageTitle,
        translation,
      },
    })
  })

  productEdges.forEach(edge => {
    const { id, contentful_id, node_locale, slug } = edge.node
    const prefixes = {
      en: "/en/products/",
      es: "/es/productos/",
    }
    const path = `${prefixes[node_locale]}${slug}/`
    const translationNode = productEdges.find(
      p =>
        p.node.contentful_id === contentful_id &&
        p.node.node_locale !== node_locale
    ).node
    const translation =
      prefixes[translationNode.node_locale] + translationNode.slug
    reporter.info(`Creating page: ${path} -> ${translation}`)

    createPage({
      path,
      component: require.resolve("./src/templates/product.js"),
      context: { id, contentful_id, locale: node_locale, translation },
    })

    createPageDependency({ path, nodeId: id })
  })
}

// Create brand pages
async function createBrandPages(graphql, actions, reporter) {

  const { createPage, createPageDependency } = actions

  // Quey brands
  const result = await graphql(`
    {
      brands: allContentfulProductBrand {
        edges {
          node {
            id
            contentful_id
            node_locale
            slug
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const brandEdges = (result.data.brands || {}).edges || []

  // Generate brands index pages
  const BrandIndexPages = [
    { locale: "en", path: "/en/brands/", pageTitle: "Our brands" },
    { locale: "es", path: "/es/marcas/", pageTitle: "Nuestras marcas" },
  ]
  BrandIndexPages.forEach(({ path, locale, pageTitle }) => {
    const translation = BrandIndexPages.find(p => p.locale !== locale).path
    reporter.info(`Creating BRANDS INDEX page: ${path} -> ${translation}`)
    createPage({
      path,
      component: require.resolve("./src/templates/brands.js"),
      context: {
        id: `brands-${locale}`,
        locale,
        pageTitle,
        translation,
      },
    })
  })

  // Generate a page for each brand
  brandEdges.forEach(edge => {
    const { id, contentful_id, node_locale, slug } = edge.node
    const prefixes = {
      en: "/en/brands/",
      es: "/es/marcas/",
    }
    const path = `${prefixes[node_locale]}${slug}/`
    const translationNode = brandEdges.find(
      p =>
        p.node.contentful_id === contentful_id &&
        p.node.node_locale !== node_locale
    ).node
    const translation =
      prefixes[translationNode.node_locale] + translationNode.slug
    reporter.info(`Creating BRAND page: ${path} -> ${translation}`)

    createPage({
      path,
      component: require.resolve("./src/templates/brand.js"),
      context: { id, contentful_id, locale: node_locale, translation },
    })

    createPageDependency({ path, nodeId: id })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createHomePages(actions, reporter)
  await createSimplePages(graphql, actions, reporter)
  await createContactPages(actions, reporter)
  await createProductPages(graphql, actions, reporter)
  await createBrandPages(graphql, actions, reporter)
}
