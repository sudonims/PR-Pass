document.addEventListener('DOMContentLoaded',function(){
    var submit=document.getElementById('submit');
    var lucky=document.getElementById('lucky');
    var pass=document.getElementById('password');
    var gen_pass=document.getElementById('gen-pass');
    var edit=document.getElementById('edit');
    var body=document.getElementById('body');

    submit.addEventListener('click',function(){
        // chk=new RegExp("hide");
        var l_num=lucky.value || 0;
        var in_pass=pass.value || 0;

        console.log(l_num,in_pass);

        if(l_num!=0) {
            chrome.storage.sync.set({lucky:l_num},function(){
                chrome.notifications.create("success",{
                    "type":"basic",
                    "iconUrl" : "logo.png",
                    "title" : "success",
                    "message":"Lucky Number Successfully saved"
                });
                body.insertBefore(pass,lucky);
                lucky.value="";
                lucky.remove();
                l_num=0;
                // lucky.className+=" hide";
                // pass.className-=" hide";
                // lucky.style.height='0px';
            });
        }

        // if(!chk.test(lucky.className)){
        //     var l_num=lucky.value;
            
        // }

        if(in_pass!=0) {
            chrome.storage.sync.set({init_pass:in_pass},function(){
                chrome.runtime.sendMessage({generate:true});
            });
            in_pass=0;
        }
        // if(!chk.test(pass.className)){
        //     var in_pass=pass.value;
        //     chr
        // }
        console.log(l_num,in_pass);
        
    });

    edit.addEventListener('click',function(){
        // lucky.className-=" hide";
        lucky.value="";
        body.insertBefore(lucky,pass);
        // pass.className+=" hide";
        
        pass.value="";
        pass.remove();
    });

    chrome.storage.sync.get(['lucky'],(data)=>{
        if(data.lucky) {
            // gen_pass.innerHTML=data.lucky;
            // lucky.className+=" hide";
            lucky.remove();
        }
    });

    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
        if(request.generated){
            chrome.storage.sync.get(['gen_pass'],function(gen_p){
                gen_pass.innerHTML=gen_p.gen_pass;
            });
        }
    });
    

});