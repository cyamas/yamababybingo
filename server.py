from flask import Flask, render_template, request, redirect, url_for, session
from flask_socketio import join_room, leave_room, send, SocketIO, emit
import random
import os
from datetime import timedelta
import time
import json
import threading


app = Flask(__name__)

app.secret_key = 'ybaambay012193'

socketio = SocketIO(app, cors_allowed_origins="*")

app.permanent_session_lifetime = timedelta(minutes=90)

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

#creates session data to store real-time game information for 90 minutes
def create_game(password):
    session.permanent = True
    rooms.append(password)

    session['password'] = password
    session['host'] = True
    session['curr'] = -1
    session['prev'] = -2
    registry_length = len(os.listdir('static/gameImages'))-2
    session['game_index'] = random.sample(range(0,registry_length-1), registry_length-1)
    session['game_i'] = -2
    session['started'] = False
    return redirect(url_for('host_game'))

#gets password from client and allows a user entrance into the game
def join_game(data):
    if data['password'] in rooms:
        session['idx'] = make_bingo_card()
        session['team'] = data['team-name']
        session['xes'] = [0 for i in range(25)]
        return redirect(url_for('play', team_name = data['team-name']))
    else:
        return render_template('/home.html', error="Incorrect password. Try again.")

#generates a random list of integers that will populate the bingo card with images based on their index position
def make_bingo_card():
    registry_length = len(os.listdir('static/gameImages'))
    idx = random.sample(range(0,registry_length-1), 25)
    return idx

@app.route('/bingo/<team_name>', methods = ['GET','POST'])
def play(team_name):
    if request.method == 'POST':
        data = request.form
        session['xes'][int(data['id'])] = int(data['x'])

    return render_template('/bingo.html', idx = session['idx'], xes = session['xes'], team_name = team_name)


@socketio.on("connect")
def connect(auth):
    print('Someone has joined the game!')
    
    return

@app.route('/host', methods=['GET', 'POST'])
def host_game():
    bingo_items = []
    with open('static/bingoItems.json') as itms:
        bingo_items += json.load(itms)
    if request.method == 'POST':
        print([session['prev'], session['curr'], session['game_i']])
        session['started'] = True
        if session['game_i'] < len(session['game_index']) and session['started']:
            new_prev = session['curr']
            session['prev'] = new_prev
            game_index = session['game_index']
            curr_i = session['game_i']
            session['curr'] = game_index[curr_i]
            session['game_i'] += 1
        socketio.emit('items', [bingo_items[session['curr']]['img'], bingo_items[session['prev']]['img']])   
    return render_template('/host.html', curr = bingo_items[session['curr']], prev = bingo_items[session['prev']])
            
if __name__ == '__main__':
    app.run(debug=True)





