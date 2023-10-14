import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet


def is_meaningful_word(word):
    # print(wordnet.synsets(word))
    return len(wordnet.synsets(word)) > 0


def is_meaningful_sentence(sentence):
    words = word_tokenize(sentence)

    meaningful_word_count = sum(
        1 for word in words if is_meaningful_word(word))
    # print(len(words))
    return meaningful_word_count / len(words) >= 0.5
