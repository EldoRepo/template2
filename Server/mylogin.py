import MTG_data_extraction as MTG
import pymongo
from pymongo import MongoClient
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Create a new user')
    parser.add_argument('--P', metavar='--Password', required=True,
                        help='Your password')
    parser.add_argument('--U', metavar='--Username', required=True,
                        help='Your Username')
    parser.add_argument('--N', metavar='--New', required=False,
                        help='Create a new user')
    parser.add_argument('--E', metavar='--Email', required=False,
                        help='New user email')
    args = parser.parse_args()

    client = MongoClient('localhost', 27017)
    targetdb=client['Users']['users']

    if args.N and args.E:
      try:
          search=targetdb.find_one({'username': str(args.U)})
          if len(search>0):
            print("username already in use please try again")
          else:
              targetdb.insert_one(
                {
                  "username" : str(args.U),
                  "password" : str(args.P),
                  "email" : str(args.E),
                  "collections" : [],
                  "decks" : []
              })
              print("New user created")
    else:
      user=targetdb.find_one({'username': str(args.U)})
      try:
        if user['password'] == str(args.P):
            print("matching password")
        else:
            print("incorrect password")
      except:
            raise

