import pandas as pd
from db import MineDB

data = pd.read_excel(open('./child.xlsx', 'rb'), sheetname='sheet1')

db = MineDB('localhost', 'turing', 'childKD')



def processData(data):
    symptom_groups = data.groupby('symptom')
    for name, group in symptom_groups:
        if not name:
            continue
        row_1 = group.iloc[0]
        data = {}
        data['department'] = row_1['department']
        data['category'] = row_1['category']
        data['symptom'] = row_1['symptom']
        data['tags'] = row_1['tags'].split('/')
        data['kd_body'] = []
        for _, row in group.iterrows():
            if not row['kd_title']:
                continue
            data['kd_body'].append({ \
                'kd_title': row['kd_title'], \
                'content': row['content'] \
            })
        
        yield data


    
for item in processData(data):
    db.insert(item)


