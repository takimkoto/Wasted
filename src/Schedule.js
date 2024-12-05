import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduleComponent = () => {
    const [schedules, setSchedules] = useState([]);
    const month = 10; // 例えば、10月を指定

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(`/api/schedule`, {
                    params: { month }
                });
                setSchedules(response.data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
    }, [month]);

    return (
        <div>
            <h1>Schedules for Month: {month}</h1>
            <ul>
                {schedules.map((schedule, index) => (
                    <li key={index}>
                        {schedule.collection_date} - {schedule.waste_type_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScheduleComponent;
