import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types';
import FlagIconFactory from 'react-flag-icon-css';

const FlagIcon = FlagIconFactory(React, { useCssModules: false }) 

function getCode(locale){
  return locale === "en" ? "cr" : "us"
}

const LanguageSwitcher = ({locale, translation}) => (
  <div style={{ display: `inline-block` }}>
    <Link 
      to={translation}
      style={{
        background: `#777`,
        borderRadius: `2px`,
        display: `inline-block`,
        height: `20px`,
        lineHeight: `20px`,
        padding: `0 4px`,
        marginRight: `10px`
      }}
    >
      <FlagIcon code={getCode(locale)} />
    </Link>
  </div>
)

export default LanguageSwitcher

LanguageSwitcher.propTypes = {
  translation: PropTypes.string.isRequired
};
