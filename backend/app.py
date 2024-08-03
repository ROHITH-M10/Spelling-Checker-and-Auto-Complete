from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

class TrieNode:
    def __init__(self):
        self.node = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
        self.suggestions_table = {}

    def insert(self, word):
        current_node = self.root
        for char in word:
            if char not in current_node.node:
                current_node.node[char] = TrieNode()
            current_node = current_node.node[char]
        current_node.is_end_of_word = True
    
    def search(self, word):
        current_node = self.root
        for char in word:
            if char not in current_node.node:
                return False
            current_node = current_node.node[char]
        return current_node.is_end_of_word
    
def build_dictionary_trie(file):
    trie = Trie()
    with open(file, 'r') as f:
        for line in f:
            word = line.strip()
            trie.insert(word.lower())
    return trie

def check_spelling(word, trie):
    return trie.search(word)

def hash(word):
    prime = 31
    mod = 10**9
    hash_value = 0
    for char in word:
        hash_value = ((hash_value * prime) + ord(char)) % mod
    return hash_value

def dfs(current_node, prefix, suggestions):
    global count
    if count == 0:
        return suggestions
    if current_node.is_end_of_word:
        suggestions.append(prefix)
        count -= 1
    for char in current_node.node:
        dfs(current_node.node[char], prefix + char, suggestions)
    return suggestions

def get_suggestions(word, trie):
    hash_value = hash(word)
    if hash_value not in trie.suggestions_table:
        current_prefix = ""
        current_node = trie.root
        for char in word:
            if char in current_node.node:
                current_prefix += char
                current_node = current_node.node[char]
            else:
                break
        global count
        count = 5
        suggestions = dfs(current_node, current_prefix, [])
        trie.suggestions_table[hash_value] = suggestions
    return trie.suggestions_table[hash(word)]

file = 'D:/ROHITH/PROJECT/SpellingChecker/backend/words.txt'
trie = build_dictionary_trie(file)

app = Flask(__name__) 
CORS(app)

# Ensure database connection is handled properly
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

with get_db_connection() as conn:
    conn.execute(
        'CREATE TABLE IF NOT EXISTS words '
        '(hash INTEGER PRIMARY KEY,'
        'word TEXT NOT NULL,'
        'count INTEGER NOT NULL DEFAULT 0)'
    )

@app.route('/', methods=["GET"])
def home():
    return "Spelling Checker API"

@app.route('/check', methods=["POST", "GET"])  
def check_spelling_api():
    try:
        data = request.get_json()
        word = data['word']
        isCorrect = check_spelling(word, trie)   
        if isCorrect:
            return jsonify({'isCorrect': isCorrect, 'suggestions': []})
        else:
            suggestions = get_suggestions(word, trie)
            hash_value = hash(word)
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM words WHERE word = ?", (word,))
                result = cursor.fetchall()
                if len(result) == 0:
                    cursor.execute("INSERT INTO words (hash, word, count) VALUES (?, ?, ?)", (hash_value, word, 1))
                else:
                    cursor.execute("UPDATE words SET count = count + 1 WHERE word = ?", (word,))
                conn.commit()
            return jsonify({'isCorrect': isCorrect, 'suggestions': suggestions})
    except Exception as e:
        return jsonify({'isCorrect': False, 'suggestions': [str(e)]})

@app.route('/history', methods=["GET"])
def get_history():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM words ORDER BY count DESC")
        words = cursor.fetchall()
    print(words)
    return jsonify([dict(row) for row in words])

if __name__ == '__main__': 
    app.run(debug=True, port=5000)
