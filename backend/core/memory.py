import json
import os
from datetime import datetime

class ConversationMemory:
    def __init__(self, file_path="memory.json"):
        self.file_path = file_path
        self.messages = []
        self._load()

    def _load(self):
        if os.path.exists(self.file_path):
            with open(self.file_path, "r", encoding="utf-8") as f:
                self.messages = json.load(f)
        else:
            self.messages = []

    def _save(self):
        with open(self.file_path, "w", encoding="utf-8") as f:
            json.dump(self.messages, f, ensure_ascii=False, indent=2)

    def add_user(self, text):
        self.messages.append({
            "role": "user",
            "content": text,
            "timestamp": datetime.now().isoformat()
        })
        self._save()

    def add_ai(self, text):
        self.messages.append({
            "role": "assistant",
            "content": text,
            "timestamp": datetime.now().isoformat()
        })
        self._save()

    def get_messages(self):
        return self.messages

    def delete_message(self, index):
        if 0 <= index < len(self.messages):
            self.messages.pop(index)
            self._save()

    def rename_message(self, index, new_title):
        if 0 <= index < len(self.messages):
            self.messages[index]["content"] = new_title
            self._save()
