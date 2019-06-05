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

  productEdges.forEach(edge => {
    const { id, contentful_id, node_locale, slug } = edge.node
    const prefixes = {
      en: "/en/products/",
      es: "/es/productos/"
    }
    const path = `${prefixes[node_locale]}${slug}`
    const translationNode = productEdges.find(
        p => p.node.contentful_id === contentful_id && p.node.node_locale !== node_locale
      ).node
    const translation = prefixes[translationNode.node_locale] + translationNode.slug
    reporter.info(`Creating page: ${path} -> ${translation}`)

    createPage({
      path,
      component: require.resolve("./src/templates/product.js"),
      context: { id, contentful_id, locale: node_locale, translation },
    })

    createPageDependency({ path, nodeId: id })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createProductPages(graphql, actions, reporter)
}
