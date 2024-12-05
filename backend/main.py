from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import DATABASE_URL
from datetime import datetime
import psycopg2
import uvicorn

app = FastAPI()
now = datetime.now()
current_year = now.year
current_month = now.month
connection = psycopg2.connect("host=localhost dbname=postgres user=postgres password=postgres")



origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/a")
def Hello():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM collection_schedule")
    query_results = cursor.fetchall()
    return query_results

@app.get("/schedules")
def getSchedules():
    query = """
        SELECT c.collection_date, w.waste_type_name, w.icon_url 
          FROM collection_schedule c 
          JOIN waste_types w 
            ON c.waste_type_id = w.waste_type_id
         WHERE EXTRACT(MONTH FROM collection_date) = %s 
           AND EXTRACT(YEAR FROM collection_date) = %s;
    """
    cursor = connection.cursor()
    cursor.execute(query,(current_month, current_year))
    query_results = cursor.fetchall()
    return query_results

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # 環境変数 PORT を取得、デフォルトは 8000
    uvicorn.run(app, host="0.0.0.0", port=port)