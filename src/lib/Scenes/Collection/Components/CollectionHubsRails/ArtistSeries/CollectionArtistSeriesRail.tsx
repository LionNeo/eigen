import { Flex, Sans } from "@artsy/palette"
import { CollectionArtistSeriesRail_collectionGroup } from "__generated__/CollectionArtistSeriesRail_collectionGroup.graphql"
import { GenericArtistSeriesRail } from "lib/Components/GenericArtistSeriesRail"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
// @ts-ignore
import styled from "styled-components/native"

interface CollectionArtistSeriesRailProps {
  collectionGroup: CollectionArtistSeriesRail_collectionGroup
}

export const CollectionArtistSeriesRail: React.SFC<CollectionArtistSeriesRailProps> = props => {
  const { collectionGroup } = props
  const collections = collectionGroup?.members ?? []

  return (
    <Flex ml={"-20px"}>
      <Sans size="4" mb={2} ml={4}>
        {collectionGroup.name}
      </Sans>
      <GenericArtistSeriesRail collections={collections} />
    </Flex>
  )
}

export const CollectionArtistSeriesRailContainer = createFragmentContainer(CollectionArtistSeriesRail, {
  collectionGroup: graphql`
    fragment CollectionArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
      name
      members {
        slug
        title
        priceGuidance
        artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
          edges {
            node {
              title
              image {
                url
              }
            }
          }
        }
        defaultHeader: artworksConnection(sort: "-decayed_merch", first: 1) {
          edges {
            node {
              image {
                url
              }
            }
          }
        }
      }
    }
  `,
})
