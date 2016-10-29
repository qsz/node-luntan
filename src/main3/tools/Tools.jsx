
const Tool = {}

Tool.GetDateDiff = dateBegin => {
    var time;
    var date = new Date(dateBegin);
    var now = new Date();
    var off = (now.getTime() - date.getTime());
    var dayDiff = Math.floor(off/ (24 * 3600 * 1000));

    if(dayDiff > 0)
    {
        time = dayDiff+'天前';
    }
    else {
        var hourleft = Math.floor( off / (60 * 60 * 1000));
        if( hourleft>0){
            time = hourleft+'小时前';
        };
        if(hourleft==0){
            var minuteleft = Math.floor( off / ( 60 * 1000));
            if( minuteleft>0){
                time = minuteleft+'分钟前'
            };
            if(minuteleft==0) {
                time = Math.floor( off / (1000))+'秒前'
                if(time == 0){
                    time = '刚刚'
                }
            }
        }
    }
    return time
}

export default Tool
    
