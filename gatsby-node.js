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
  const { createPage } = actions

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
      id: `contact-es`,
      locale: "es",
      translation: "/en/contact-us/",
      pageTitle: "Contáctenos",
    },
  })
}

// Create Environment index pages
async function createEnvironmentPages(actions, reporter) {
  const { createPage, createPageDependency } = actions

  reporter.info(`Creating page: /en/environment/`)
  createPage({
    path: `/en/environment/`,
    component: require.resolve("./src/templates/environment.js"),
    context: {
      id: `environmnent-en`,
      locale: "en",
      pageTitle: "Environment",
      translation: `/es/medio-ambiente/`,
    },
  })

  reporter.info(`Creating page: /es/medio-ambiente/`)
  createPage({
    path: `/es/medio-ambiente/`,
    component: require.resolve("./src/templates/environment.js"),
    context: {
      id: `environmnent-es`,
      locale: "es",
      pageTitle: "Medio Ambiente",
      translation: '/en/environment/'
    },
  })
}

// Create Project index pages
async function createProjectPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions

  reporter.info(`Creating page: /en/projects/`)
  createPage({
    path: `/en/projects/`,
    component: require.resolve("./src/templates/projects.js"),
    context: {
      id: `projects-en`,
      locale: "en",
      pageTitle: "Projects",
      translation: `/es/proyectos/`,
    },
  })

  reporter.info(`Creating page: /es/proyectos/`)
  createPage({
    path: `/es/proyectos/`,
    component: require.resolve("./src/templates/projects.js"),
    context: {
      id: `projects-es`,
      locale: "es",
      pageTitle: "Proyectos",
      translation: '/en/projects/'
    },
  })

  const result = await graphql(`
    {
      products: allContentfulProject {
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

  const projectEdges = (result.data.products || {}).edges || []

  projectEdges.forEach(edge => {
    const { id, contentful_id, node_locale, slug } = edge.node
    const prefixes = {
      en: "/en/projects/",
      es: "/es/proyectos/",
    }
    const path = `${prefixes[node_locale]}${slug}/`
    const translationNode = projectEdges.find(
      p =>
        p.node.contentful_id === contentful_id &&
        p.node.node_locale !== node_locale
    ).node
    const translation =
      prefixes[translationNode.node_locale] + translationNode.slug
    reporter.info(`Creating page: ${path} -> ${translation}`)

    createPage({
      path,
      component: require.resolve("./src/templates/project.js"),
      context: { id, contentful_id, locale: node_locale, translation },
    })

    createPageDependency({ path, nodeId: id })
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

// Create BLOG pages
async function createBlogPostPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  
  const result = await graphql(`
    {
      posts: allContentfulBlogPost {
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

  const postsEdges = (result.data.posts || {}).edges || []

  // Generate Blog index pages
  const BlogIndexPages = [
    { locale: "en", path: "/en/blog/", pageTitle: "Our Blog" },
    { locale: "es", path: "/es/blog/", pageTitle: "Nuestro Blog" },
  ]
  BlogIndexPages.forEach(({ path, locale, pageTitle }) => {
    const translation = BlogIndexPages.find(p => p.locale !== locale).path
    reporter.info(`Creating page: ${path} -> ${translation}`)
    createPage({
      path,
      component: require.resolve("./src/templates/blog.js"),
      context: {
        id: `blog-${locale}`,
        locale: locale,
        pageTitle,
        translation,
      },
    })
  })

  postsEdges.forEach(edge => {
    const { id, contentful_id, node_locale, slug } = edge.node
    const prefixes = {
      en: "/en/blog/",
      es: "/es/blog/",
    }
    const path = `${prefixes[node_locale]}${slug}/`
    const translationNode = postsEdges.find(
      p =>
        p.node.contentful_id === contentful_id &&
        p.node.node_locale !== node_locale
    ).node
    const translation =
      prefixes[translationNode.node_locale] + translationNode.slug
    reporter.info(`Creating page: ${path} -> ${translation}`)

    createPage({
      path,
      component: require.resolve("./src/templates/post.js"),
      context: { id, contentful_id, locale: node_locale, translation },
    })

    createPageDependency({ path, nodeId: id })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createHomePages(actions, reporter)
  await createSimplePages(graphql, actions, reporter)
  await createContactPages(actions, reporter)
  await createEnvironmentPages(actions, reporter)
  await createProductPages(graphql, actions, reporter)
  await createProjectPages(graphql, actions, reporter)
  await createBlogPostPages(graphql, actions, reporter)
  await createBrandPages(graphql, actions, reporter)
}
