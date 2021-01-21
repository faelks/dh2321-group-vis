from enum import Enum
import numpy as np

class PLAN(Enum):
    ENTREPRENEUR = 0
    DEVELOPER = 1
    ACADEMIA = 2
    PM = 3
    CONSULTANT = 4
    OTHERS = 5

PLAN_CORPUS = {
    PLAN.ENTREPRENEUR: [
        "entrepreneur",
        "startup",
    ],
    PLAN.DEVELOPER: [
        "developer",
        "engineer",
        "industry"
    ],
    PLAN.ACADEMIA: [
        "phd",
        "academ",
        "scientist",
        "research",
    ],
    PLAN.PM: [
        "product manager",
    ],
    PLAN.CONSULTANT: [
        "consultant"
    ],
    PLAN.OTHERS: [
        
    ],
}

def get_plan_category(original_text):
    PLAN_arr = np.zeros((1, len(PLAN)))
    lower = original_text.lower()
    for plan in PLAN:
        if(any(word in lower for word in PLAN_CORPUS[plan])):
            PLAN_arr[0, plan.value] = 1
    if np.sum(PLAN_arr) == 0:
        PLAN_arr[0, PLAN.OTHERS.value]  = 1
    return PLAN_arr
