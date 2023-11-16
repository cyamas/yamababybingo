from flask import Flask, render_template, request, redirect, url_for, session
from flask_socketio import join_room, leave_room, send, SocketIO, emit
from flask_redis import FlaskRedis
import random
import os
from datetime import timedelta
import time
import json
import threading


app = Flask(__name__)

app.secret_key = 'ybaambay012194'

session

app.config['REDIS_URL'] = 'redis://localhost:6379/0'

socketio = SocketIO(app, cors_allowed_origins="*")
redis = FlaskRedis(app)


rooms = []

@app.route('/')
def home():
    return render_template('/home.html')


@app.route('/', methods=['POST'])
def action():
    data = request.form.to_dict()
    if data['id'] == 'create':
        return create_game(data['password'])
    else:
        return join_game(data)

@app.route('/host', methods=['GET', 'POST'])
def host_game():
    bingo_items = []
    new_curr_name = ''
    new_prev_name = ''
    with open('static/bingoItems.json') as itms:
        bingo_items += json.load(itms)
    curr_i = int(redis.get('item_index').decode('utf-8'))
    item_indices = json.loads(redis.get('item_order'))
    item_indices = [int(item) for item in item_indices]
    
    if curr_i >= 1:
        new_curr_name = bingo_items[item_indices[curr_i-1]]['name']
        if curr_i > 1:
            new_prev_name = bingo_items[item_indices[curr_i-2]]['name']
    
    if request.method == 'POST':
        new_curr_name = bingo_items[item_indices[curr_i]]['name']
        if curr_i > 0: 
            new_prev_name = bingo_items[item_indices[curr_i-1]]['name']
        
        new_curr = bingo_items[item_indices[curr_i]]['img']
        new_prev = redis.get('curr').decode('utf-8') 
        redis.set('prev', new_prev)
        redis.set('curr', new_curr)
        redis.set('item_index', curr_i + 1)
        redis.rpush('item_history', new_curr)
        socketio.emit('items', [new_curr, new_prev]) 

    curr_item = redis.get('curr').decode('utf-8')
    prev_item = redis.get('prev').decode('utf-8')

    return render_template('/host.html', curr = curr_item, prev = prev_item, curr_name = new_curr_name, prev_name = new_prev_name)

@app.route('/bingo/<team_name>', methods = ['GET','POST'])
def play(team_name):
    team = request.path[7:]
    curr_xes = []
    if request.method == 'POST':
        data = request.form
        team = data['team']
        curr_xes = json.loads(redis.get(data['team'] + '_xes'))
        curr_xes[int(data['id'])] = int(data['x'])
        new_xes = json.dumps(curr_xes)
        redis.set(data['team'] + '_xes', new_xes)
        
    socketio.emit('currXes', curr_xes)  
    bingo_card = json.loads(redis.get(team + '_card'))
    xes_list = json.loads(redis.get(team + '_xes'))
    xes_list = [int(x) for x in xes_list]
    curr_item = redis.get('curr').decode('utf-8')
    prev_item = redis.get('prev').decode('utf-8')

    return render_template('/bingo.html', card = bingo_card, xes = xes_list, team_name = team_name, curr = curr_item, prev = prev_item)

#creates session data to store real-time game information for 90 minutes
def create_game(password):
    rooms.append(password)
    print("Rooms: ", rooms)
    redis.lpush('players', 'host')
    redis.set('item_index', 0)
    redis.set('curr', 'None')
    redis.set('prev', 'None')

    registry_length = len(os.listdir('static/gameImages'))-2
    game_item_list = json.dumps(random.sample(range(0,registry_length-1), registry_length-1))
    redis.set('item_order', game_item_list)
    return redirect(url_for('host_game'))

#gets password from client and allows a user entrance into the game
def join_game(data):
    team_list = redis.lrange('players', 0, -1) 
    if data['password'] in rooms and data['team-name'] not in team_list:
        session['password'] = data['password']
        team = data['team-name']
        card =json.dumps(make_bingo_card())
        print(card)
        xes = json.dumps([0 for i in range(25)])
        redis.rpush('players', team)
        redis.set(team + '_card', card)
        redis.set(team + '_xes', xes)
    
        return redirect(url_for('play', team_name = data['team-name']))
    else:
        return render_template('/home.html', error="Password incorrect OR team name already taken!")

#generates a random list of integers that will populate the bingo card with images based on their index position
def make_bingo_card():
    bingo_items = []
    with open('static/bingoItems.json') as itms:
        bingo_items += json.load(itms)
    registry_length = len(os.listdir('static/gameImages'))
    idx = random.sample(range(0,registry_length-1), 25)
    card_pics = [bingo_items[indx]['img'] for indx in idx]
    return card_pics

@socketio.on("connect")
def handle_connect(auth):
    return

@socketio.on('team')
def team_name(team):
    print(f"{team['team']} has joined the game!")
    return

@socketio.on("winner")
def winner(data):
    team = data['team']
    candidate = data['candidate']
    history = redis.lrange('item_history', 0, -1)
    history = [item.decode('utf-8') for item in history]
    if set(candidate).issubset(history):
        socketio.emit("winningTeam", {'message': f" BINGOOOOOO!!! TEAM {team} HAS WON!!"})
        print(f"BINGOOOOOO!!!!!!! TEAM {team} HAS WON!!")
    else:
        socketio.emit("invalid", team)
        print(f"{team} has made an error! NO BINGO!!")
    return

            
if __name__ == '__main__':
    app.run(debug=True)





