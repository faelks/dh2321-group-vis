from enum import Enum
import numpy as np

#Quantify the fixed options
def get_facebook_usage_number(original_text):
    facebook_usage = None

    #mapping options to numbers
    usage = {
        "Yes - several times a day.": 0, 
        "Yes, but only a few times a week.": 1, 
        "Yes, but the last time I checked was two weeks ago.": 2,
        "Not really, only check it very sporadically (roughly once a month/every two months) these days": 2,
        "Yes, but not so much for courses ": 2,
        "No, but I wouldn't mind using it.": 3,
        "yes but i would rather not use it :(": 4,
        "No and I will never use it.": 4,

        }
    facebook_usage = usage.get(original_text)

    return facebook_usage


