import os
import re
import sys
import csv

cwd = os.getcwd()

result = []
showDuplicate = input("Do you the list of all(A) or Duplicate(D)?") == "D"

regStr = "^[a-zA-Z]{3,5}(|-)[0-9]{3,5}"


p = re.compile(regStr)

def addToList(list, name):
      matchResult = p.match(name)
      if p.match(name):
            shortName = re.search(regStr, name).group(0)
            list.append(shortName)

def createCSV(list):
      with open('AV_Reports.csv', 'w') as csvfile:
            fieldnames = ['Id']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for oneIndex, oneItem in enumerate(list):
                  writer.writerow({'Id': oneItem})


print('target directory: %s' %(cwd))

for root, dirs, files in os.walk(cwd):
      if len(dirs) < 1:
            # normal folders
            fanName = os.path.basename(root)
            addToList(result, fanName)
      elif len(files) > 1 and len(dirs) > 0:
            # files without parent folder
            fanName = os.path.basename(root)
            for oneFile in files:
                  fileName = os.path.splitext(oneFile)[0]
                  if fileName != '.DS_Store':
                        addToList(result, os.path.splitext(oneFile)[0])

for oneIndex, oneItem in enumerate(result):
      str1 = oneItem.replace("-", "")
      str2 = str1.lower()
      result[oneIndex] = str2

result.sort()

if showDuplicate:
      newResult = []
      for oneIndex, oneItem in enumerate(result):
            if result.count(oneItem) > 1:
                  newResult.append(oneItem)
      print("create duplication list...")
      result = newResult


print('creating csv......')

createCSV(result)

print('finished!')