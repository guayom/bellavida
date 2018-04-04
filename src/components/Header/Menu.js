import React from 'react'
import Link from 'gatsby-link'
import styled from "styled-components"
import breakpoint from 'styled-components-breakpoint'

const MenuContainer = styled.div`
  z-index: 25;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: auto;
  max-height: ${props => props.expanded ? `100vh` : 0};
  transition: max-height 0.5s;
  background: #fff;
  width: 100%;
  overflow: hidden;
  padding: 0 20px;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  flex-basis: 0;

  ${breakpoint('tablet') `
    position: static;
    box-shadow: none;
    max-height: none;
    overflow: visible;
    padding: 0;
    left: auto;
    right: auto;
    top: auto;
    width: auto;
  `}
`

const List = styled.ul`
  list-style:none;
  margin: 0;
  padding: 0;
  display: block;

  ${breakpoint('tablet') `
    display: ${props => props.submenu ? 'block' : 'grid'};
    grid-auto-columns: max-content;
    grid-auto-flow: column;
    justify-content: end;
    height: 100%;
  `}
`

const Item = styled.li`
  display: block;
  border-bottom: solid 1px #eeeeee;
  padding: 10px 0;
  margin: 0;

  &:last-of-type {
    border-bottom: 0;
    margin-bottom: 10px;
    ${breakpoint('tablet') `
      margin: 0;
    `}
  }

  ${breakpoint('tablet') `
    display: block;
    position:relative;
    padding: 28px 0;
    height: ${props => props.submenu ? 'auto' : 'auto'};
    border-bottom: none;
    align-self: center;

    &:after{
      display: ${props => props.hasChildren ? 'block' : 'none'};
      position:absolute;
      right: 8px;
      top: 50%;
      margin-top: -3px;
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
  `}

  a {
    color: #333;
    text-decoration: none;
    font-weight: 700;
    line-height: 20px;
    height: 20px;
    font-size: 13px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    border-radius: 15px;
    padding: 3px 13px;
    border-color: transparent;
    border-width: 1px;
    border-style: solid;
    ${props => props.hasChildren && 'padding-right: 20px;'}
  }
`

const SubmenuContainer = styled.div`
  position:absolute;
  top: calc(100% + 1px);
  left: 0;
  background: ${props => props.theme.mainColor};
  padding: 20px 0;
  display: none;
  justify-content: space-between;

  ${breakpoint('tablet') `
    -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.17);
    -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.17);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.17);
  `}

  h3 {
    color: #fff;
    margin-bottom: 10px;
  }

  li {
    display:block;
    padding: 0;
    margin-bottom: 10px;

    a {
      color: #fff;
      background: rgba(0,0,0,0.1);
      margin: 0;
      border-radius: 4px;
      font-size: 11px;
      display:block;

      ${breakpoint('tablet')`
        padding: 5px 10px;
        height: auto;
      `}

      &:hover {
        background: rgba(0,0,0,0.3);
      }
    }
  }
`

const SubmenuColumn = styled.div`
  width: auto;
  min-width: 250px;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0 20px;
`

const SubMenuTitle = styled.h3`
  display: block;
  font-size: 14px;
  margin: 0;
`

const Triangle = styled.div`
  position:absolute;
  top: 0;
  left: 40px;
  width: 0;
  height: 0;
  border-top: 7px solid #fff;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: none;
`

function ItemsList(props) {
  const items = props.items;
  return (
    <List submenu={props.submenu}>
      {items.map(function(item){
        return (<ListItem item={item} key={item.id} linkPrefix={props.linkPrefix} locale={props.locale} submenu={props.submenu} handleClick={props.handleClick}/>)
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
          <ItemsList items={submenu.items} linkPrefix={"/" + props.locale + "/" + submenu.id + "/"} handleClick={props.handleClick} submenu/>
        </SubmenuColumn>
      )
    })}
    <Triangle />
  </SubmenuContainer>
)

const ListItem = (props) => (
  <Item
    key={props.item.id}
    hasChildren={props.item.children}
    submenu={props.submenu}
    >
    <Link
      to={props.item.title === "Home" ? "/" : props.linkPrefix+props.item.slug}
      activeStyle={{ borderColor: '#eeeeee', color: "#93c548" }}
      onClick={props.handleClick}
      >
      {props.item.title}
    </Link>
    {props.item.children ? <SubMenu items={props.item.children} locale={props.locale} handleClick={props.handleClick}/> : null}
  </Item>
)

class Menu extends React.Component {
  render(){
    const locale = this.props.locale
    const products = this.props.products.edges.map(p => p.node)
    const brands = this.props.brands.edges.map(p => p.node)
    const expanded = this.props.expanded
    const MenuItems = [
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
      <MenuContainer expanded={expanded}>
        <ItemsList items={pages} locale={locale} linkPrefix={"/" + locale + "/"} handleClick={this.props.handleClick}/>
      </MenuContainer>
    )
  }
}

export default Menu
