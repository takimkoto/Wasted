import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calendar = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const selectYear = new Date().getFullYear(); // 状態にする必要がない場合
    const selectMonth = new Date().getMonth() + 1; // 状態にする必要がない場合

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/schedules`);
                setCalendarData(response.data);
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
        return <p>エラー: {error}</p>;
    }

    const renderCalendar = () => {
        const year = selectYear; // 選択された年
        const month = selectMonth; // 選択された月
        const daysInMonth = new Date(year, month, 0).getDate(); // 月の日数を取得
        const firstDay = new Date(year, month - 1, 1).getDay(); // 月の最初の日の曜日を取得

        const calendarRows = [];
        let dayCounter = 1;

        for (let i = 0; i < daysInMonth; i += 7) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    week.push(<td key={`empty-${j}`}></td>);
                } else if (dayCounter > daysInMonth) {
                    week.push(<td key={`empty-${dayCounter}`}></td>);
                } else {
                    const date = `${year}-${month < 10 ? '0' + month : month}-${dayCounter < 10 ? '0' + dayCounter : dayCounter}`;
                    const calendarItem = calendarData.find(item => item[0] === date);

                    week.push(
                        <td key={dayCounter}>
                            <div>{dayCounter}</div>
                            {calendarItem ? (
                                <div>
                                    <p>{calendarItem[1]}</p> {/* ゴミの種類 */}
                                    <img src={calendarItem[2]} alt={calendarItem[1]} /> {/* 画像 */}
                                </div>
                            ) : (
                                <p>なし</p>
                            )}
                        </td>
                    );
                    dayCounter++;
                }
            }
            calendarRows.push(<tr key={`week-${i}`}>{week}</tr>);
        }
        return calendarRows;
    };

    return (
        <section id="calendar">
            <h2>カレンダー</h2>
            <table>
                <thead>
                    <tr>
                        <th>日</th>
                        <th>月</th>
                        <th>火</th>
                        <th>水</th>
                        <th>木</th>
                        <th>金</th>
                        <th>土</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCalendar()}
                </tbody>
            </table>
        </section>
    );
};

export default Calendar;
