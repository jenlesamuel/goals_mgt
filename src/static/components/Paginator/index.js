import React from 'react'
import {v4} from 'node-uuid'
import { connect } from 'react-redux'
import { PAGINATION_PREVIOUS_TEXT, PAGINATION_NEXT_TEXT } from '../../config'

class Paginator extends React.Component{

    constructor(props){
        super(props)

        this.getNumPages = this.getNumPages.bind(this)
        this.getPageLinks = this.getPageLinks.bind(this)
    }


    static propTypes = {
        count: React.PropTypes.number.isRequired,
        next: React.PropTypes.string,
        previous: React.PropTypes.string,
        itemsPerPage: React.PropTypes.number.isRequired,
        container: React.PropTypes.instanceOf(React.Component)
        //dispatch: React.PropTypes.func.isRequired
    }

    getNumPages = (count, itemsPerPage) => {
        let numPages = Math.floor(count/itemsPerPage)
        numPages = count%itemsPerPage === 0 ? numPages : numPages + 1
        return numPages
    }

    getPageLinks = (numPages) => {
        const {previous, next, container} = this.props
        let pageLinks = []

        if (previous !== null) { pageLinks.push(<li key={v4()} className="pagination-previous"><a href="#" onClick={container.handlePageClick}>{PAGINATION_PREVIOUS_TEXT}</a></li>)}

        for (let i=0; i<numPages; i++) {
            pageLinks.push(<li key={v4()}><a href="#" onClick={container.handlePageClick}>{i+1}</a></li>)
        }

        if (next !== null) { pageLinks.push(<li key={v4()} className="pagination-next"><a href="#" onClick={container.handlePageClick}>{PAGINATION_NEXT_TEXT}</a></li>)}

        return (
            <ul className="pagination">{pageLinks}</ul>
        )
    }


    render(){
        const {count, itemsPerPage} = this.props
        let numPages = this.getNumPages(count, itemsPerPage)

        return (
            <div>
                { this.getPageLinks(numPages) }
            </div>
        )
    }
}

export default Paginator