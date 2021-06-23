vds.config({
    debug:true,
    import:["vds.mock.*","vds.ds.*"]
}).ready(function(){
    vds.mock.init("../manifest.json").then(function(mock){
	    let datasource = vds.ds.mock([]);
        vds.ds.register("entity",datasource);
        for(var i=0;i<1;i++){
            mock.get("VarToEntity").then(function(functionMock){
                functionMock.mockInput(0,`{"entity":{"metadata":{"model":[{"datasourceName":"freeDB_d657802221d81021d6ef9b543e90f9bb","fields":[{"code":"id","name":"SAC","type":"integer","precision":0,"defaultValue":null},{"code":"sum","name":"SAC","type":"number","defaultValue":null},{"code":"sum_cn","name":"SAC","type":"char","defaultValue":null}]}]},"datas":{"values":[{"id":1,"sum":3723.1265143119986,"sum_cn":""},{"id":2,"sum":3461.5366218221457,"sum_cn":""},{"id":3,"sum":1740.642987954193,"sum_cn":""}],"recordCount":3}}}`)
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
                    result =vds.ds.lookup("entity").getAllRecords().size();
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