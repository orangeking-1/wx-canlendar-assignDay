// components/dataSelect/dataselect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    minDate: {
      type: String,
      value: '2018/5/1'
    },
    hasMonth: {
      type: String,
      value: '3'
    },
    group: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,  //显示隐藏日历
    currentItem: 0,
    swiperIndex: 0,
    group: [],     //团期
    dayTitle: [],
    clickNum: '',
    dayCon: [{
      title: '',
      conten: []
    },{
      title: '',
      conten: []
    },{
      title: '',
      conten: []
    }],
    selectObj: {}
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //侧滑时候上面对应的月份改变
    changeCurrentFunc(e) {
      this.setData({
        currentItem: e.detail.current
      })
    },
    

    //点击上面月份，下面滑到具体的月份
    toMonthNumFunc(e){
      this.setData({
        swiperIndex: e.target.dataset.num
      })
    },

    initCalender: function(){
      var minDate = new Date(this.properties.minDate)
      var dayCon = []  //总月数的
      //遍历横跨月数
      for (var i = 0; i < Number(this.properties.hasMonth); i++){
        var newMouth = null,
            newYear = null
        //如果是12月，月=1，年++
        if (Number(this.toMonth(minDate)) + i > 12){
          newYear = minDate.getFullYear() + 1
          newMouth = Number(this.toMonth(minDate)) + i - 12
        }else{
          newYear = minDate.getFullYear()
          newMouth = Number(this.toMonth(minDate)) + i
        }

        var newDateStr = `${newYear}/${newMouth}/1`
        var newDate = new Date(newDateStr)              //赋值新的时期对象
        var dayObj = {}
        //获取年月
        dayObj.title = `${newDate.getFullYear()}年${newDate.getMonth() + 1}月` 
        dayObj.content = []
        var firstDay = this.firstDayForWeek(newDate)
        var alldays = this.alldays(newDate)
        for(var j = 0; j < firstDay; j++ ){
          dayObj.content.push('')
        }
        for (var k = 0; k < alldays ; k++){
          var contentObj = {}
          contentObj.date = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${k+1}`
          contentObj.num = k + 1
          // dayObj.content.push(k+1)
          dayObj.content.push(contentObj)
        }
        dayCon[i] = dayObj
      }

      var dayTitle = []
      for(var i = 0; i < dayCon.length; i++){
        dayTitle.push(dayCon[i].title.substring(5,7))   //截取月份
      }

      this.setData({
        dayTitle,
        dayCon
      })

    },

    /*日历公用函数*/
    //获取本月1号的周值
    firstDayForWeek: function (dateObj){
      var oneyear = new Date()
      var year= dateObj.getFullYear()
      var month= dateObj.getMonth()//0是12月
      oneyear.setFullYear(year)
      oneyear.setMonth(month)//0是12月
      oneyear.setDate(1)
      return oneyear.getDay()
    },

    //当前是几
    nowday: function (dateObj){
      return dateObj.getDate()
    },

    //获取本月总日数方法
    alldays: function (dateObj){
      var year= dateObj.getFullYear();
      var month= dateObj.getMonth();
      //润年
      if(this.isLeapYear(year)) {
        switch (month) {
         case 0: return "31"; break;
          case 1: return "29"; break;   //2月
          case 2: return "31"; break;
          case 3: return "30"; break;
          case 4: return "31"; break;
          case 5: return "30"; break;
          case 6: return "31"; break;
          case 7: return "31"; break;
          case 8: return "30"; break;
          case 9: return "31"; break;
          case 10: return "30"; break;
          case 11: return "31"; break;
          default:
        };
        //平年
      }else{
        switch(month) {
          case 0:   return "31";   break;
          case 1:   return "28";   break;  //2月
          case 2:   return "31";   break;
          case 3:   return "30";   break;
          case 4:   return "31";   break;
          case 5:   return "30";   break;
          case 6:   return "31";   break;
          case 7:   return "31";   break;
          case 8:   return "30";   break;
          case 9:   return "31";   break;
          case 10:   return "30";   break;
          case 11:   return "31";   break;
          default:
        }
      }
    },

    //闰年判断函数
    isLeapYear: function (year){
      if( (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
        return true;
      }else{
        return false;
      }
    },

    //月份转化方法
    toMonth: function (dateObj){
      var month= dateObj.getMonth()
        switch(month) {
          case 0:   return "1";   break;
          case 1:   return "2";   break;
          case 2:   return "3";   break;
          case 3:   return "4";   break;
          case 4:   return "5";   break;
          case 5:   return "6";   break;
          case 6:   return "7";   break;
          case 7:   return "8";   break;
          case 8:   return "9";   break;
          case 9:   return "10";   break;
          case 10:   return "11";   break;
          case 11:   return "12";   break;
          default:
        }
    },

    //选中团的日期
    onSelectDayFunc: function(e){
      this.setData({                     //将选中的值赋值给selectObj
        selectObj: e.target.dataset.dayitem
      })

      //该团期添加样式，其他团期去掉样式
      this.setData({
        clickNum: e.currentTarget.dataset.dayitem.num
      })
    },

    //将从属性上传过来的数据，赋值到data
    copyData: function(){
      this.setData({
        group: this.properties.group
      })
    },

    //将外部团期数据替换掉data里面的日期
    replaceData: function(){
      var dayConCopy = this.data.dayCon
      this.data.dayCon.map((dayConItem, dayConIndex) => {
        dayConItem.content.map((contentItem, contentIndex) => {
          this.data.group.map(function (groupItem, index) {
            if (groupItem.time == contentItem.date){
              var contentObj = {}
              contentObj = groupItem
              contentObj.num = dayConCopy[dayConIndex].content[contentIndex].num
              contentObj.hasGroup = true
              dayConCopy[dayConIndex].content[contentIndex] = contentObj
            }
          })
        })
      })

      this.setData({
        dayCon: dayConCopy
      })

    },

    //显示日历框
    showCalender: function(){
      this.setData({
        isShow: true
      })
    },
    //隐藏日历框
    hideCalender: function(){
      this.setData({
        isShow: false
      })
    },

    //获取选中的数据
    getSelect:function(){
        return this.data.selectObj
    },

    //点击确定
    _okFunc: function(){
      if (Object.keys(this.data.selectObj).length == 0) {
        wx.showToast({ title: '没有选择团期', icon: "none", duration: 1000 })
        return false
      }else{
        this.triggerEvent('okFunc')
      }
    },
    calenderInit:function(){
      this.copyData()
      this.initCalender()
      this.replaceData()
    }

  },

  /*
  * 组件在创建时候，组件的声明周期
  */
  ready: function(){
    // this.copyData()
    // this.initCalender()
    // this.replaceData()
  }
})



