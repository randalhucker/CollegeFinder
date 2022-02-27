# Hackathon | UCRevolution
# Zach Brown, Randy Hucker, Owen Richards, and Anthony Shepard 
# Best Choice Colleges

from math import ceil
import flask
import requests
import json
#import Tkinter
#top = Tkinter.Tk()
#top.mainloop()

stateNumbers = { 
    "ALABAMA" : 1, 
    "ALASKA"  : 2,
    "ARIZONA" : 4,
    "ARKANSAS" : 5,
    "CALIFORNIA" : 6,
    "COLORADO" : 8,
    "CONNETICUT" : 9,
    "DELAWARE" : 10,
    "DISTRICT OF COLOMBIA" : 11,
    "FLORIDA" : 12,
    "GEORGIA" : 13,
    "HAWAII" : 15,
    "IDAHO" : 16,
    "ILLINOIS" : 17,
    "INDIANA" : 18,
    "IOWA" : 19,
    "KANSAS" : 20,
    "KENTUCKY" : 21,
    "LOUISIANA" : 22,
    "MAINE" : 23,
    "MARYLAND" : 24,
    "MASSACHUSETTS" : 25,
    "MICHIGAN" : 26,
    "MINNESOTA" : 27,
    "MISSISSIPPI" : 28,
    "MISSOURI" : 29,
    "MONTANA" : 30,
    "NEBRASKA" : 31,
    "NEVADA" : 32,
    "NEW HAMPSHIRE" : 33,
    "NEW JERSEY" : 34,
    "NEW MEXICO" : 35,
    "NEW YORK" : 36,
    "NORTH CAROLINA" : 37,
    "NORTH DAKOTA" : 38,
    "OHIO" : 39,
    "OKLAHOMA" : 40,
    "OREGON" : 41,
    "PENNSYLVANIA" : 42,
    "RHOAD ISLAND" : 44,
    "SCOUT CAROLINA" : 45,
    "SOUTH DAKOTA" : 46,
    "TENNESSEE" : 47,
    "TEXAS" : 48,
    "UTAH" : 49,
    "VERMOT" : 50,
    "VIRGINIA" : 51,
    "WASHINGTON" : 53,
    "WEST VIRGINA" : 54,
    "WISCONSIN" : 55,
    "WYOMING" : 56,
    "AMERICAN_SAMOA" : 60,
    "FEDERATED STATES OF MICRONESIA" : 64,
    "GUAM" : 66,
    "NORTHERN MARIANA ISLAND" : 69,
    "PALAU" : 70,
    "PUERTO RICE" : 72,
    "VIRGIN ISLANDS" : 78,
}

# class College(object):
#     def __init__(self, name, location, inTuition, outTuition):
#         self.name = name
#         self.location = location
#         self.inTuititon = inTuition
#         self.outTuition = outTuition

class User(object):
    def __init__(self, location, GPA, budget):
        self.location = location
        self.GPA = GPA
        self.budget = budget      
                 
# Declarations
state = -1


# Questions

while True:
    tempState = input("Which state are you looking for? ").upper()
    if tempState in stateNumbers.keys():
        state = stateNumbers[tempState]
        break
    else:
        print("ERROR GIVE A FORMATED ANSWER")
        
budget = int(input("What is your yearly budget?: (No commas) "))

pageNum = 1 
url_endpoint = 'https://api.data.gov/ed/collegescorecard/v1/schools'
mydict = {'api_key': 'Qga67ZNRevDYZzo2cB0P3IdhArjE00eXKoTaCE9S', 'page': pageNum, 'school.state_fips': state}

if state == -1:
    mydict.pop('school.state_fips')

resp = requests.get(url_endpoint, params=mydict)

data = resp.json()

totalColleges = data["metadata"]["total"]
per_page = data["metadata"]["per_page"]

totalPages = ceil(totalColleges / per_page)

for k in range(totalPages - 1):
    pageNum += 1
    mydict["page"] = pageNum
    resp = requests.get(url_endpoint, params=mydict)
    data = resp.json()

    # Info Print
    for school in data['results']:
        inStateTuition = school["latest"]["cost"]["tuition"]["in_state"]
        outStateTuition = school["latest"]["cost"]["tuition"]["out_of_state"]

        #Check for empty tuition values
        if inStateTuition == None:
            inStateTuition = 0
        if outStateTuition == None:
            outStateTuition = 0

        if inStateTuition < budget or outStateTuition < budget :
            print(school["latest"]["school"]["name"])
            print(school["latest"]["cost"]["tuition"]["in_state"])
            print(school["latest"]["cost"]["tuition"]["out_of_state"])
    
        

 

