import React from 'react'

export default ({description}) => (
    <div
        style={{
            marginBottom: `60px`
        }}
    >
        <h2
            style={{
                marginBottom: `20px`
            }}
        >
            Bella Vida Costa Rica
        </h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />.
    </div>
)

