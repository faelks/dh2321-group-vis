from enum import Enum
import numpy as np

# Quantify the fixed options


def get_canvas_usage_number(original_text):
    canvas_usage = None

    # mapping options to numbers
    # 0 indicates a low usage and 2 a high usage of canvas
    usage = {"Yes - several times a day.": 2, "Yes, but only a few times a week.": 1, "No, but I wouldn't mind using it.": 0}
    canvas_usage = usage.get(original_text)

    return canvas_usage


""" class CANVAS_USAGE(Enum):
    OFTEN = 0
    SOMETIMES = 1
    NEVER = 2
    OTHERS = 3

CANVAS_USAGE_CORPUS = {
    CANVAS_USAGE.OFTEN: [
        "Yes - several times a day.",
    ],
    CANVAS_USAGE.SOMETIMES: [
        "Yes, but only a few times a week.",
    ],
    CANVAS_USAGE.NEVER: [
        "No, but I wouldn't mind using it.",
    ],
    CANVAS_USAGE.OTHERS: [
        
    ],
} """

""" def get_canvas_usage_category(original_text):
    canvas_usage_arr = np.zeros((1, len(CANVAS_USAGE)))
    #lower = original_text.lower()
    for usage in CANVAS_USAGE:
        if(any(word in original_text for word in CANVAS_USAGE_CORPUS[usage])):
            canvas_usage_arr[0, usage.value] = 1
    if np.sum(canvas_usage_arr) == 0:
        canvas_usage_arr[0, CANVAS_USAGE.OTHERS.value]  = 1
    return canvas_usage_arr """
