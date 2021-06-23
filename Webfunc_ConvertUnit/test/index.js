vds.config({
    debug:true,
    import:["vds.mock.*"]
}).ready(function(){
    vds.mock.init("../manifest.json").then(function(mock){
        var units = ["b","B","KB","MB","GB","TB","PB","EB","ZB","YB","BB","NB","DB","CB"];
        for(var i=0;i<40;i++){
            mock.get("ConvertUnit").then(function(functionMock){
                functionMock.mockInput(1,units[parseInt((Math.random() * 10000) % units.length)]);
                functionMock.mockInput(2,units[parseInt((Math.random() * 10000) % units.length)]);
                var inputs = functionMock.getInputs();
                var args = [];
                for(var i in inputs){
                    if(inputs.hasOwnProperty(i)){
                        args[i] = inputs[i];
                    }
                }
                var html = '';
                for(var i=0,l=args.length;i<l;i++){
                    html += '<span>入参';
                    html += i;
                    html += '：</span><span style="display:inline-block;width:20%;overflow:auto;">';
                    html += args[i];
                    html += '</span>';
                }
                try{
                    var result = functionMock.exec();
                    var div = document.createElement("div");
                    div.style.border = "2px solid #f5f5f5";
                    html += '<span>结果：</span><span style="display:inline-block;width:20%;overflow:auto;">';
                    html += result;
                    html += '</span>';
                    div.innerHTML = html;
                    document.body.appendChild(div);
                }catch(e){
                    var div = document.createElement("div");
                    div.style.color = "red";
                    div.style.border = "2px solid #f5f5f5";
                    html += '<span>异常原因：</span><span style="display:inline-block;width:20%;overflow:auto;">';
                    html += e.message;
                    html += '</span>';
                    div.innerHTML = html;
                    document.body.appendChild(div);
                }
            });
        }
    });
});