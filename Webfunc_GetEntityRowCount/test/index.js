vds.config({
    debug:true,
    import:["vds.mock.*","vds.ds.*"]
}).ready(function(){
    vds.mock.init("../manifest.json").then(function(mock){
        let datasource = vds.ds.mock([{
            "id":"1",
            "sum":Math.random()*10000,
            "sum_cn":""
        },{
            "id":"2",
            "sum":Math.random()*10000,
            "sum_cn":""
        },{
            "id":"3",
            "sum":Math.random()*10000,
            "sum_cn":""
        }]);
        vds.ds.register("entity",datasource);
        let datasource2 = vds.ds.mock([{
            "id":"1",
            "sum":Math.random()*10000,
            "sum_cn":""
        },{
            "id":"2",
            "sum":Math.random()*10000,
            "sum_cn":""
        }]);
        vds.ds.register("entity",datasource);
        vds.ds.register("entity2",datasource2);
        window._testDV = true;
        for(var i=0;i<2;i++){
            mock.get("GetEntityRowCount").then(function(functionMock){
				if(window._testDV){
                    functionMock.mockInput(0,"entity");
                    functionMock.mockInput(1,null);
                    window._testDV = false;
                }else{
                    functionMock.mockInput(0,"entity2");
                    functionMock.mockInput(1,null);
                }
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
                    html += '：</span><span style="display:inline-block;width:200px;">';
                    html += args[i];
                    html += '</span>';
                }
                try{
                    var result = functionMock.exec();
                    var div = document.createElement("div");
                    div.style.border = "2px solid #f5f5f5";
                    html += '<span>结果：</span><span style="display:inline-block;width:200px;">';
                    html += result;
                    html += '</span>';
                    div.innerHTML = html;
                    document.body.appendChild(div);
                }catch(e){
                    var div = document.createElement("div");
                    div.style.color = "red";
                    div.style.border = "2px solid #f5f5f5";
                    html += '<span>异常原因：</span><span style="display:inline-block;width:200px;">';
                    html += e.message;
                    html += '</span>';
                    div.innerHTML = html;
                    document.body.appendChild(div);
                }
            });
        }
    });
});