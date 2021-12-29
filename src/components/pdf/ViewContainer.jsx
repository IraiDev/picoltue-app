import { Text, View } from '@react-pdf/renderer'
import React from 'react'

const ViewContainer = ({
  col1,
  col2,
  col3,
  align = { c1: 'center', c2: 'center', c3: 'center' },
  width = { w1: '30%', w2: '40%', w3: '30%' },
  bg = '',
}) => {
  const { c1, c2, c3 } = align
  const { w1, w2, w3 } = width
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid black',
        width: '100%',
        fontSize: '14px',
        backgroundColor: bg,
      }}
    >
      <Text
        style={{
          width: w1,
          textAlign: c1,
          padding: '2px'
        }}
      >
        {col1}
      </Text>
      <Text
        style={{
          borderLeft: '1px solid black',
          borderRight: '1px solid black',
          width: w2,
          textAlign: c2,
          padding: '2px'
        }}
      >
        {col2}
      </Text>
      <Text
        style={{
          width: w3,
          textAlign: c3,
          padding: '2px'
        }}
      >
        {col3}
      </Text>
    </View>
  )
}

export default ViewContainer
