
export const FilterBar = ({setSearchBar}) => {

    return <div className="filter-bar">
            <input onChange={(event) => {setSearchBar(event.target.value)}} type="text" className="ticket-search" placeholder="Search Tickets"/>
        </div>
    }