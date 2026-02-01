import React, { useState, useMemo } from 'react';
import './DataTable.css';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = useMemo(() => {
        return data.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="glass-panel p-6 mt-8">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-semibold">Vehicle Data Explorer</h3>
                <div className="search-container">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by VIN, Make, City..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">VIN</th>
                            <th className="text-left">Make</th>
                            <th className="text-left">Model</th>
                            <th className="text-left">Year</th>
                            <th className="text-left">City</th>
                            <th className="text-left">State</th>
                            <th className="text-right">Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((row, index) => (
                                <tr key={index}>
                                    <td className="font-medium text-accent">{row['VIN (1-10)']}</td>
                                    <td>{row['Make']}</td>
                                    <td>{row['Model']}</td>
                                    <td>{row['Model Year']}</td>
                                    <td>{row['City']}</td>
                                    <td>{row['State']}</td>
                                    <td className="text-right">
                                        <span className={`badge ${parseInt(row['Electric Range']) > 200 ? 'success' : 'warning'}`}>
                                            {row['Electric Range']} mi
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-muted">No vehicles found matching your search.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination flex justify-between items-center mt-6">
                <span className="text-sm text-muted">
                    Showing {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn-icon"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="btn-icon"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
