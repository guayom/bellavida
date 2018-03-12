import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types';

const LanguageSwitcher = (props) => (
  <Link to={props.translation}>Translate</Link>
)

export default LanguageSwitcher

LanguageSwitcher.propTypes = {
  translation: PropTypes.string.isRequired
};
