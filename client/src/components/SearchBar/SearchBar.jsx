import { HiLocationMarker } from "react-icons/hi";

const SearchBar=({filter,setFilter})=>{
    return(
        <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" placeholder="Search for Title/State/Country" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            <button className="button">Search</button>
        </div>
    )
}

export default SearchBar;