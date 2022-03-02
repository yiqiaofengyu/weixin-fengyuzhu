//获取app.js对象
var app = getApp();
 
Page({
  data: {
	arch: {},//检测结果
	img: '',  //选择的图片
	showResult: false //检测是由有结果
  },
  onLoad: function (options) {
	//console.log('获取全局变量数据：' + app.globalData.access_token);
  },
  //选择图片事件
  chooseImage(){
	  var that = this;
	  wx.chooseImage({
	    count: 1,
	    sizeType: ['original', 'compressed'],
	    sourceType: ['album', 'camera'],
	    success (res) {
	      const tempPath = res.tempFilePaths[0];//获取选择的图片的地址
		  //准备好了access_token和图片后，
		  //图片的base64值的处理
		  var base64 = wx.getFileSystemManager().readFileSync(tempPath,'base64');
		  //提示
		  wx.showLoading({
			  title: '建筑识别中...',
			  mask: true
		  });
		  //开始请求检测接口
		  wx.request({
		    url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/classification/arch-class?access_token='+app.globalData.access_token,
		    data: {
		    image: base64,
			  image_type: 'BASE64',
			
        },
			method: 'POST',
		    header: {'content-type': 'application/json'},
		    //header: {'content-type': 'application/x-www-form-urlencoded'},
        success (res) {
				console.log(res);
				if(res.statusCode == 200 ){ //检测结果正确
					//将选择的图片回显到页面
					that.setData({img: tempPath});
          //建筑要传入键值对
					//取出检测的结果进行页面显示
					var arch = res.data.results;
          console.log(arch);
					that.setData({arch: arch,showResult: true});
					//隐藏加载窗口
					wx.hideLoading();
				
				}else{
					wx.showToast({
						title: '检测失败'+res.data.error_msg,
						duration: 5000
					});
				}
		    }
		  })
	    }
	  })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})
