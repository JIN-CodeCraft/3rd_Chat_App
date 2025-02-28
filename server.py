from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

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