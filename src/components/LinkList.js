import React, { Component } from 'react';
import Link from './Link';

class LinkList extends Component {
    render() {
        return (
            <div>
                {this.props.links.map(link => <Link key={link.id} link={link} />)}
            </div>
        )
    }
}

export default LinkList;
