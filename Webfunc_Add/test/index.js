vds.config({
    debug:true,
    import:["vds.mock.*"]
}).ready(function(){
    vds.mock.init("../manifest.json").then(function(mock){
        for(var i=0;i<40;i++){
            mock.get("Add").then(function(functionMock){
                var inputs = functionMock.getInputs();
                var args = [];
                for(var i in inputs){
                    if(inputs.hasOwnProperty(i)){
                        args[i] = inputs[i];
                    }
                }
                var html = '';
                for(var i=0,l=args.length;i<l;i++){
                    html += `<span>入参${i}：</span><span style="display:inline-block;width:200px;">${args[i]}</span>`;
                }
                try{
                    var result = functionMock.exec();
                    var div = document.createElement("div");
                    div.style.border = "2px solid #f5f5f5"
                    div.innerHTML = html + `<span>结果：</span><span style="display:inline-block;width:200px;">${result}</span>`;
                    document.body.appendChild(div);
                }catch(e){
                    var div = document.createElement("div");
                    div.style.color = "red";
                    div.style.border = "2px solid #f5f5f5"
                    div.innerHTML = html + `<span>异常原因：</span><span style="display:inline-block;width:200px;">${e.message}</span>`;
                    document.body.appendChild(div);
                }
            });
        }
    });
});