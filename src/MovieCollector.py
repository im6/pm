import os
import re
import sys
import csv


class MovieCollector:
    def __init__(self, pathList, showDuplicate):

        self.path_list = pathList
        self.showDuplicate = showDuplicate


    def createCSV(self, list):
        print('creating csv......')
        with open('AV_Reports.csv', 'w') as csvfile:
            fieldnames = ['company', 'id']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for oneIndex, oneItem in enumerate(list):
                writer.writerow({
                    'company': oneItem['c'],
                    'id': oneItem['i']
                })

    def addToList(self, list, name):
        regStr = "^[a-zA-Z]{3,5}(|-)[0-9]{3,5}"
        p = re.compile(regStr)
        #matchResult = p.match(name)
        if p.match(name):
            shortName = re.search(regStr, name).group(0)
            list.append(shortName)

    def start(self):
        list = []
        for cwd in self.path_list:
            print('target directory: %s' % (cwd))

            for root, dirs, files in os.walk(cwd):
                if len(dirs) < 1:
                    # normal folders
                    fanName = os.path.basename(root)
                    self.addToList(list, fanName)
                elif len(files) > 1 and len(dirs) > 0:
                    # files without parent folder
                    fanName = os.path.basename(root)
                    for oneFile in files:
                        fileName = os.path.splitext(oneFile)[0]
                        if fileName != '.DS_Store':
                            self.addToList(list, os.path.splitext(oneFile)[0])

        result = self.list
        for oneIndex, oneItem in enumerate(result):
            str1 = oneItem.replace("-", "")
            str2 = str1.lower()
            result[oneIndex] = str2

        result.sort(key=lambda x: x['c'] + x['i'])

        if self.showDuplicate:
            newResult = []
            for oneIndex, oneItem in enumerate(result):
                if result.count(oneItem) > 1:
                    newResult.append(oneItem)
            print("create duplication list...")
            result = newResult

        self.createCSV(result)
        print('finished!')
        return result


