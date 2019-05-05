import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateLink from './CreateLink';
import LinkList from './LinkList';

class Header extends Component {
    render() {
        return (
            <Router>
                <div className='flex pa1 justify-between nowrap orange'>
                    <div className='flex flex-fixed black'>
                        <div className='fw7 mr1'>Hacker News</div>
                        <Link to='/' className='ml1 no-underline black'>new</Link>
                        <div className='ml1'>|</div>
                        <Link to='/create' className='ml1 no-underline black'>submit</Link>
                    </div>
                </div>

                <Route path='/' exact component={LinkList} />
                <Route path='/create' component={CreateLink} />
            </Router>
        )
    }
}

export default Header;
