(function ($) {
    $(document).ready(() => {

        const server_domain = gzeng_url.payload.server_domain ;
        const hostname = gzeng_url.payload.hostname ;
        const Engagepage = gzeng_url.payload.Engagepage ;
        const Token = gzeng_url.payload.token;

        let getTemplateParent = document.getElementById('EngTemplateGallery');
        let ActiveCategroy = "games";
        let industry ='all';
        let lastTemp = null;
        let Temp_data = [];
        let WS_data = [];
        let is_already_active = false

        function deleteCookie (key){
            document.cookie= `${key}=''; expires = Thu, 01 Jan 1970 00:00:00 UTC`;
        }

        const TemplateBlock = (obj) =>`            
        <div class="templateCard" >
            <div class="templateImgContainer" >
                <img src="${obj?.image_src}" />
            </div>
            <div class="flex justify-between" >
                <p class="flex margin-y-auto templanameBlock" >${obj?.name}</p>
                <div class="flex marfin-y-auto" >
                    <a class="previewLink" href="${Engagepage}/template-preview/${obj?.template_id}" target="_blank" >View</a>
                    <button class="useThisTemplate" data-id="${obj.template_id}" >Use</button>
                </div>
            </div>
        <div>`

        document.addEventListener('scroll',(e)=>{
            console.log("asi")
        })

        const listBlock = document.getElementById('listCondiner')

        const listContentBlock = ( obj ) => `<p class="ChooseWscontent" data-id='${obj?.project_id}' >${obj?.project_name}</p>` 
    
        const triggerTemp = () =>{
            $.ajax({
                url: `${server_domain}/engage/wp/template/list`,
                method: "POST",
                headers: {
                    "constent-type": "application/json",
                    "authorization":`Bearer ${Token}`
                },
                data:{
                    industry,category:ActiveCategroy,lastTemp 
                },
    
                success: (res) => {
    
                     Temp_data = res.data.templates;
                     WS_data = res.data.workspaces;
                     userinfo = res.data.user_info;

                     updateUserInfo(userinfo);

                    renderTemplate(Temp_data);
                    
                    return initFunc(); 
                     
    
    
                },
                error: (err) => {
                    console.log(err);
                },
                statusCode: {
                    401: function (e) {
                        console.log("unauth user..!");
                        deleteCookie('gz_engage_access_token')
                        alert('unauthorized access');
                        return window.location.href = `${hostname}/wp-admin/admin.php?page=gozenengage`; 
                    }
                }
            })
        }

            
        const triggerCreateTemp = async (payload) =>{

            $.ajax({
                url: `${server_domain}/engage/wp/campaign/create`,
                method: "POST",
                headers: {
                    "constent-type": "application/json",
                    "authorization":`Bearer ${Token}`
                },
                data:payload,
    
                success: (res) => {
    
                    alert('Campaign Created');
                  window.location.href = `${hostname}/wp-admin/admin.php?page=Workspace`; 
    
    
                },
                error: (err) => {
                    console.log(err);
                },
                statusCode: {
                    401: function (e) {
                        console.log("unauth user..!")
                    }
                }
            })
        }

        const renderTemplate = ( temp={} ) =>{

            temp[ActiveCategroy]?.map(list =>{

                const convertBlock = TemplateBlock(list);
                getTemplateParent.innerHTML += convertBlock



            })
        }

        const initFunc = (  ) =>{

            active_temp = '';
            selectData_Ws = '';
            

            $('.Categoryitem').each(function(){
                console.log("eqweqweqw")
                $(this).click(function(e){
                    const Type = $(this).attr("data-id");
                    ActiveCategroy=Type;
                    lastTemp=null;
                    getTemplateParent.innerHTML=''
                    triggerTemp()
  
                })
            })

            $(`.useThisTemplate`).each(function () {
                $(this).click(function(){
                    const template_id = $(this).attr("data-id");
                    $(`#popContainer`).css('display','flex');
                    $(`#listCondiner`).html('')
                    WS_data?.map(list => {
                        const RenderContent = listContentBlock(list)
                        document.getElementById('listCondiner').innerHTML += RenderContent;

                    });

                    return active_temp=template_id;

                })
            })




            $(`#TemplateCreateClose`).click(()=>{
                $(`#popContainer`).css('display','none');
            })

            $(`#TemplateCreateCreate`).click(async (e)=>{

                $(this).attr('disabled','true');

                const campaignName = $(`#campaignName`).val();

                if(is_already_active) return true;

                if( (campaignName.length < 5) || (campaignName.length > 50) ) return alert('InVaid Campaign name') ;

                const getTemp = Temp_data[ActiveCategroy].find(list => list.template_id == active_temp);
  
                const payload = {
                    "campaign": {
                        "title": campaignName,
                        "type": "inline_popup",
                        "category": getTemp?.category,
                        "project_id":selectData_Ws,
                        "intent": "",
                        "industry": getTemp?.Industry,
                        "templateId": active_temp
                    }
                }

                await triggerCreateTemp(payload)

            })

            $(`#DropDownContainer`).click(function() {

                listBlock.style.display='block';
                return triggercontent()

            })
            $('#logout').click(function() {
    
                deleteCookie('gz_engage_access_token')
                return window.location.href = `${hostname}/wp-admin/admin.php?page=gozenengage`; 
            })

            $("#user-profile").click( function() {
                let active = $("#user-profile").attr('data-active');
                active == 'active' ? $("#popup-menu").hide() : $("#popup-menu").show();
                $("#user-profile").attr('data-active',active == 'active'?'deactive':'active');
      
            } )
     
                       
        }

        const triggercontent = () =>{
            $(`.ChooseWscontent`).click(function(e){
                e.stopPropagation();
                console.log(1)
                const Data_id = $(this).attr('data-id');
                const name = $(this).text()
                $(`#SelectedContent`).text(name);
                listBlock.style.display='none';
                selectData_Ws=Data_id;

            })
        }

        const updateUserInfo = ( userInfo ) =>{

            $("#useremail").text(userInfo?.email)
            $("#username").text(userInfo?.first_name)
            $("#userimg-top-val").attr('src',userInfo?.engage_user_profile)
            
        }
   
        triggerTemp();
        
        

    })
})(jQuery);