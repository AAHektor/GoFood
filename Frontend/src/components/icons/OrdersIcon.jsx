import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect
      width={14}
      height={17}
      x={5}
      y={4}
      stroke="#33363F"
      strokeWidth={1}
      rx={2}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M9 9h6M9 13h6M9 17h4"
    />
  </svg>
)
export default SvgComponent
