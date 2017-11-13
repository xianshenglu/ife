window.onload = function() {
    var mask = $(document).find('.mask')[0],
        form = document.forms[0],
        inputKeyword = form.elements["keyword"],
        btnSubmit = $(form).find('button')[0],
        content = $(document).find('.content')[0],
        musicTable = $(content).find('.musicTable')[0],
        tableDiv = $(musicTable).find('.tableDiv')[0],
        tableDivHei = tableDiv.offsetHeight,
        table = $(tableDiv).find('table')[0],
        tableHei = table.offsetHeight, //这个地方tableHei提前声明了就是0，无法理解,所以不能用
        tableScroll = $(tableDiv).find('.scroll')[0],
        tableScrollProgress = $(tableScroll).find('.progressControl')[0],
        tbody = $(musicTable).find('tbody')[0],
        trCollection = tbody.getElementsByTagName('tr'),
        trMusicOn,
        songInfo = $(musicTable).find('.songInfo')[0],
        albumImg = $(songInfo).find('img')[0],
        audioControl = $(content).find('.audioControl')[0],
        progressBar = $(audioControl).find('.progressBar')[0],
        timeProgress = $(progressBar).find('.timeProgress')[0],
        timeProgressControl = $(timeProgress).find('.progressControl')[0],
        audio = $(audioControl).find('audio')[0],
        audioTime = $(progressBar).find('.time')[0],
        loop = $(progressBar).find('.loop')[0],
        volume = $(progressBar).find('.volume')[0],
        volProgress = $(progressBar).find('.volProgress')[0],
        volProgressControl = $(volProgress).find('.progressControl')[0],
        musicControl = $(progressBar).find('.musicControl')[0],
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
                var that = this; //跟jquery each中的this会重合，所以用that
                if (isData) {
                    var contentlist = that.raw.showapi_res_body.pagebean.contentlist;
                    that.display = [];
                    $.each(contentlist, function(index, obj) {
                        that.display[index] = {
                            m4a: obj.m4a,
                            albumname: obj.albumname,
                            singername: obj.singername,
                            songname: obj.songname,
                            albumpic_big: obj.albumpic_big,
                            downUrl: obj.downUrl
                        };
                    });

                }
            },
            initialize: function() {
                $(tbody).html('');
                var displayList = this.display,
                    albumImgUrl = displayList[0].albumpic_big;

                MediaOnLoad('img', albumImgUrl, 'onload', function() {
                    albumImg.src = albumImgUrl;
                });

                MediaOnLoad('img', displayList[0].albumpic_big, 'onload', function() {
                    $(mask).css('background-image', 'url(' + musicData.display[0].albumpic_big + ')');
                });

                //添加音乐列表至tbody               
                var fragment = '';
                $.each(displayList, function(index, obj) {
                    var tr = '<tr><td><a href="' + obj.m4a + '" data-img="' + obj.albumpic_big + '">' + obj.songname + '</a></td>' + '<td>' + obj.singername + '</td>' + '<td>' + obj.albumname + '</td></tr>';
                    fragment = fragment + tr;
                });
                $(tbody).append(fragment);

                $(tableDiv).scrollTop(0);

            }
        };

    form.onsubmit = function(event) {
        var e = event || window.event;
        XmlHttp(e);
    };

    //发送异步请求，获取数据
    function XmlHttp(e) {
        e.preventDefault();
        var formEle = $(form).find('input'),
            url = form.action,
            method = form.method,
            postBody = '';

        $.each(formEle, function(index, obj) {
            postBody = postBody + '&' + obj.name + '=' + obj.value;
        });

        postBody = postBody.replace(/&/, '');

        $.ajax({
            type: method,
            url: url,
            data: postBody,
            success: function(data) {
                musicData.raw = data;
                musicData.trans();
                musicData.initialize();
                initializeScroll(table.offsetHeight, tableDivHei);
            },
            dataType: 'json'
        });
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
    function musicChange(targetTd) { //bug!!!
        /*console.log(targetTd);*/
        var targetA = $(targetTd).find('a')[0],
            tarImgUrl = targetA.getAttribute("data-img"),
            tarTr = targetTd.parentNode;
        //切换音乐
        audio.src = targetA.href;
        audio.play();
        //切换选中状态和专辑图片
        $.each(trCollection, function(index, obj) {
            obj.style.color = 'rgba(255, 255, 255, 0.5)';
            obj.id = '';
        });

        tarTr.style.color = 'rgba(255, 255, 255, 1)';
        tarTr.id = 'trMusicOn';
        trMusicOn = $('#trMusicOn')[0];
        albumImg.src = tarImgUrl;
        //切换背景
        MediaOnLoad('img', tarImgUrl, 'onload', function() {
            $(mask).css('backgroundImage', 'url(' + tarImgUrl + ')');
        });
        //切换音乐时长
        MediaOnLoad('audio', audio.src, 'oncanplay', function() {
            var audioDurM = Math.floor(audio.duration / 60) < 10 ? '0' + Math.floor(audio.duration / 60).toString() : Math.floor(audio.duration / 60),
                audioDurS = Math.round(audio.duration % 60) < 10 ? '0' + Math.round(audio.duration % 60).toString() : Math.round(audio.duration % 60),
                audioDur = audioDurM + ':' + audioDurS;
            audioTime.innerHTML = '00:00/' + audioDur;
        });
        //切换播放按钮
        var startBtn = $(musicControl).find('.start');

        if (startBtn.length) {
            $(startBtn[0]).removeClass('start');
            $(startBtn[0]).addClass('pause');
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
        var progressClientLeft = $(obj).offset().left,
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
            $(loop).removeClass('default-loop');
            $(loop).addClass('single-loop');
        } else if (loopClsName.indexOf('single-loop') >= 0) {
            $(loop).removeClass('single-loop');
            $(loop).addClass('random-loop');
        } else if (loopClsName.indexOf('random-loop') >= 0) {
            $(loop).removeClass('random-loop');
            $(loop).addClass('default-loop');
        }

    };

    //切换音乐循环效果-根据循环图标
    audio.onended = function(event) {
        var loopClsName = loop.className.split(/\s+/),
            targetTd;
        //顺序播放，没有下一个回到第一个
        if (loopClsName.indexOf('default-loop') >= 0) {

            if ($(trMusicOn).next().length) {
                targetTd = $(trMusicOn).next().find('td')[0];
            } else {
                targetTd = $(trCollection[0]).find('td')[0];
            }

        } //单曲循环
        else if (loopClsName.indexOf('single-loop') >= 0) {
            targetTd = $(trMusicOn).find('td')[0];
        } //随机播放
        else if (loopClsName.indexOf('random-loop') >= 0) {
            var randomTr = trCollection[Math.round(Math.random() * trCollection.length)];
            targetTd = $(randomTr).find('td')[0];
        }

        musicChange(targetTd);
    };

    //滑入滑出需要点亮
    //点击进度条显示后，滑出也需要点亮
    //点击进度条消失后，不滑出依旧亮，滑出不亮
    volume.onmousemove = function() {
        $(this).css('opacity', 1);
    };
    volume.onmouseout = function() {
        $(this).css('opacity', 0.8);
    };
    volume.onclick = function() {
        var volProgressVis = window.getComputedStyle(volProgress).visibility;

        if (volProgressVis === 'hidden') {
            volProgress.style.visibility = 'visible';
            volume.onmouseout = null;
        } else {
            volProgress.style.visibility = 'hidden';
            volume.onmouseout = function() {
                $(this).css('opacity', 0.8);
            };
        }
    };

    //上一曲、下一曲、暂停区域
    musicControl.onclick = function(event) {
        var e = event || window.event,
            tar = e.target || e.srcElement,
            isClicked = $(tar).hasClass('last') || $(tar).hasClass('next') || $(tar).hasClass('start') || $(tar).hasClass('pause');
        if (isClicked) {
            //如果已经选中了音乐了
            if (trMusicOn) {

                if ($(tar).hasClass('last')) {
                    //第一首的上一首仍为第一首
                    if ($(trMusicOn).prev().length) {
                        musicChange($(trMusicOn).prev()[0].children[0]);
                    } else {
                        musicChange(trMusicOn.children[0]);
                    }

                } else if ($(tar).hasClass('next')) {
                    //最后一首的下一首仍为最后一首
                    if ($(trMusicOn).next().length) {
                        musicChange($(trMusicOn).next()[0].children[0]);
                    } else {
                        musicChange(trMusicOn.children[0]);
                    }

                } else if ($(tar).hasClass('pause')) {
                    audio.pause();
                    $(tar).removeClass('pause');
                    $(tar).addClass('start');
                } else if ($(tar).hasClass('start')) {
                    audio.play();
                    $(tar).removeClass('start');
                    $(tar).addClass('pause');
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
            tableScrollProgressTopNeed = $(tar).scrollTop() + tableDivHei * ($(tar).scrollTop() / table.offsetHeight);
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
    inputKeyword.value = 'bad romance';
    btnSubmit.click();
    inputKeyword.value = '';
    musicData.initialize();
    initializeScroll(table.offsetHeight, tableDivHei);
    btnSubmit.style.width = btnSubmit.offsetHeight + 'px';
    inputKeyword.style.width = form.offsetWidth - btnSubmit.offsetWidth + 'px';
};