import React from 'react';
import TicketList from '../TicketList/TicketList';

const App = () => {
    const userType = new URLSearchParams(window.location.search).get('userType');

    return (
        <div>
            <h1>Event Tickets</h1>
            <TicketList userType={userType} />
        </div>
    );
};

export default App;