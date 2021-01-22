from enum import Enum
import numpy as np

#Quantify the fixed options
def get_social_usage_number(original_text):
    social_usage = None

    #mapping options to numbers
    usage = {
        "I use it to check the schedule and to go to the canvas pages for my courses": 0, 
        "Yes, but only a few times a week.": 1, 
        "Yes, but the last time I checked was two weeks ago.": 2,
        "Use it very rarely, less than once a month. ": 3,
        "No, but I wouldn't mind using it.": 4,
        "I haven't really had courses that use it alot but i did not like it when it was used. I think canvas it just a better option but i would not mind using kth social if i had to.": 4,
        "Have not really used it at all, dont really know what it is. Guess I am open to use it.": 4,
        "No but I guess I would use it if I had to.": 5,
        "No and I haven't heard about it.": 6,
        "No and I will never use it.": 7,

        }
    social_usage = usage.get(original_text)

    return social_usage


