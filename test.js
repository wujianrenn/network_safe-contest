function func() {
    var n = 1;
    add = function () { n += 1 }
    function innerFunc() {
        alert(n);
    }
    return innerFunc;
    var result = func(); result();
    add();
    result();
}



for (var i = 5; i < 0; i--){
    setTimeout(function () {
        console.log(i)
    },1000*i)
}


