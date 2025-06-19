import React, { useState } from 'react'

const Verify = () => {
    const [params, setParams] = useState(new URLSearchParams(window.location.search));
    console.log(params)
  return (
    <div>Verify</div>
  )
}

export default Verify
