import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types';
import FlagIconFactory from 'react-flag-icon-css';

const FlagIcon = FlagIconFactory(React, { useCssModules: false }) 

function getCode(locale){
  return locale === "en" ? "cr" : "us"
}

const LanguageSwitcher = (props) => (
  <div style={{ display: `inline-block` }}>
    <Link 
      to={props.translation}
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
      <FlagIcon code={getCode(props.locale)} />
    </Link>
  </div>
)

export default LanguageSwitcher

LanguageSwitcher.propTypes = {
  translation: PropTypes.string.isRequired
};
