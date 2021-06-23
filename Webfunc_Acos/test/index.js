vds.config({
    debug:true,
    import:["vds.mock.*"]
}).ready(function(){
    vds.mock.init("../manifest.json").then(function(mock){
        for(var i=0;i<40;i++){
            mock.get("Acos").then(function(functionMock){
                try{
                    var result = functionMock.exec();
                    var div = document.createElement("div");
                    div.innerHTML = `<span>入参：</span><span style="display:inline-block;width:200px;">${functionMock.getInput(0)}</span><span>结果：</span><span>${result}</span>`;
                    document.body.appendChild(div);
                }catch(e){
                    var div = document.createElement("div");
                    div.style.color = "red";
                    div.innerHTML = `<span>入参：</span><span style="display:inline-block;width:200px;">${functionMock.getInput(0)}</span><span>异常原因：</span><span>${e.message}</span>`;
                    document.body.appendChild(div);
                }
            });
        }
    });
});