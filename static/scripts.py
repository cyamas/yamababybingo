from PIL import Image
import os
import json

def resize_item():
    for f in os.listdir('gameImages'):
        if f != '.DS_Store':
            fp ='gameImages/' + f
            image = Image.open(fp)
            image.thumbnail((100,100))
            image.save(fp)

resize_item()

def item_to_json(img):
    data = {'img': img}
    
    with open('bingoItems.json') as fp:
        curr_items = json.load(fp)
        curr_items.append(data)
    
    with open('bingoItems.json', 'w') as json_file:
        json.dump(curr_items,json_file, indent=4)
    
    return

'''for i in range(len(os.listdir('gameImages'))):
    if os.listdir('gameImages')[i] != '.DS_Store':
        item_to_json(os.listdir('gameImages')[i])'''


print(len(os.listdir('gameImages')))