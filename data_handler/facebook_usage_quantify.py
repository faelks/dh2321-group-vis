from enum import Enum
import numpy as np

#Quantify the fixed options
def get_facebook_usage_number(original_text):
    facebook_usage = None

    # mapping options to numbers
    # options are ranked with numbers 0-3 where 
    # a higher number indicates more frequent usage
    usage = {
        "Yes - several times a day.": 3, 
        
        "Yes, but only a few times a week.": 2, 
        "Yes, but the last time I checked was two weeks ago.": 2,
        "Yes, but not so much for courses ": 2,
        "yes but i would rather not use it :(": 2,

        "Not really, only check it very sporadically (roughly once a month/every two months) these days": 1,
        "No, but I wouldn't mind using it.": 1,

        "No and I will never use it.": 0,
        }
    facebook_usage = usage.get(original_text)

    return facebook_usage


