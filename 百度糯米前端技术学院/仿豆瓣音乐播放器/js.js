window.onload = function() {
    var mask = document.getElementsByClassName('mask')[0],
        form = document.forms[0],
        inputKeyword = form.elements["keyword"],
        btnSubmit = form.getElementsByTagName('button')[0],
        content = document.getElementsByClassName('content')[0],
        musicTable = content.getElementsByClassName('musicTable')[0],
        tableDiv = musicTable.getElementsByClassName('tableDiv')[0],
        tableDivHei = tableDiv.offsetHeight,
        table = tableDiv.getElementsByTagName('table')[0],
        tableHei = table.offsetHeight, //这个地方tableHei提前声明了就是0，无法理解,所以不能用
        tableScroll = tableDiv.getElementsByClassName('scroll')[0],
        tableScrollProgress = tableScroll.getElementsByClassName('progressControl')[0],
        tbody = musicTable.getElementsByTagName('tbody')[0],
        trCollection = tbody.getElementsByTagName('tr'),
        trMusicOn,
        songInfo = musicTable.getElementsByClassName('songInfo')[0],
        albumImg = songInfo.getElementsByTagName('img')[0],
        audioControl = content.getElementsByClassName('audioControl')[0],
        progressBar = audioControl.getElementsByClassName('progressBar')[0],
        timeProgress = progressBar.getElementsByClassName('timeProgress')[0],
        timeProgressControl = timeProgress.getElementsByClassName('progressControl')[0],
        audio = audioControl.getElementsByTagName('audio')[0],
        audioTime = progressBar.getElementsByClassName('time')[0],
        loop = progressBar.getElementsByClassName('loop')[0],
        volume = progressBar.getElementsByClassName('volume')[0],
        volProgress = progressBar.getElementsByClassName('volProgress')[0],
        volProgressControl = volProgress.getElementsByClassName('progressControl')[0],
        musicControl = progressBar.getElementsByClassName('musicControl')[0],
        musicData = {
            raw: {},
            display: [{
                    m4a: "http://ws.stream.qqmusic.qq.com/1194015.m4a?fromtag=46",
                    albumname: "iTunes Essentials",
                    singername: "Lady Gaga",
                    songname: "Bad Romance",
                    albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/b/7/002EUxmL0GK0b7.jpg",
                    downUrl: "http://dl.stream.qqmusic.qq.com/1194015.m4a?vkey=1830B62A242503CC017B3EBC2B93AFC058F279FDC57ACD42ECDA9012EB644425FC24B3322F9445B4202B9B47DBA6C50A8D8FA5AB5334FFF9&guid=2718671044"
                },
                {
                    m4a: "http://ws.stream.qqmusic.qq.com/101800569.m4a?fromtag=46",
                    albumname: "Fade",
                    singername: "Alan Walker",
                    songname: "Fade",
                    albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/I/3/00472CVU4VP4I3.jpg",
                    downUrl: "http://dl.stream.qqmusic.qq.com/101800569.m4a?vkey=E0630A6DCFDD284EC0AA849CBCA2E1680DADC9FEB1525E56DFA2AC9238AEC8E77ED3833383CAB5F95322633C5A8E156FF96C1D672BE206B6&guid=2718671044"
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
            initialize: function() {
                tbody.innerHTML = '';
                var displayList = this.display,
                    albumImgUrl = displayList[0].albumpic_big;

                MediaOnLoad('img', albumImgUrl, 'onload', function() {
                    albumImg.src = albumImgUrl;
                });

                MediaOnLoad('img', displayList[0].albumpic_big, 'onload', function() {
                    mask.style.backgroundImage = 'url(' + musicData.display[0].albumpic_big + ')';
                });

                //添加音乐列表至tbody
                var fragment=document.createDocumentFragment();
                for (var i = 0; i < displayList.length; i++) {
                    var tr = document.createElement('tr');
                    tr.innerHTML = '<td><a href="' + displayList[i].m4a + '" data-img="' + displayList[i].albumpic_big + '">' + this.display[i].songname + '</a></td>' + '<td>' + this.display[i].singername + '</td>' + '<td>' + this.display[i].albumname + '</td>';
                	fragment.appendChild(tr);
                }
                    tbody.appendChild(fragment);

                tableDiv.scrollTop = 0;

            }
        };

    form.onsubmit = function(event) {
        var e = event || window.event;
        XmlHttp(e);
    };

    //发送异步请求，获取数据
    function XmlHttp(e) {
        e.preventDefault();
        var formEle = form.elements,
            xhr = new XMLHttpRequest(),
            url = form.action,
            method = form.method,
            keyword = formEle["keyword"],
            postBody = '';

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
                musicData.initialize();
                initializeScroll(table.offsetHeight, tableDivHei);
            }
        };

        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(postBody);
    }

    /**
     * 媒体预加载,等下载结束再执行回调,减少中间空档异常情况
     * @param {String}   tagName   预加载的标签
     * @param {String}   url       预加载的url
     * @param {String}   eventType 加载完成触发的事件类型，不一定是onload
     * @param {Function} fn        加载完成后需要执行的函数
     */
    function MediaOnLoad(tagName, url, eventType, fn) {
        var ele = document.createElement(tagName);
        ele.src = url;
        ele[eventType] = fn;
    }

    //点击音乐播放，切换音乐
    musicTable.onclick = function(event) {
        var e = event || window.event,
            tar = e.target || e.srcElement;

        if (tbody.contains(tar) && tar.href) {
            e.preventDefault();
            musicChange(tar.parentNode);
        }

    };

    /**
     * 切换音乐,需要切换选中状态、专辑、背景、音乐时长、播放按钮
     * @param  {Object} targetTd 音乐所在行的第一个td元素     
     */
    function musicChange(targetTd) {
        var targetA = targetTd.getElementsByTagName('a')[0],
            tarImgUrl = targetA.getAttribute("data-img"),
            tarTr = targetTd.parentNode;
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
            var audioDurM = Math.floor(audio.duration / 60) < 10 ? '0' + Math.floor(audio.duration / 60).toString() : Math.floor(audio.duration / 60),
                audioDurS = Math.round(audio.duration % 60) < 10 ? '0' + Math.round(audio.duration % 60).toString() : Math.round(audio.duration % 60),
                audioDur = audioDurM + ':' + audioDurS;
            audioTime.innerHTML = '00:00/' + audioDur;
        });
        //切换播放按钮
        var startBtn = musicControl.getElementsByClassName('start');

        if (startBtn.length) {
            var clsNameArr = startBtn[0].className.split(/\s+/);
            startBtn[0].className = clsNameUpdate(startBtn[0].className, 'start', 'pause');
        }

    }

    /**
     * 更新类名
     * @param  {Object} objClsName	修改前类名
     * @param  {String} clsNameToDelete 要删的类名
     * @param  {String} clsNameToAppend 要新加的类名
     * @return {String}                 修改后的类名
     */
    function clsNameUpdate(objClsName, clsNameToDelete, clsNameToAppend) {
        if (objClsName) {
            var clsNameArr = objClsName.split(/\s+/);
            if (clsNameArr.indexOf(clsNameToDelete) >= 0) {
                clsNameArr.splice(clsNameArr.indexOf(clsNameToDelete), 1, clsNameToAppend);
                return clsNameArr.join(' ');
            } else {
                clsNameArr.push(clsNameToAppend);
                return clsNameArr.join(' ');
            }
        } else {
            return clsNameToAppend;
        }
    }
    //切换播放进度条-根据当前播放位置变化调整
    audio.ontimeupdate = function(event) {
        //进度条
        var e = event || window.event,
            tar = e.target || e.srcElement,
            percent = 100 * tar.currentTime / this.duration;
        timeProgressControl.style.width = percent + '%';
        //时间戳
        var audioPreM = Math.floor(tar.currentTime / 60) < 10 ? '0' + Math.floor(tar.currentTime / 60).toString() : Math.floor(tar.currentTime / 60),
            audioPreS = Math.round(tar.currentTime % 60) < 10 ? '0' + Math.round(tar.currentTime % 60).toString() : Math.round(tar.currentTime % 60),
            audioPre = audioPreM + ':' + audioPreS + '/';
        audioTime.innerHTML = audioTime.innerHTML.replace(/[\d:]+?\//, audioPre);
    };
    //切换音量进度条-根据当前音量变化调整
    audio.onvolumechange = function(event) {
        var e = event || window.event,
            tar = e.target || e.srcElement,
            percent = 100 * tar.volume;
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
     * 切换进度条-根据点击、拖动切换进度条，并执行回调函数
     * @param  {Object}   e    事件对象
     * @param  {Object}   that 进度条父对象,一般是绑定鼠标按下事件的对象,是那个完整的进度条，不是正在变化的那个
     * @param  {Function} fn   鼠标拖动进度条时，执行的回调函数，如：调整音乐的当前播放位置或当前音量     
     */
    function changeProgress(e, obj, fn) {
        var progressClientLeft = obj.getBoundingClientRect().left,
            progressWidth = obj.offsetWidth;

        progressDot(e, fn);
        document.onmousemove = function(event) {
            var ev = event || window.event;
            progressDot(ev, fn);
        };

        document.onmouseup = function() {
            document.onmousemove = null;
        };
        /**
         * 根据事件对象，执行父函数传递下来的回调函数
         * @param  {Object} eve 事件对象，一般为鼠标按下事件或鼠标移动事件的对象
         * @param  {Object} fun 事件发生时执行的回调         
         */
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
    loop.onclick = function(event) {
        var loopClsName = loop.className.split(/\s+/);

        if (loopClsName.indexOf('default-loop') >= 0) {
            loop.className = clsNameUpdate(loop.className, 'default-loop', 'single-loop');
        } else if (loopClsName.indexOf('single-loop') >= 0) {
            loop.className = clsNameUpdate(loop.className, 'single-loop', 'random-loop');
        } else if (loopClsName.indexOf('random-loop') >= 0) {
            loop.className = clsNameUpdate(loop.className, 'random-loop', 'default-loop');
        }

    };

    //切换音乐循环效果-根据循环图标
    audio.onended = function(event) {
        var displayList = this.display,
            targetTd;
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
    //滑入滑出需要点亮
    //点击进度条显示后，滑出也需要点亮
    //点击进度条消失后，不滑出依旧亮，滑出不亮
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
    musicControl.onclick = function(event) {
        var e = event || window.event,
            tar = e.target || e.srcElement,
            clsNameArr = tar.className.split(/\s+/),
            isClicked = clsNameArr.indexOf('last') >= 0 || clsNameArr.indexOf('next') >= 0 || clsNameArr.indexOf('start') >= 0 || clsNameArr.indexOf('pause') >= 0;

        if (isClicked) {
            //如果已经选中了音乐了
            if (trMusicOn) {

                if (clsNameArr.indexOf('last') >= 0) {
                    //第一首的上一首仍为第一首
                    if (trMusicOn.previousElementSibling) {
                        musicChange(trMusicOn.previousElementSibling.children[0]);
                    } else {
                        musicChange(trMusicOn.children[0]);
                    }

                } else if (clsNameArr.indexOf('next') >= 0) {
                    //最后一首的下一首仍为最后一首
                    if (trMusicOn.nextElementSibling) {
                        musicChange(trMusicOn.nextElementSibling.children[0]);
                    } else {
                        musicChange(trMusicOn.children[0]);
                    }

                } else if (clsNameArr.indexOf('pause') >= 0) {
                    audio.pause();
                    tar.className = clsNameUpdate(tar.className, 'pause', 'start');
                } else if (clsNameArr.indexOf('start') >= 0) {
                    audio.play();
                    tar.className = clsNameUpdate(tar.className, 'start', 'pause');
                }
                //如果根本没有音乐在播放，也就是都没有点击过音乐，从第一首开始
            } else {
                musicChange(trCollection[0].children[0]);
                tar.className = tar.className.replace(/^start\s+|\s+start\s+|\s+start$/, ' pause ');
            }
        }
    };

    //滚动时，调整滚动条高度，滚动条的高度等于，表格每滚动了%(table的%)，滚动条就滚动%(tableDiv的%)
    tableDiv.onscroll = function(event) {
        var e = event || window.event,
            tar = e.target || e.srcElement,
            tableScrollProgressTopNeed = tar.scrollTop + tableDivHei * (tar.scrollTop / table.offsetHeight);
        tableScrollProgress.style.top = tableScrollProgressTopNeed + 'px';
    };

    /**
     * 初始化滚动条长度
     * @param  {Number} tableHei 音乐表格的实际高度,每发送一次请求更新了列表后都要处理     
     */
    function initializeScroll(tableHei, tableDivHei) {
        tableScroll.style.height = tableHei + 'px';
        if (tableDivHei >= tableHei) {
            tableScrollProgress.style.height = '100%';
        } else {
            tableScrollProgress.style.height = tableDivHei * (tableDivHei / tableHei) + 'px';
        }
    }

    //初始化
    document.forms[0].elements["keyword"].value = 'bad romance';
    btnSubmit.click();
    document.forms[0].elements["keyword"].value = '';
    musicData.initialize();
    initializeScroll(table.offsetHeight, tableDivHei);
    btnSubmit.style.width = btnSubmit.offsetHeight + 'px';
    inputKeyword.style.width = form.offsetWidth - btnSubmit.offsetWidth + 'px';
};