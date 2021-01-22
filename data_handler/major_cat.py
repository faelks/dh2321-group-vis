from enum import Enum
import numpy as np

class MAJOR(Enum):
    CS = 0
    MEDIA = 1
    HCI = 2
    OTHERMAJOR = 3
    OTHERS = 4

MAJOR_CORPUS = {
    MAJOR.CS: [
        "computer science",
    ],
    MAJOR.MEDIA: [
        "media technology",
        "media management",
    ],
    MAJOR.HCI: [
        "human-computer interaction",
    ],
    MAJOR.OTHERMAJOR: [
        "finance",
        "transport science",
        "Not sure what to put",
    ],
    MAJOR.OTHERS: [

    ],
}

def get_major_category(original_text):
    major_arr = np.zeros((1, len(MAJOR)))
    lower = original_text.lower()
    for major in MAJOR:
        if(any(word in lower for word in MAJOR_CORPUS[major])):
            major_arr[0, major.value] = 1
    if np.sum(major_arr) == 0:
        major_arr[0, MAJOR.OTHERS.value]  = 1
    return major_arr
