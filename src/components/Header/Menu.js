import React from 'react'
import Link from 'gatsby-link'
import styled from "styled-components"

const MenuContainer = styled.div`
  background: lightGrey;
  z-index: 10;
  margin-left:auto;
`

const List = styled.ul`
  list-style:none;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  display: inline-block;
  position:relative;
  margin: 0;
  padding: 10px;
  padding-right: ${props => props.hasChildren ? '15px' : '0'};

  &:after{
    display: ${props => props.hasChildren ? 'block' : 'none'};
    position:absolute;
    right: 0;
    top: 50%;
    margin-top: -2px;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 5px;
    border-color: transparent transparent transparent black;
    transition: all .1s ease;
  }

  &:hover:after {
    transform: rotate(90deg);
  }

  &:hover .SubmenuContainer {
    display: flex;
  }
`

const SubmenuContainer = styled.div`
  position:absolute;
  top: 100%;
  left: 0;
  background: lightGrey;
  padding: 20px;
  display: none;
  justify-content: space-between;

  li {
    display:block;
  }
`

const SubmenuColumn = styled.div`
  margin-right: 20px;
  width: 180px;
  &:last-of-type {
    margin-right: 0;
  }
`

const SubMenuTitle = styled.h3`
  display: block;
  font-size: 14px;
  margin: 0;
`

function ItemsList(props) {
  const items = props.items;
  return (
    <List>
      {items.map(function(item){
        return (<ListItem item={item} key={item.id} linkPrefix={props.linkPrefix} locale={props.locale}/>)
      })}
    </List>
  );
}

const SubMenu = (props) => (
  <SubmenuContainer className="SubmenuContainer">
    {props.items.map(function(submenu){
      return(
        <SubmenuColumn key={submenu.id}>
          <SubMenuTitle>{submenu.title}</SubMenuTitle>
          <ItemsList items={submenu.items} linkPrefix={"/"+props.locale+"/"+submenu.id+"/"}/>
        </SubmenuColumn>
      )
    })}
  </SubmenuContainer>
)

const ListItem = (props) => (
  <Item key={props.item.id} hasChildren={props.item.children}>
    <Link to={props.linkPrefix+props.item.slug}>{props.item.title}</Link>
    {props.item.children ? <SubMenu items={props.item.children} locale={props.locale}/> : null}
  </Item>
)



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
      <MenuContainer>
        <ItemsList items={pages} locale={locale} linkPrefix={"/"+locale+"/"} />
      </MenuContainer>
    )
  }
}

export default Menu
