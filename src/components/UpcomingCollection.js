import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingCollection = () => {
    const [collectionData, setCollectionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/schedules`);
                setCollectionData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCalendarData();
    }, []);

    if (loading) {
        return <p>データを読み込んでいます。</p>;
    }

    if (error) {
        return <p>エラー： {error}</p>;
    }

    const today = new Date();
    const tomorrow = new Date(today);
    const dayAfterTomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    // 日付を YYYY-MM-DD 形式に変換
    const formatDate = (date) => date.toISOString().slice(0, 10);
    const tomorrowDate = formatDate(tomorrow);
    const dayAfterTomorrowDate = formatDate(dayAfterTomorrow);

    const filterData = collectionData.filter(item => {
        return item[0] === tomorrowDate || item[0] === dayAfterTomorrowDate;
    });

    return (
        <section id="upcoming-collection">
            <h2>翌日・翌々日の収集予定</h2>
            
            <div className="collection-container">
                {filterData.length > 0 ? filterData.map((item) => (
                    <div className="collection-item" key={item[0]}>
                        <p>{item[1]}</p>
                    </div>  
                )) : (
                    <p>翌日、翌々日の収集予定はありません。</p>
                )}      
            </div>
        </section>
    );
};

export default UpcomingCollection;
