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
                return data.feed.map(link => <Link key={link.id} link={link} />)
            }}
            </Query>
        )
    }
}

export default LinkList;
