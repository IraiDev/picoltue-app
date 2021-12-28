import { Text, View } from '@react-pdf/renderer'
import React from 'react'

const ViewContainer = ({ col1, col2, col3, align }) => {
  const { c1 = 'center', c2 = 'center', c3 = 'center' } = align
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid black',
        width: '100%',
        fontSize: '14px'
      }}
    >
      <Text
        style={{
          width: '40%',
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
          width: '30%',
          textAlign: c2,
          padding: '2px'
        }}
      >
        {col2}
      </Text>
      <Text
        style={{
          width: '30%',
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
