import React, { Component } from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Link from './Link';

export const FEED_QUERY = gql`
{
    feed {
        id
        url
        description
        createdAt
        postedBy {
            name
        }
        votes {
            id
            user {
                id
            }
        }
    }
}
`

const NEW_LINKS_SUBSCRIPTION = gql`
    subscription {
        newLink {
            id
            url
            description
            createdAt
            postedBy {
                id
                name
            }
            votes {
                id
                user {
                    id
                }
            }
        }
    }
`

class LinkList extends Component {
    updateStoreAfterVote = (store, createdVote, linkId) => {
        const data = store.readQuery({ query: FEED_QUERY })
        const votedLink = data.feed.find(link => link.id === linkId)
        votedLink.votes = createdVote.link.votes
        store.writeQuery({ query: FEED_QUERY, data })
    }

    subscribeToNewLinks = subscribeToMore => {
        subscribeToMore({
            document: NEW_LINKS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data)  return prev
                const newLink = subscriptionData.data.newLink
                const exists = prev.feed.find(({ id }) => id === newLink.id)
                if (exists)  return prev
                return Object.assign({}, prev, {
                    feed: [newLink, ...prev.feed]
                })
            }
        })
    }

    render() {
        return (
            <Query query={FEED_QUERY}>
            {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading ...</p>
                if (error) return <p>Something get wrong :c</p>
                this.subscribeToNewLinks(subscribeToMore)
                console.log('data: ', data)
                return data.feed.map((link, index) => (
                    <Link
                        key={link.id}
                        link={link}
                        index={index}
                        updateStoreAfterVote={this.updateStoreAfterVote}
                    />
                ))
            }}
            </Query>
        )
    }
}

export default LinkList;
