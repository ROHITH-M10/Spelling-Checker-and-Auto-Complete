

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
    with open(file, 'r') as file:
        for line in file:
            word = line.strip()
            trie.insert(word.lower())
    return trie

def check_spelling(word,trie):
    if trie.search(word):
        return True
    else:
        return False

def hash(word):
    prime = 31
    mod = 10**9
    hash_value = 0

    for char in word:
        hash_value = ((hash_value * prime )+ ord(char)) % mod
    return hash_value

def dfs(current_node,prefix,suggestions):
    global count
    if count == 0:
        return suggestions
    if current_node.is_end_of_word:
        suggestions.append(prefix)
        count -= 1
    for char in current_node.node:
        dfs(current_node.node[char],prefix+char,suggestions)
    return suggestions


def get_suggestions(word,trie):
    hash_value = hash(word)
    if hash_value not in trie.suggestions_table:
        # print('Calculating suggestions')
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
        suggestions = dfs(current_node,current_prefix,[])
        trie.suggestions_table[hash_value] = suggestions

    return trie.suggestions_table[hash(word)]


        
file = 'D:/ROHITH/PROJECT/SpellingChecker/backend/words.txt'
trie = build_dictionary_trie(file)
