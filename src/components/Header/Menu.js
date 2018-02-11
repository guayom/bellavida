import React from 'react'
import Link from 'gatsby-link'

const Test = () => (
  <div>Hello</div>
)

const SubMenu = (props) => (
  <div>
    <h3>{props.title}</h3>
    <ItemsList items={props.pages} />
  </div>
)

const ListItem = (props) => (
  <li key={props.item.id}>
    {props.item.title}
    {props.item.children ? props.item.children.map(c => <SubMenu key={c.title} pages={c.items} title={c.title} />) : null}
  </li>
)

function ItemsList(props) {
  const items = props.items;
  return (
    <ul>
      {items.map(function(item){
        return (<ListItem item={item} key={item.id} />)
      })}
    </ul>
  );
}

class Menu extends React.Component {
  render(){
    const locale = this.props.locale
    const products = this.props.products.edges.map(p => p.node)
    const brands = this.props.brands.edges.map(p => p.node)
    const MenuItems = [
      {
        en: {
          title: "Home",
          slug: "",
          id: "home",
        },
        es: {
          title: "Inicio",
          slug: "",
          id: "inicio",
        }
      },
      {
        en: {
          title: "Products",
          slug: "products",
          id: "products",
          children: [
            {title: "Brands", items: brands, id: "brands"},
            {title: "Products", items: products, id: "products"},
          ],
        },
        es: {
          title: "Productos",
          slug: "productos",
          id: "productos",
          children: [
            {title: "Marcas", items: brands, id: "marcas"},
            {title: "Productos", items: products, id: "productos"},
          ],
        }
      },
      {
        en: {
          title: "Company",
          slug: "company",
          id: "company",
        },
        es: {
          title: "Nosotros",
          slug: "acerca-de-nosotros",
          id: "acerca-de-nosotros",
        }
      },
      {
        en: {
          title: "Service center",
          slug: "service-center",
          id: "service-center",
        },
        es: {
          title: "Centro de servicio",
          slug: "centro-de-servicio",
          id: "centro-de-servicio",
        }
      },
      {
        en: {
          title: "Environment",
          slug: "environment",
          id: "environment",
        },
        es: {
          title: "Medio ambiente",
          slug: "medio-ambiente",
          id: "medio-ambiente",
        }
      },
      {
        en: {
          title: "Projects",
          slug: "projects",
          id: "projects",
        },
        es: {
          title: "Proyectos",
          slug: "proyectos",
          id: "proyectos",
        }
      },
      {
        en: {
          title: "Contact us",
          slug: "contact-us",
          id: "contact-us",
        },
        es: {
          title: "Contáctenos",
          slug: "contactenos",
          id: "contactenos",
        }
      },
    ]
    const pages = MenuItems.map(p => p[locale])

    return (
      <div>
        <ItemsList items={pages} />
      </div>
    )
  }
}

export default Menu
