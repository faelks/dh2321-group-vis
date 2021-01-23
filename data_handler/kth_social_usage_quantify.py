from enum import Enum
import numpy as np


def get_social_usage_number(original_text):
    social_usage = None

    # Quantify the fixed options

    # KTH Social is likely not going to be used for any interaction.
    # I think that the lecturer explained that it will probably only
    # used for checking the projects done in previous years.
    # With this reasoning, this feature might be fairly irrelevant.

    # Mapping into values 0-3 where 0 is unlikely to use and 3
    # is a relatively high frequency of use.

    # mapping options to numbers
    usage = {
        "Yes, but only a few times a week.": 3,
        "I use it to check the schedule and to go to the canvas pages for my courses": 3,

        "Yes, but the last time I checked was two weeks ago.": 2,
        "Use it very rarely, less than once a month. ": 2,

        "No, but I wouldn't mind using it.": 1,
        "I haven't really had courses that use it alot but i did not like it when it was used. I think canvas it just a better option but i would not mind using kth social if i had to.": 1,
        "Have not really used it at all, dont really know what it is. Guess I am open to use it.": 1,
        "No but I guess I would use it if I had to.": 1,

        "No and I haven't heard about it.": 0,
        "No and I will never use it.": 0,
    }
    social_usage = usage.get(original_text)

    return social_usage
