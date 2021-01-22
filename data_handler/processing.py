import pandas as pd
import numpy as np
from hobby_cat import get_hobby_category
from in_5_year_cat import get_plan_category
from kth_canvas_usage_quantify import get_canvas_usage_number
from kth_social_usage_quantify import get_social_usage_number
from facebook_usage_quantify import get_facebook_usage_number

df = pd.DataFrame(pd.read_excel("selfIntro.xlsx"))
col_name = ["alias", "major", "degree", "hobbies",
    "kth_canvas_usage", "kth_social_usage", "facebook_usage",
    "course_expectations", "info_vis_skill", "stats_skill",
    "maths_skill", "drawing_skill", "computer_skill",
    "programming_skill", "cg_skill",
    "hci_skill", "user_experience_skill", 
    "communication_skill", "collaboration_skill",
    "code_repository_skill", "in_5_years"]
assert(len(col_name) == len(df.columns))
df.columns = col_name

df['hobbies'] = df['hobbies'].replace(np.nan, None)
df['hobbies'] = df['hobbies'].apply(lambda x: get_hobby_category(x))

df['in_5_years'] = df['in_5_years'].replace(np.nan, None)
df['in_5_years'] = df['in_5_years'].apply(lambda x: get_plan_category(x))

df['kth_canvas_usage'] = df['kth_canvas_usage'].replace(np.nan, None)
df['kth_canvas_usage'] = df['kth_canvas_usage'].apply(lambda x:get_canvas_usage_number(x))

df['kth_social_usage'] = df['kth_social_usage'].replace(np.nan, None)
df['kth_social_usage'] = df['kth_social_usage'].apply(lambda x:get_social_usage_number(x))

df['facebook_usage'] = df['facebook_usage'].replace(np.nan, None)
df['facebook_usage'] = df['facebook_usage'].apply(lambda x:get_facebook_usage_number(x))

df