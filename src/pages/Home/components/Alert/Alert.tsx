import React from 'react'

interface Props {
  text: string
}

export const Alert = (props: Props) => (
  <div className="alert alert-primary" role="alert">
    {props.text}
  </div>
)
