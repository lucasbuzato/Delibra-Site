import uuid
from datetime import datetime
from core.reflection_engine import ReflectionEngine


class ConversationManager:
    def __init__(self):
        self.conversations = {}
        self.engine = ReflectionEngine()

    def create_conversation(self):
        conversation_id = str(uuid.uuid4())
        self.conversations[conversation_id] = {
            "id": conversation_id,
            "title": "Nova conversa",
            "messages": [],
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
        return conversation_id

    def process(self, conversation_id: str, message: str):
        conversation = self.conversations[conversation_id]

        # 🔹 adiciona mensagem do usuário
        conversation["messages"].append({
            "role": "user",
            "content": message
        })

        # 🔹 se for a primeira mensagem, usa como título
        if conversation["title"] == "Nova conversa":
            max_length = 20
            conversation["title"] = (
                message[:max_length] + "..."
                if len(message) > max_length
                else message
            )

        # 🔹 normaliza mensagens para a IA
        messages_for_ai = []
        for msg in conversation["messages"]:
            role = msg["role"]
            if role == "assistant":
                role = "assistant"
            elif role == "user":
                role = "user"

            messages_for_ai.append({
                "role": role,
                "content": msg["content"]
            })

        # 🔹 chama a IA
        response = self.engine.generate(messages_for_ai)

        # 🔹 salva resposta da IA
        conversation["messages"].append({
            "role": "assistant",
            "content": response
        })

        conversation["updated_at"] = datetime.now()

        return response

    def list_conversations(self):
        return sorted(
            [
                {
                    "id": cid,
                    "title": c["title"],
                    "updated_at": c["updated_at"]
                }
                for cid, c in self.conversations.items()
            ],
            key=lambda x: x["updated_at"],
            reverse=True
        )

    def get_conversation(self, conversation_id: str):
        conversation = self.conversations.get(conversation_id)
        if not conversation:
            return None

        return {
            "id": conversation["id"],
            "title": conversation["title"],
            "messages": conversation["messages"],
            "created_at": conversation["created_at"],
            "updated_at": conversation["updated_at"]
        }

    def delete_conversation(self, conversation_id: str):
        if conversation_id in self.conversations:
            del self.conversations[conversation_id]
