import csv

showDuplicate = input("Do you the list of all(A) or Duplicate(D)?") == "D"
nameList = []
fileList = ['AV_Reports.csv', 'AV_Reports2.csv', 'AV_Reports3.csv']

for oneFile in fileList:
    with open(oneFile, 'r') as fout:
        reader = csv.reader(fout)
        for row in reader:
            nameList.append(row[0])


nameList.sort()

if showDuplicate:
    newResult = []
    for oneIndex, oneItem in enumerate(nameList):
        if nameList.count(oneItem) > 1:
            newResult.append(oneItem)
    print("create duplication list...")
    nameList = newResult

with open('all.csv', 'w') as csvfile:
    fieldnames = ['Id']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for oneIndex, oneItem in enumerate(nameList):
        writer.writerow({'Id': oneItem})

print("Finish!!")