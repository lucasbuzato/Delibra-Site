from fastapi import APIRouter
from pydantic import BaseModel
from core.conversation_manager import ConversationManager

router = APIRouter()
manager = ConversationManager()


class ChatRequest(BaseModel):
    conversation_id: str | None = None
    message: str


class RenameRequest(BaseModel):
    title: str


@router.post("/chat")
def chat(data: ChatRequest):
    if not data.conversation_id:
        conversation_id = manager.create_conversation()
    else:
        conversation_id = data.conversation_id

    response = manager.process(conversation_id, data.message)

    return {
        "conversation_id": conversation_id,
        "response": response
    }


@router.get("/conversations")
def list_conversations():
    return manager.list_conversations()


@router.get("/conversations/{conversation_id}")
def get_conversation(conversation_id: str):
    return manager.get_conversation(conversation_id)


@router.patch("/conversations/{conversation_id}")
def rename_conversation(conversation_id: str, data: RenameRequest):
    manager.rename_conversation(conversation_id, data.title)
    return {"status": "ok"}


@router.delete("/conversations/{conversation_id}")
def delete_conversation(conversation_id: str):
    manager.delete_conversation(conversation_id)
    return {"status": "ok"}

