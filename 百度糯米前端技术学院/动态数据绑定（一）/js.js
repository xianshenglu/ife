var app2 = {
    name: 'you',
    age: 24
};

function Observer(object) {
    var o = {
        data: object
    };
    for (var key in o.data) {
        defPro(key, o.data[key]);
    }

    function defPro(argu, val) {

        Object.defineProperty(o.data, argu, {
            get: function() {
                console.log('你访问了 ' + argu);
                return val;
            },
            set: function(value) {
                //这个参数可以获取设置的新值
                console.log('你设置了 ' + argu + ',新的值为 ' + value);
                //更新值
                Object.defineProperty(o.data, argu, {
                    get: function() {
                        console.log('你访问了 ' + argu);
                        return value;
                    }
                });
            }
        });
    }

    return o;
}
app2 = new Observer(app2);
app2.data.name = 24;
console.log(app2.data.name);