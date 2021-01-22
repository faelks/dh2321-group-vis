from enum import Enum
import numpy as np

class DEGREE(Enum):
    BS = 0
    MS = 1
    PHD = 2
    OTHERS = 3

DEGREE_CORPUS = {
    DEGREE.BS: [
        "bsc",
    ],
    DEGREE.MS: [
        "master",
    ],
    DEGREE.PHD: [
        "phd",
    ],
    DEGREE.OTHERS: [

    ],
}

def get_degree_category(original_text):
    degree_arr = np.zeros((1, len(DEGREE)))
    lower = original_text.lower()
    for degree in DEGREE:
        if(any(word in lower for word in DEGREE_CORPUS[degree])):
            degree_arr[0, degree.value] = 1
    if np.sum(degree_arr) == 0:
        degree_arr[0, DEGREE.OTHERS.value]  = 1
    return degree_arr
