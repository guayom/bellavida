import React from "react";
import * as PropTypes from "prop-types";
import Slider from "../components/Slider";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Projects from "../components/Projects";
import HomeDescription from "../components/HomeDescription";
import Location from "../components/Location";
import Helmet from "react-helmet";
import Wrapper from "../components/Layout/Wrapper";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const propTypes = {
  data: PropTypes.object.isRequired
};

const HomeGrid = styled.div`
  display: block;

  ${breakpoint("tablet")`
    display: flex;
  `}
`;

const HomeTemplate = ({data, pageContext}) => {
  const slides = data.allContentfulHomeSlide.edges;
  const testimonials = data.allContentfulTestimonial.edges;
  const homeFeatures = data.allContentfulHomeFeature.edges;
  const projects = data.allContentfulProject.edges.sort((a, b) => {
    return new Date(b.node.createdAt) - new Date(a.node.createdAt);
  });
  const description = data.allContentfulPage.edges[0].node.content
    .childMarkdownRemark.html;

  return (
    <Layout {...pageContext}>
      <Helmet title={pageContext.pageTitle} />
      <Slider slides={slides} />
      <Testimonials items={testimonials} />
      <Wrapper>
        <Features items={homeFeatures} />
        <HomeDescription description={description} />
        <HomeGrid>
          <Projects items={projects} />
          <Location items={projects} />
        </HomeGrid>
      </Wrapper>
    </Layout>
  )
}

HomeTemplate.propTypes = propTypes;

export default HomeTemplate;

export const pageQuery = graphql`
  query homeQuery($locale: String!) {
    allContentfulHomeSlide(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          node_locale
          image {
            id
            resolutions(width: 1240, height: 600) {
              base64
              aspectRatio
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
    allContentfulTestimonial(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          client
          location
          content {
            content
          }
          node_locale
        }
      }
    }
    allContentfulHomeFeature(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          buttonLink
          buttonText
          content {
            content
          }
          image {
            id
            fluid(maxWidth: 150) {
              ...GatsbyContentfulFluid
            }
          }
          node_locale
        }
      }
    }
    allContentfulProject(filter: { node_locale: { eq: $locale } }, limit: 3) {
      edges {
        node {
          id
          createdAt
          title
          slug
          node_locale
          images {
            id
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    allContentfulPage(
      filter: {
        contentful_id: { eq: "57hWtglQuseQIYGCSUmg40" }
        node_locale: { eq: $locale }
      }
    ) {
      edges {
        node {
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
