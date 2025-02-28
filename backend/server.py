from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可（開発環境では * で良いが、本番環境では注意）
    allow_credentials=True,
    allow_methods=["*"],  # すべてのメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

messages = []

class Message(BaseModel):
    text: str
    timestamp: str

@app.get("/messages", response_model=List[Message])

def get_messages():
    return messages
    
@app.post("/messages")
def send_message(message: Message):
    messages.append(message)
    return {"status": "Messagereceived"}