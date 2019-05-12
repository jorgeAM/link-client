import React, { Component } from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Link from './Link';

const FEED_QUERY = gql`
{
    feed {
        id
        url
        description
        createdAt
        postedBy{
            name
        }
        votes{
            id
            user{
                id
            }
        }
    }
}
`

class LinkList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
            {({ loading, error, data}) => {
                if (loading) return <p>Loading ...</p>
                if (error) return <p>Something get wrong :c</p>
                return data.feed.map((link, index) => <Link key={link.id} link={link} index={index} />)
            }}
            </Query>
        )
    }
}

export default LinkList;
