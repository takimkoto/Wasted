import React from 'react';
import axios from "axios";
import './styles.css';
import UpcomingCollection from './components/UpcomingCollection';
import Calendar from './components/Calendar';

function App() {
    const [data, setData] = React.useState();
    const url = "http://localhost:8000/";

    const GetData = () => {
        axios.get(url).then((res) => {
            setData(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    console.log(data)
    return (
        <div className="App">
            {data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}
            <header>
                <h1>ごみ収集予定アプリ</h1>
            </header>

            <main>
                <UpcomingCollection />
                <Calendar />
            </main>

            <footer>
                <p>© 2024 ごみ収集予定アプリ</p>
            </footer>
        </div>
    );
}

export default App;
