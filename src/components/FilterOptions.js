import React, { useEffect, useState } from 'react';

import '../css/FilterOptions.css';


const FilterOptions = (props) => {

    const handleFilterChange = (value, filter) => {

        console.log(value);
        props.setFilters((filters) => ({
            ...filters,
            [filter]: value || "All"
          }));
    }

    return (  
        <div className="filter-container">
            <label htmlFor="merchantFilter">Filter by Merchant:</label>
            <input 
                type="text"
                id="merchantFilter" 
                value={props.author} 
                onChange={(e) => handleFilterChange(e.target.value, "merchant")}
                placeholder="i.e. AWS"
            />
            
            {/* Having these as dropdowns so we only filter what's actually available  */}
            <label htmlFor="categoryFilter">Filter by Category:</label>
            <select
              id="categoryFilter "
              className="filter-select"
              onChange={(e) => handleFilterChange(e.target.value,"category")} >
              <option value="">All</option>
              {props.categories.map((category, index) =>(
                <option key={index} value={category}>{category}</option>
              ))}

            </select>

            <label htmlFor="descriptionFilter">Filter by Description:</label>
            <input 
                type="text"
                id="descriptionFilter" 
                value={props.author} 
                onChange={(e) => handleFilterChange(e.target.value, "description")}
                placeholder="i.e. hobby project"
            />

            <label htmlFor="statusFilter">Status :</label>
            <select
              id="statusFilter"
              className="filter-select"
              onChange={(e) => handleFilterChange(e.target.value,"status")} >
              <option value="">All</option>
              {props.statuses.map((status, index) =>(
                <option key={index} value={status}>{status}</option>
              ))}

            </select>
        </div>
    )
}

export default FilterOptions;