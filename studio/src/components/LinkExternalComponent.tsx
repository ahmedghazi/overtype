import React from 'react'
import {LinkIcon} from '@sanity/icons'
import {Box, Text, Tooltip} from '@sanity/ui'
import styled from 'styled-components'

type Props = {}

const LinkExternalComponent = (props: any) => {
  console.log(props)
  const cta = props.value.cta

  return (
    <Tooltip
      //we define the content in a Box, so we can add padding, and Text where we pass the href value in if present
      content={
        <Box padding={3}>
          <Text align="center" size={1}>
            {`${props.value?.href}` || 'No url found'}
          </Text>
        </Box>
      }
      // then we define the placement and other options
      placement="bottom"
      fallbackPlacements={['right', 'left']}
      portal
    >
      {/* InlineAnnotation is a styled span element, which we use to add padding. */}
      {cta && (
        <InlineAnnotationCta>
          <>{props.renderDefault(props)}</>
        </InlineAnnotationCta>
      )}
      {!cta && <InlineAnnotation>{props.renderDefault(props)}</InlineAnnotation>}
    </Tooltip>
  )

  // return cta ? (
  //   <span
  //     style={{
  //       fontSize: '14px',
  //       borderRadius: '.438rem',
  //       cursor: 'pointer',
  //       height: '2.25rem',
  //       lineHeight: '2.35rem',
  //       padding: '0.292em 0.708em 0.25em',
  //       backgroundColor: '#0076f7',
  //       color: '#fff',
  //       paddingLeft: '2.14em',
  //       paddingRight: '2.14em',
  //     }}
  //   >
  //     {props.renderPreview(props)}
  //   </span>
  // ) : (
  //   props.renderDefault(props)
  // )
}

const InlineAnnotation = styled.span`
  padding-left: 0.3em;
  padding-right: 0.2em;
`

const InlineAnnotationCta = styled.span`
  font-size: 14px;
  border-radius: 0.438rem;
  cursor: pointer;
  height: 2.25rem;
  line-height: 2.35rem;
  padding: 0.292em 0.708em 0.25em;
  background-color: #0076f7;
  color: #fff;
  padding-left: 2.14em;
  padding-right: 2.14em;
`

export default LinkExternalComponent
