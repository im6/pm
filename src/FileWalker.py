import os
import re
import subprocess

default_movie_ext = ['mp4', 'avi', 'mkv', 'wmv']
defaultReg = "^[a-zA-Z]{2,8}(|-|_)[0-9]{2,6}"
defaultReg2 = "^(|1|10)[a-zA-Z]{2,8}(|-|_)[0-9]{2,6}"

class FileWalker:
    def __init__(self, pathList, regEx = defaultReg2):
        self.path_list = pathList
        self.regStr = regEx

    def addToList(self, list, name, asset):
        shortName = re.search(self.regStr, name).group(0)
        name_grp = re.split('(\d.*)', shortName)
        list.append({
            "c": name_grp[0],
            "i": name_grp[1],
            "m": asset['m'],
            'im': asset['i']
        })

    def check_match(self, str):
        p = re.compile(self.regStr)
        return p.match(str)

    def change_format(self, str):
        str1 = str.replace("-", "")
        str2 = str1.lower()
        return str2

    def is_movie(self, name):
        ext = self.get_ext(name)
        return ext in default_movie_ext

    def get_ext(self, name):
        return name.split('.')[-1]

    def getMoviePathInFolder(self, root):
        result = {
            'm': '',
            'i': ''
        }
        for root, dirs, files in os.walk(root):
            for onef in files:
                if self.get_ext(onef) in default_movie_ext and not result['m']:
                    result['m'] = root + '/' + onef
                elif self.get_ext(onef) == 'jpg' and not result['i']:
                    result['i'] = root + '/' + onef
        return result

    def open_move(self, path):
        subprocess.call(["open", path])

    def traverse(self):
        list = []
        for cwd in self.path_list:
            print('analysizing directory(%s)...' % (cwd))

            for root, dirs, files in os.walk(cwd):
                folder_name = os.path.basename(root)
                folder_name1 = self.change_format(folder_name)
                if self.check_match(folder_name1):
                    asset = self.getMoviePathInFolder(root)
                    self.addToList(list, folder_name1, asset)
                else:
                    # looking for the movie instance
                    for oneFile in files:
                        if not self.is_movie(oneFile):
                            continue

                        name = self.change_format(os.path.splitext(oneFile)[0])
                        if self.check_match(name):
                            self.addToList(list, name, {'m': root + '/' + oneFile, 'i': None})

        return list

    def getList(self):
        list = self.traverse()
        list.sort(key=lambda x: x['c'] + x['i'])
        return list