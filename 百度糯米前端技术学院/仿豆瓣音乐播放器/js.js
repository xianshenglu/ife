window.onload = function() {
    var mask = document.getElementsByClassName('mask')[0];
    var form = document.forms[0];
    var content = document.getElementsByClassName('content')[0];
    var musicTable = content.getElementsByClassName('musicTable')[0];
    var table = musicTable.getElementsByClassName('table')[0];
    var tbody = musicTable.getElementsByTagName('tbody')[0];
    var trCollection = tbody.getElementsByTagName('tr');
    var trMusicOn;
    var songInfo = musicTable.getElementsByClassName('songInfo')[0];
    var albumImg = songInfo.getElementsByTagName('img')[0];
    var audioControl = content.getElementsByClassName('audioControl')[0];
    var progressBar = audioControl.getElementsByClassName('progressBar')[0];
    var timeProgress = progressBar.getElementsByClassName('timeProgress')[0];
    var timeProgressControl = timeProgress.getElementsByClassName('progressControl')[0];
    var audio = audioControl.getElementsByTagName('audio')[0];
    var audioTime = progressBar.getElementsByClassName('time')[0];
    var loop = progressBar.getElementsByClassName('loop')[0];
    var volume = progressBar.getElementsByClassName('volume')[0];
    var volProgress = progressBar.getElementsByClassName('volProgress')[0];
    var volProgressControl = volProgress.getElementsByClassName('progressControl')[0];
    var musicControl = progressBar.getElementsByClassName('musicControl')[0];
    var musicData = {
        raw: {},
        display: [{
                m4a: "http://ws.stream.qqmusic.qq.com/498307.m4a?fromtag=46",
                albumname: "遥望",
                singername: "BEYOND",
                songname: "海阔天空",
                albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/0/7/004Z88hS1FiU07.jpg",
                downUrl: "http://dl.stream.qqmusic.qq.com/498307.m4a?vkey=D809D0D4D8347435D3F12BFDE571BB32FD19F3280D39C137F903D684E090FC101B0FFCA006C6297F76FF04D29822DBCBC2E23F13654938C9&guid=2718671044"
            },
            {
                m4a: "http://ws.stream.qqmusic.qq.com/498307.m4a?fromtag=46",
                albumname: "遥望",
                singername: "BEYOND",
                songname: "海阔天空",
                albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/0/7/004Z88hS1FiU07.jpg",
                downUrl: "http://dl.stream.qqmusic.qq.com/498307.m4a?vkey=D809D0D4D8347435D3F12BFDE571BB32FD19F3280D39C137F903D684E090FC101B0FFCA006C6297F76FF04D29822DBCBC2E23F13654938C9&guid=2718671044"
            },
            {
                m4a: "http://ws.stream.qqmusic.qq.com/498307.m4a?fromtag=46",
                albumname: "遥望",
                singername: "BEYOND",
                songname: "海阔天空",
                albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/0/7/004Z88hS1FiU07.jpg",
                downUrl: "http://dl.stream.qqmusic.qq.com/498307.m4a?vkey=D809D0D4D8347435D3F12BFDE571BB32FD19F3280D39C137F903D684E090FC101B0FFCA006C6297F76FF04D29822DBCBC2E23F13654938C9&guid=2718671044"
            },
            {
                m4a: "http://ws.stream.qqmusic.qq.com/498307.m4a?fromtag=46",
                albumname: "遥望",
                singername: "BEYOND",
                songname: "海阔天空",
                albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/0/7/004Z88hS1FiU07.jpg",
                downUrl: "http://dl.stream.qqmusic.qq.com/498307.m4a?vkey=D809D0D4D8347435D3F12BFDE571BB32FD19F3280D39C137F903D684E090FC101B0FFCA006C6297F76FF04D29822DBCBC2E23F13654938C9&guid=2718671044"
            },
            {
                m4a: "http://ws.stream.qqmusic.qq.com/498307.m4a?fromtag=46",
                albumname: "遥望",
                singername: "BEYOND",
                songname: "海阔天空",
                albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/0/7/004Z88hS1FiU07.jpg",
                downUrl: "http://dl.stream.qqmusic.qq.com/498307.m4a?vkey=D809D0D4D8347435D3F12BFDE571BB32FD19F3280D39C137F903D684E090FC101B0FFCA006C6297F76FF04D29822DBCBC2E23F13654938C9&guid=2718671044"
            },
            {
                m4a: "http://ws.stream.qqmusic.qq.com/498307.m4a?fromtag=46",
                albumname: "遥望",
                singername: "BEYOND",
                songname: "海阔天空",
                albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/0/7/004Z88hS1FiU07.jpg",
                downUrl: "http://dl.stream.qqmusic.qq.com/498307.m4a?vkey=D809D0D4D8347435D3F12BFDE571BB32FD19F3280D39C137F903D684E090FC101B0FFCA006C6297F76FF04D29822DBCBC2E23F13654938C9&guid=2718671044"
            },
            {
                m4a: "http://ws.stream.qqmusic.qq.com/498307.m4a?fromtag=46",
                albumname: "遥望",
                singername: "BEYOND",
                songname: "海阔天空",
                albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/0/7/004Z88hS1FiU07.jpg",
                downUrl: "http://dl.stream.qqmusic.qq.com/498307.m4a?vkey=D809D0D4D8347435D3F12BFDE571BB32FD19F3280D39C137F903D684E090FC101B0FFCA006C6297F76FF04D29822DBCBC2E23F13654938C9&guid=2718671044"
            }
        ],
        trans: function() {
            var isData = this.raw.showapi_res_body && this.raw.showapi_res_body.pagebean && this.raw.showapi_res_body.pagebean.contentlist.length;

            if (isData) {
                var contentlist = this.raw.showapi_res_body.pagebean.contentlist;
                this.display = [];
                for (var j = 0; j < contentlist.length; j++) {
                    this.display[j] = {
                        m4a: contentlist[j].m4a,
                        albumname: contentlist[j].albumname,
                        singername: contentlist[j].singername,
                        songname: contentlist[j].songname,
                        albumpic_big: contentlist[j].albumpic_big,
                        downUrl: contentlist[j].downUrl
                    };
                }

            }
        },
        showData: function() {
            tbody.innerHTML = '';
            var displayList = this.display;
            var albumImgUrl = displayList[0].albumpic_big;

            MediaOnLoad('img', albumImgUrl, 'onload', function() {
                albumImg.src = albumImgUrl;
            });

            MediaOnLoad('img', displayList[0].albumpic_big, 'onload', function() {
                mask.style.backgroundImage = 'url(' + musicData.display[0].albumpic_big + ')';
            });

            //添加音乐列表至tbody
            for (var i = 0; i < displayList.length; i++) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<td><a href="' + displayList[i].m4a + '" data-img="' + displayList[i].albumpic_big + '">' + this.display[i].songname + '</a></td>' + '<td>' + this.display[i].singername + '</td>' + '<td>' + this.display[i].albumname + '</td>';
                tbody.appendChild(tr);
            }

            table.scrollTop = 0;

        }
    };

    form.onsubmit = XmlHttp;

    //获取数据
    function XmlHttp(event) {
        var e = event || window.event;
        e.preventDefault();
        var formEle = form.elements;
        var xhr = new XMLHttpRequest();
        var url = form.action;
        var method = form.method;
        var keyword = formEle["keyword"];
        var postBody = '';

        for (var i = 0; i < formEle.length; i++) {
            if (formEle[i].tagName.toLowerCase() === 'input') {
                postBody = postBody + '&' + formEle[i].name + '=' + formEle[i].value;
            }
        }

        postBody = postBody.replace(/&/, '');

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status.toString().match(/200|3\d\d/)) {
                musicData.raw = JSON.parse(xhr.responseText);
                musicData.trans();
                musicData.showData();
            }
        };

        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(postBody);
    };

    //媒体预加载
    function MediaOnLoad(tagName, url, eventType, fn) {
        var ele = document.createElement(tagName);
        ele.src = url;
        ele[eventType] = fn;
    }

    //点击音乐播放，切换音乐
    musicTable.onclick = function(event) {
        var e = event || window.event;
        var tar = e.target || e.srcElement;

        if (tbody.contains(tar) && tar.href) {
            e.preventDefault();
            musicChange(tar.parentNode);
        }

    };

    //切换音乐,需要切换选中状态、专辑、背景、音乐时长
    function musicChange(targetTd) {
        var targetA = targetTd.getElementsByTagName('a')[0];
        var tarImgUrl = targetA.getAttribute("data-img");
        var tarTr = targetTd.parentNode;
        //切换音乐
        audio.src = targetA.href;
        audio.play();        
        //切换选中状态和专辑图片
        for (var i = 0; i < trCollection.length; i++) {
            trCollection[i].style.color = 'rgba(255, 255, 255, 0.5)';
            trCollection[i].id = '';
        }

        tarTr.style.color = 'rgba(255, 255, 255, 1)';
        tarTr.id = 'trMusicOn';
        trMusicOn = document.getElementById('trMusicOn');
        albumImg.src = tarImgUrl;
        //切换背景
        MediaOnLoad('img', tarImgUrl, 'onload', function() {
            mask.style.backgroundImage = 'url(' + tarImgUrl + ')';
        });
        //切换音乐时长
        MediaOnLoad('audio', audio.src, 'oncanplay', function() {
            var audioDurM = Math.floor(audio.duration / 60) < 10 ? '0' + Math.floor(audio.duration / 60).toString() : Math.floor(audio.duration / 60);
            var audioDurS = Math.round(audio.duration % 60) < 10 ? '0' + Math.round(audio.duration % 60).toString() : Math.round(audio.duration % 60);
            var audioDur = audioDurM + ':' + audioDurS;
            audioTime.innerHTML = '00:00/' + audioDur;
        });
        //切换播放按钮
        var startBtn=  musicControl.getElementsByClassName('start');
        if (startBtn) {
        	startBtn[0].className=startBtn[0].className.replace(/^start\s+|\s+start\s+|\s+start$/,' pause ');
        }

    }
    //切换播放进度条-根据当前播放位置变化调整
    audio.ontimeupdate = function(event) {
        //进度条
        var e = event || window.event;
        var tar = e.target || e.srcElement;
        var percent = 100 * tar.currentTime / this.duration;
        timeProgressControl.style.width = percent + '%';
        //时间戳
        var audioPreM = Math.floor(tar.currentTime / 60) < 10 ? '0' + Math.floor(tar.currentTime / 60).toString() : Math.floor(tar.currentTime / 60);
        var audioPreS = Math.round(tar.currentTime % 60) < 10 ? '0' + Math.round(tar.currentTime % 60).toString() : Math.round(tar.currentTime % 60);
        var audioPre = audioPreM + ':' + audioPreS + '/';
        audioTime.innerHTML = audioTime.innerHTML.replace(/[\d:]+?\//, audioPre);
    };
    //切换音量进度条-根据当前音量变化调整
    audio.onvolumechange = function(event) {
        var e = event || window.event;
        var tar = e.target || e.srcElement;
        var percent = 100 * tar.volume;
        volProgressControl.style.width = percent + '%';
    };

    //切换音乐的当前播放位置-根据点击、拖动进度条调整
    var progressPer;

    timeProgress.onmousedown = function(event) {
        var e = event || window.event;
        changeProgress(e, this, function() {
            audio.currentTime = audio.duration * progressPer;
        });
    };
    //切换音乐的当前音量-根据点击、拖动进度条调整
    volProgress.onmousedown = function(event) {
        var e = event || window.event;
        changeProgress(e, this, function() {
            audio.volume = progressPer;
        });

    };
    /**
     * [changeProgress description]
     * @param  {object}   e    事件对象
     * @param  {object}   that 进度条父对象,一般是绑定鼠标按下事件的对象,是那个完整的进度条，不是正在变化的那个
     * @param  {Function} fn   鼠标拖动进度条时，对媒体的操作，如：调整音乐的当前播放位置或当前音量     
     */
    function changeProgress(e, obj, fn) {
        var progressClientLeft = obj.getBoundingClientRect().left;
        var progressWidth = obj.offsetWidth;

        progressDot(e, fn);
        document.onmousemove = function(event) {
            var ev = event || window.event;
            progressDot(ev, fn);
        };

        document.onmouseup = function() {
            document.onmousemove = null;
        };

        function progressDot(eve, fun) {
            progressPer = (eve.clientX - progressClientLeft) / progressWidth;
            if (progressPer <= 0) {
                progressPer = 0;
            } else if (progressPer >= 1) {
                progressPer = 1;
            }
            fun();
        }
    }

    //切换循坏图标
    var LoopBacTop = -18;
    loop.onclick = function(event) {
        if (LoopBacTop >= -36) {
            LoopBacTop = LoopBacTop - 18;
        } else {
            LoopBacTop = -18;
        }
        loop.style.backgroundPosition = '0px ' + LoopBacTop + 'px';
    };

    //切换音乐循环效果-根据循环图标
    audio.onended = function(event) {
        var displayList = this.display;
        var targetTd;
        //顺序播放，没有下一个回到第一个
        if (LoopBacTop === -18) {

            if (trMusicOn.nextElementSibling) {
                targetTd = trMusicOn.nextElementSibling.getElementsByTagName('td')[0];
            } else {
                targetTd = trCollection[0].getElementsByTagName('td')[0];
            }

        } //单曲循环
        else if (LoopBacTop === -36) {
            targetTd = trMusicOn.getElementsByTagName('td')[0];
        } //随机播放
        else if (LoopBacTop === -54) {
            var randomTr = trCollection[Math.round(Math.random() * trCollection.length)];
            targetTd = randomTr.getElementsByTagName('td')[0];
        }

        musicChange(targetTd);
    };

    volume.onmousemove = function() {
        this.style.opacity = 1;
    };
    volume.onmouseout = function() {
        this.style.opacity = 0.8;
    };
    volume.onclick = function() {
        var volProgressVis = window.getComputedStyle(volProgress).visibility;

        if (volProgressVis === 'hidden') {
            volProgress.style.visibility = 'visible';
            volume.onmouseout = null;
        } else {
            volProgress.style.visibility = 'hidden';
            volume.onmouseout = function() {
                this.style.opacity = 0.8;
            };
        }
    };
    //上一曲、下一曲、暂停区域
    musicControl.onclick = function() {
    var e = event || window.event;
    var tar = e.target || e.srcElement;
    var clsNameArr = tar.className.split(/\s+/);
    var isClicked = clsNameArr.indexOf('last') >= 0 || clsNameArr.indexOf('next') >= 0 || clsNameArr.indexOf('start') >= 0||clsNameArr.indexOf('pause') >= 0;

    if (isClicked) {
    	//如果已经选中了音乐了
        if (trMusicOn) {

            if (clsNameArr.indexOf('last') >= 0) {
            	//第一首的上一首仍为第一首
            	if (trMusicOn.previousElementSibling) {
            		musicChange(trMusicOn.previousElementSibling.children[0]);
            	}else {
            		musicChange(trMusicOn.children[0]);
            	}

            } else if (clsNameArr.indexOf('next') >= 0) {
            	//最后一首的下一首仍为最后一首
            	if (trMusicOn.nextElementSibling) {
            		musicChange(trMusicOn.nextElementSibling.children[0]);
            	}else {
            		musicChange(trMusicOn.children[0]);
            	}

            } else if (clsNameArr.indexOf('pause') >= 0) {
            	audio.pause();
            	tar.className=tar.className.replace(/^pause\s+|\s+pause\s+|\s+pause$/,' start ');
            } else if (clsNameArr.indexOf('start') >= 0) {
            	audio.play();
            	tar.className=tar.className.replace(/^start\s+|\s+start\s+|\s+start$/,' pause ');
            }
            //如果根本没有音乐在播放，也就是都没有点击过音乐，从第一首开始
        }else {
        	musicChange(trCollection[0].children[0]);          	
        	tar.className=tar.className.replace(/^start\s+|\s+start\s+|\s+start$/,' pause ');
        }
    }

};

    //初始化
    musicData.showData();

};