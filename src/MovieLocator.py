import os
import re

default_movie_ext = ['.mp4', '.avi', '.mkv', '.wmv']
defaultReg = "^[a-zA-Z]{2,8}(|-|_)[0-9]{2,6}"
defaultReg2 = "^(|1|10)[a-zA-Z]{2,8}(|-|_)[0-9]{2,6}"

class MovieLocator:
    def __init__(self, pathList, movie_name, regEx = defaultReg):
        self.path_list = pathList
        self.movie_name = movie_name
        self.regStr = regEx

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
        tgt = self.movie_name.split('-')
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
        result = filter(lambda x: x['c'] == tgt[0] and x['i'] == tgt[1], list)
        print('================')
        if result:
            for ind, item in enumerate(result):
                print("%s, %s" %(ind + 1, item['d']))
        else:
            print('No Match Result.')

        print('================')
