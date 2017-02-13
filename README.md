电影番号SKU去重
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

You could also create your own regExp to filter out whatever naming template you need.

## How Does It Work?

The REPORT.csv file will be generated afterward.

1, You have to create your /local/constant_var.py file with following template:
```
paths = [
    '/movie/path1/',
    '/movie/path2/',
    '/movie/path3/'
]

company_exception = [
    '10musume',
    '1pondo',
    '1000giri',
]
```


2, run command line

```
python app.py dup  # find out duplication sku number movies
python app.py open abs130 # open the movie with native player
python app.py filter abs # search the keyword, and you could select index to preview it
python app.py csv # get all the movie list into local csv file
```

Enjoy!

## License

MIT
