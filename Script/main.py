import requests
import hashlib
from datetime import datetime
import pymongo

private_key = "9ed46cfb6952b8b88ea0c35807a5d32fa1206266"
public_key = "62c3ef1c1aab0b7d3b5a9f95b1f5e7ee"
ts = str(round(datetime.timestamp(datetime.now())))
marvel_hash = hashlib.md5((ts+private_key+public_key).encode()).hexdigest()
api_url = "http://gateway.marvel.com/v1/public"

mongo_client = pymongo.MongoClient("mongodb://mongo:27017/")
db = mongo_client["marvel_script"]
characters_collection = db["characters"]
id_saved = []

def get_auth_request(endpoint):
    return requests.get(endpoint + "ts="+ ts +"&apikey=" + public_key + "&hash=" + marvel_hash)

def get_character(name):
    return get_auth_request(api_url + "/characters?name="+ name + "&").json()['data']['results'][0]

def get_comic_characters(comicURI):
    return get_auth_request(comicURI+"/characters?").json()['data']['results']

def save_character(character):
    if characters_collection.find_one({'name': character['name']}):
         return
    thumbnail = character['thumbnail']
    picture = thumbnail['path'] + "." + thumbnail['extension']
    character = {
        'name': character['name'], 
        'id': character['id'], 
        'description': character['description'], 
        'picture': picture
    }
    return characters_collection.insert_one(character)

def save_characters(characters):
    for character in characters:
        return save_character(character)

spectrum = get_character("spectrum")

save_character(spectrum)

spectrum_comics = spectrum['comics']['items']

for comic in spectrum_comics:
    characters = get_comic_characters(comic['resourceURI'])
    save_characters(characters)