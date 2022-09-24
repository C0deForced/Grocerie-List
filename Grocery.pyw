#Public Library imports
from re import S
from urllib import response
from flask import Flask, jsonify, render_template, redirect, url_for, request, make_response

#Custom file imports



#Global variables
groceries_list = []


#Core process name
core = Flask(__name__)

@core.route('/')
def main_startup():
    return render_template('base.html')

@core.route('/groceries')
def get_grocerie_list():
    print(groceries_list)
    return jsonify(groceries_list)

@core.route('/add/<item>', methods=['GET'])
def add_to_list(item):
    #checking if the return is blank
    if item:
        groceries = {}
        data = item.split('|')
        groceries['item'] = data[0]
        groceries['value'] = data[1]
        groceries_list.append(groceries)
        print(groceries_list)
        return 'pass'
    
@core.route('/remove/<item>', methods=['GET'])
def remove_item(item):
    if item:
        for x in groceries_list:
            y = x['item']
            
            if y == item:
                groceries_list.remove(x)

        myresponse = item + ' removed'
        return myresponse

@core.route('/clear')
def clear_all():
    groceries_list.clear()
    return 'blank'

if __name__ == '__main__':
    core.run(debug=True, host='127.0.0.1', port=6008.)
    #
