import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getExpenses } from '../apirequests/TipaltiRequests';
import { removeDuplicatesFromArray, transformTimestamp } from '../utils'
import FilterOptions from './FilterOptions';

const DataTable = () => {

    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const [filters, setFilters] = useState({
        merchant: "All",
        category: "All",
        status: "All",
        description: "All"
      });

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getExpenses();
            setExpenses(fetchedData);
            setFilteredExpenses(fetchedData);
        }
        fetchData();
    },[])

    useEffect(() => {
        // Probably a way we can do this a little more generically.
        let filteredExpenses = expenses;

        if (filters.merchant !== 'All') {
            filteredExpenses = filteredExpenses.filter(expense => expense
                .merchant
                .toLocaleLowerCase()
                .includes(filters.merchant.toLocaleLowerCase()));
        }
        if (filters.description !== 'All') {
            filteredExpenses = filteredExpenses.filter(expense => expense
                .description
                .toLocaleLowerCase()
                .includes(filters.description.toLocaleLowerCase()));
        } 
        if (filters.category !== 'All') {
            filteredExpenses = filteredExpenses.filter(expense => expense.category === filters.category);
        }
        if (filters.status !== 'All') {
            filteredExpenses = filteredExpenses.filter(expense => expense.status === filters.status);
        }


        setFilteredExpenses(filteredExpenses);
    }, [filters]);

    return (
        <div className="data-table-wrapper">
                <FilterOptions 
                    filters={filters}
                    setFilters={setFilters}
                    // Removing duplicates or we'll end up with "draft draft draft"
                    statuses={removeDuplicatesFromArray(expenses.map((expense) => expense.status))}
                    categories={removeDuplicatesFromArray(expenses.map((expense) => expense.category))}
                />
            <div className="table-container">
                <Table className="custom-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Merchant</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{transformTimestamp(expense.date)}</td>
                                <td>{expense.merchant}</td>
                                <td>£{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.description}</td>
                                <td>{expense.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default DataTable;
