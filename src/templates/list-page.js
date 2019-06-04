import React from "react";
import Helmet from "react-helmet";
import Wrapper from "../components/Layout/Wrapper";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import ItemImage from "../components/General/ItemImage";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;

  ${breakpoint("tablet")`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

class AllProductsPageTemplate extends React.Component {
  render() {
    const items = this.props.pageContext.items;
    const path = this.props.location.pathname;
    const title = this.props.pageContext.pageTitle;

    return (
      <Layout>
        <Helmet title={title} />
        <Wrapper>
          <h1>{title}</h1>
          <Grid>
            {items.map(page => (
              <ItemImage
                key={page.id}
                title={page.title}
                slug={page.slug}
                image={page.image}
                path={path}
              />
            ))}
          </Grid>
        </Wrapper>
      </Layout>
    );
  }
}

export default AllProductsPageTemplate;
