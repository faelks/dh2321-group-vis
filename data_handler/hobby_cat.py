from enum import Enum
import numpy as np

class HOBBIES(Enum):
    ART = 0
    GAME = 1
    SPORTS = 2
    MUSIC = 3
    READING = 4
    COOKING = 5
    OTHERS = 6

HOBBY_CORPUS = {
    HOBBIES.ART: [
        "art",
        "paint",
        "draw",
    ],
    HOBBIES.GAME: [
        "game",
        "chess",
        "gaming",
    ],
    HOBBIES.SPORTS: [
        "sport",
        "climb",
        "basketball",
        "handball",
        "football",
        "hiking",
        "outside",
        "triathlon",
        "running",
        "tennis",
        "run",
    ],
    HOBBIES.MUSIC: [
        "music",
        "instrument",
    ],
    HOBBIES.READING: [
        "read",
    ],
    HOBBIES.COOKING: [
        "cook"
    ],
    HOBBIES.OTHERS: [
        "craft",
        "programming",
        "politics",
        "photography",
        "technology",
        "culture",
        "crocheting",
    ]
}

def get_hobby_category(original_text):
    hobby_arr = np.zeros((1, len(HOBBIES)))
    lower = original_text.lower()
    for hobby in HOBBIES:
        if(any(word in lower for word in HOBBY_CORPUS[hobby])):
            hobby_arr[0, hobby.value] = 1
    if np.sum(hobby_arr) == 0:
        hobby_arr[0, HOBBIES.OTHERS.value]  = 1
    return hobby_arr
