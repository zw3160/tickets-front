import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TicketList.css';

const TicketList = ({ userType }) => {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalTickets, setTotalTickets] = useState(0);
    const [filter, setFilter] = useState('');
    const ticketsPerPage = 8;

    const fetchTickets = async () => {
        if (loading) return; 
        setLoading(true);
        
        try {
            const response = await axios.get(`http://localhost:3002/tickets?userType=${userType}&page=${page}&filter=${filter}`);
            setTickets(response.data.tickets);
            setTotalTickets(response.data.total);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [page, userType, filter]);

    const totalPages = Math.ceil(totalTickets / ticketsPerPage);

    return (
        <div>
            <input
                type="text"
                placeholder="Filter by title & description..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-input"
            />
            <div>
                {tickets.length ? 
                ( <div>                {userType === 'local' ? (
                    <div className="grid-layout">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className="ticket-item">
                                <h3>{ticket.title}</h3>
                                <p>{ticket.description}</p>
                                <p>{ticket.date}</p>
                                <p>{ticket.location}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid-layout">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className="ticket-item">
                                <h3>{ticket.title}</h3>
                                <p>{ticket.description}</p>
                                <img src={ticket.img} alt={ticket.img}></img>
                            </div>
                        ))}
                    </div>
                )}
                <div className="pagination">
                    {page > 1 && (
                        <button onClick={() => setPage(prev => prev - 1)}>Previous</button>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => setPage(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                    {page < totalPages && (
                        <button onClick={() => setPage(prev => prev + 1)}>Next</button>
                    )}
                </div></div>) : 
                ( <div className="no-ticket">There are no events</div>)}
            </div>
           
        </div>
    );
};

export default TicketList;