import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function userSearch() {
    return (
        <div>
            <div className="contatiner">
            <form>
            <h3 className = "heading">Search for users</h3>
            <div className="input-group mb-3">
                <input 
                id = 'searchtext'
                name = "searchtext"
                type="text" className="form-control" 
                placeholder="Search..." 
                aria-label="Username" 
                aria-describedby="basic-addon1"
                />
            <div className="input-group-prepend">
            <button type = "submit" className = "button-search">Search</button>
            </div>
            </div>
        </form>
            </div>
        </div>
    )
}

export default userSearch
