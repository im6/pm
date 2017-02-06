AV 番号去重编码
=========================

This code is designed and optimized for the economizing-hard-drive-users
who are tired of managing their movies with desination index manually. You can easily locate the duplication and delete it immediately.

## Highlight(to be continue)

- 找出重复番号
- 输出csv
- 清晰管理
- 清理磁盘空间

## Usage Scenario

- ./abs130/abs130.avi
- ./abs-130.HD.avi

You could also create your own regExp to filter out whatever naming template you need.

## How Does It Work?

The REPORT.csv file will be generated afterward.

for MovieCollector:
```
from src.MovieCollector import MovieCollector

target = ['/movie/path1/', '/movie/path2/', '/movie/path3/']
inst = MovieCollector(target, showDuplicate = True, regEx = "^[a-zA-Z]{3,7}(|-)[0-9]{3,5}")
# showDuplicate = True shows all the movie list
inst.start()
```

for MovieLocator:
```
from src.MovieLocator import MovieLocator

target = ['/movie/path1/', '/movie/path2/', '/movie/path3/']
inst = MovieLocator(target, movie_name='abs-130')   # search keyword with hyphen
inst.start()
```

Enjoy!

## License

MIT