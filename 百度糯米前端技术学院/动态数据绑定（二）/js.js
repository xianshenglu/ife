var app2 = {
    name: 'you',
    age: 24,
    info: {
        sex: 'boy',
        hobby: 'ml',
        id: '110',
        country: {
            a: '',
            b: '',
            c: ''
        }
    }
};

function Observer(object) {
    var o = {
        data: object
    };

    forInPro(o.data);

    o.$watch = function(pro, fn) {
        return watch(pro, fn);

        function watch(pro, fn) {
            Object.defineProperty(o.data, pro, {
                set: function(newValue) {

                    if (o.data[pro] != newValue) {
                        fn(newValue);
                    }
                    //更新值
                    Object.defineProperty(o.data, pro, {
                        get: function() {
                            console.log('你访问了新get ' + pro);
                            return newValue;
                        }
                    });
                }
            });
        }

    };

    function forInPro(oData) {

        for (var key in oData) {
            Object.defineProperty(oData, key, {
                get: function() {
                    /* console.log('你访问了新get ' + pro);
                     return newValue;*/
                }
            });
            defPro(oData, key, oData[key]);
        }
    }

    function defPro(oData, pro, val) {

        if (typeof oData[pro] === 'object') {
            forInPro(oData[pro]);
        }

        setGetMod(oData, pro, val);
    }

    function setGetMod(obj, pro, val) {
        Object.defineProperty(obj, pro, {
            //初始化，值不变时一直如此，值变了，就会用下面的get
            get: function() {
                console.log('你访问了 ' + pro);
                return val;
            },
            set: function(newValue) {
                //这个参数可以获取设置的值
                console.log('你设置了 ' + pro + ',新的值为 ' + newValue);
                //更新值，将上一次的值更新为这次的，同时覆盖上面的get
                Object.defineProperty(obj, pro, {
                    get: function() {
                        console.log('你访问了新get ' + pro);
                        return newValue;
                    }
                });
                if (typeof newValue === 'object') {
                    console.log('hello'+o.data.age.real);
                    forInPro(o.data);
                }
            }
        });
    }

    return o;
}
app2 = new Observer(app2);
app2.$watch('age', function(age) {
    console.log('我的年纪变了，现在已经是：' + age + '岁了');
});
app2.data.age = {
    spoken: 25,
    real: 24
};
/*app2.data.age.spoken;*/