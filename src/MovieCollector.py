import os
import re
import csv

default_movie_ext = ['.mp4', '.avi', '.mkv']
defaultReg = "^[a-zA-Z]{3,8}(|-|_)[0-9]{2,6}"
defaultReg2 = "^(|1|10)[a-zA-Z]{3,8}(|-|_)[0-9]{2,6}"

class MovieCollector:
    def __init__(self, pathList, showDuplicate, regEx = defaultReg):
        self.path_list = pathList
        self.showDuplicate = showDuplicate
        self.regStr = regEx

    def createCSV(self, list):
        print('creating csv...')
        fileName = 'REPORT.csv'
        full_path = os.path.join(".", fileName)

        with open(full_path, 'w') as csvfile:
            fieldnames = ['company', 'id', 'path']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for oneIndex, oneItem in enumerate(list):
                writer.writerow({
                    'company': oneItem['c'],
                    'id': oneItem['i'],
                    'path': oneItem['d']
                })

    def addToList(self, list, name, dir):
        shortName = re.search(self.regStr, name).group(0)
        name_grp = re.split('(\d.*)', shortName)
        list.append({
            "c": name_grp[0],
            "i": name_grp[1],
            "d": dir
        })

    def check_match(self, str):
        p = re.compile(self.regStr)
        return p.match(str)

    def change_format(self, str):
        str1 = str.replace("-", "")
        str2 = str1.lower()
        return str2
    def is_movie(self, name):
        ext = os.path.splitext(name)[1]
        return ext in default_movie_ext

    def start(self):
        list = []
        for cwd in self.path_list:
            print('analysizing directory(%s)...' % (cwd))

            for root, dirs, files in os.walk(cwd):

                folder_name = os.path.basename(root)
                folder_name1 = self.change_format(folder_name)
                if self.check_match(folder_name1):
                    self.addToList(list, folder_name1, root)
                else:
                    for oneFile in files:
                        if not self.is_movie(oneFile):
                            continue

                        name = self.change_format(os.path.splitext(oneFile)[0])
                        if self.check_match(name):
                            self.addToList(list, name, root)





        list.sort(key=lambda x: x['c'] + x['i'])

        if self.showDuplicate:
            print("generating the duplication list: ")
            newResult = []
            end = len(list) - 1
            for oneIndex, oneItem in enumerate(list):
                if oneIndex < end and oneItem['c'] == list[oneIndex + 1]['c'] and oneItem['i'] == list[oneIndex + 1]['i']:
                    newResult.append(oneItem)
                    newResult.append(list[oneIndex + 1])
            print("create duplication list...")
            list = newResult

        self.createCSV(list)
        print('finished!')