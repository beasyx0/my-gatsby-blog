import React from 'react'


const Dump = (props) => {
  return (
    <div
      style={{
        fontSize: 20,
        border: '1px solid #efefef',
        padding: 10,
        background: 'white',
      }}
    >
      {Object.entries(props).map(([key, val]) => (
        <pre key={key}>
          <strong style={{ color: 'white', background: 'red' }}>
            {key} 💩
          </strong>
          <span className={'text-dark'}>{JSON.stringify(val, '', ' ')}</span>
        </pre>
      ))}
    </div>
  )
}

export default Dump
