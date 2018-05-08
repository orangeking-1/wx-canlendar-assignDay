# wx-canlendar-assignDay
微信小程序日历，指定几号几号的日历，没指定的其他日子是不能点击的


## 效果图

## 功能
将微信小程序日历封装成组件进行调用，可以指定那些天可点击，适用于某些指定天数的日历场景。

## 用法
```

已小程序组件的形式导入
在.json文件内
"usingComponents": {
      "dataselect": "路径/dataSelect/dataselect",
    }
    
在.wxml中
<dataselect
  id="calender"
  minDate="{{minDate}}"
  hasMonth="{{hasMonth}}"
  group="{{groupData}}"
  bind:okFunc="_okFunc"
></dataselect> 





```

