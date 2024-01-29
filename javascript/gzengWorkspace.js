(function ($) {
    $(document).ready(() => {
        console.log(gzeng_url.payload)
        const server_domain = gzeng_url.payload.server_domain ;
        const hostname = gzeng_url.payload.hostname ;
        const Engagepage = gzeng_url.payload.Engagepage ;
        const Engage_Dashboard = gzeng_url.payload.Engage_Dashboard ;
        const Token = gzeng_url.payload.token;

        let userinfo = {};
        let Camp_list = [];
        let WorkSpace = [];

        const activemodelist = {
            1:"inline",
            2:"fullpage",
            3:"popup",
            4:"sidepanel",
            5:"popupover",
            6:'sideTap'
        }

        function deleteCookie (key){
            document.cookie= `${key}=''; expires = Thu, 01 Jan 1970 00:00:00 UTC`;
        }

        let getWorkSpaceParent = document.getElementById('workspacelist');
        let getCampaignParent = document.getElementById('gzlistedforms');

        function GetTrigger() { alert("it's Works....") };

        const WorkspaceCard = (obj) => `<div class="flex EngWorkSpace" data-id="${obj?.project_id}" >  <div class="flex" >  <img class= "rounded-full  margin-y-auto" style="border:1px solid #dadada" src="${obj?.project_img_src}" alt="WorkSpaceImage" width="40" height="40" title="Workspace" /> </div>  <p class="flex margin-y-auto" >${obj?.project_name}</p> </div>`;
        
        const setparam = (arrparam, mode ,formID) => {
            let content;
            if(mode == 'popupsize'){
                content = `
                <div class="gzfparamiconoption" id="gzfiop${mode}${formID}">
                    <span class="gzfparamiconoptionlist" data-id="${formID}" data-param="${mode}" >${arrparam[0]}</span>
                    <span class="gzfparamiconoptionlist" data-id="${formID}" data-param="${mode}" >${arrparam[1]}</span>
                    <span class="gzfparamiconoptionlist" data-id="${formID}" data-param="${mode}" >${arrparam[2]}</span>

                    </div>
                `
            }
            if(mode == 'sliderdir'){
                 content = `
                <div class="gzfparamiconoption" id="gzfiop${mode}${formID}">
                    <span class="gzfparamiconoptionlist" data-id="${formID}" data-param="${mode}" >${arrparam[0]}</span>
                    <span class="gzfparamiconoptionlist" data-id="${formID}" data-param="${mode}" >${arrparam[1]}</span>
                </div>

                `
            }
            else{
                 content = `
                <div class="gzfparamiconoption" id="gzfiop${mode}${formID}">

                    <span class="gzfparamiconoptionlist" data-id="${formID}" data-param="${mode}" >${arrparam[0]}</span>
                    <span class="gzfparamiconoptionlist" data-id="${formID}" data-param="${mode}" >${arrparam[1]}</span>
                    <span class="gzfparamiconoptionlist" data-id="${formID}" data-param="${mode}" >${arrparam[2]}</span>

                    </div>
                `
            }
        return content;
        }

        const CampBlock = (obj, activeformstatus) => `
        <div class="flex flex-col campa-block" >

            <div class="flex w-full justify-between" >  

                <div class="flex margin-y-auto" >

                    <div class="Campiconblock" >
                    
                    </div>

                    <p style="font-weight:600;text-transform: capitalize;" >${obj?.name}</p>

                </div>

                <div class="flex margin-y-auto" >

                    <div class="Gzformsactivebut margin-10px" >
                        <div class="Gzformsactivebutcon" id="gzfab${obj.campaign_id}" data-id="${obj.campaign_id}" data-active="${(obj?.status == "active") ? "active" : "deactive"}" style=${(obj?.status == "active") ? "background:#2563EB;" : ""} >
                            <div class="Gzformsactiveswitch" id="gzfas${obj.campaign_id}"style=${(obj?.status == "active") ? "margin-left:24px;" : ""} ></div>
                        </div>
                    </div>
                    <p class="flex margin-y-auto" >
                        <p class="flex flex-col margin-y-auto margin-10px"  style="margin-right:25px" ><span>Views</span><span class="flex margin-x-auto" >${obj?.view_count ?? 0}</span></p>
                        <p class="flex flex-col margin-y-auto margin-10px"  style="margin-right:25px" ><span>Click</span><span class="flex margin-x-auto" >${obj?.click_count ?? 0}</span></p>
                        <p class="flex flex-col margin-y-auto margin-10px" style="margin-right:25px" ><span>Resp</span><span class="flex margin-x-auto" >${obj?.subscribe_count ?? 0}</span></p>

                    </p>
                    <a href="${Engage_Dashboard}campaign/edit/${obj?.campaign_id}" class="CampEditorBut" target="_blank" >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#2563EB"/>
                        <path d="M19.0201 3.48C17.0801 1.54 15.1801 1.49 13.1901 3.48L11.9801 4.69C11.8801 4.79 11.8401 4.95 11.8801 5.09C12.6401 7.74001 14.7601 9.86 17.4101 10.62C17.4501 10.63 17.4901 10.64 17.5301 10.64C17.6401 10.64 17.7401 10.6 17.8201 10.52L19.0201 9.31001C20.0101 8.33001 20.4901 7.38 20.4901 6.42C20.5001 5.43 20.0201 4.47 19.0201 3.48Z" fill="#2563EB"/>
                        <path d="M15.6101 11.53C15.3201 11.39 15.0401 11.25 14.7701 11.09C14.5501 10.96 14.3401 10.82 14.1301 10.67C13.9601 10.56 13.7601 10.4 13.5701 10.24C13.5501 10.23 13.4801 10.17 13.4001 10.09C13.0701 9.80999 12.7001 9.44999 12.3701 9.04999C12.3401 9.02999 12.2901 8.95999 12.2201 8.86999C12.1201 8.74999 11.9501 8.54999 11.8001 8.31999C11.6801 8.16999 11.5401 7.94999 11.4101 7.72999C11.2501 7.45999 11.1101 7.18999 10.9701 6.90999C10.9489 6.86459 10.9284 6.81943 10.9085 6.77452C10.7609 6.44121 10.3263 6.34376 10.0685 6.60152L4.34007 12.33C4.21007 12.46 4.09007 12.71 4.06007 12.88L3.52007 16.71C3.42007 17.39 3.61007 18.03 4.03007 18.46C4.39007 18.81 4.89007 19 5.43007 19C5.55007 19 5.67007 18.99 5.79007 18.97L9.63007 18.43C9.81007 18.4 10.0601 18.28 10.1801 18.15L15.9014 12.4287C16.1609 12.1691 16.063 11.7237 15.7254 11.5796C15.6874 11.5634 15.649 11.5469 15.6101 11.53Z" fill="#2563EB"/>
                    </svg>

                    </a>
                    <button class="rounded-12px primary-bnt gzEngaageGetCode cursor-pointer " id="getcode${obj?.campaign_id}" data-id="${obj?.campaign_id}" style="min-width:100px;justify-content:center" ${(obj?.status == "active") ? "" : "disabled"} >Get Code</button>
                    <button class="rounded-12px secondary-bnt gzEngaageGetCode cursor-pointer hidden" id="close${obj?.campaign_id}"  data-id="${obj?.campaign_id}" style="min-width:100px;justify-content:center" >Close</button>

                </div>
            </div>
        <div class="gzformsediter " id="gzee${obj.campaign_id}" >

            ${CampEditor(obj)}
        </div>

        </?div>
        `;

        const CampEditor = ( obj, activemode = 1 ) => `

        <div class="gzformsembedediter">

        <div class="gzformsembedmode" id="gzfem${obj.campaign_id}" data-active-mode="standard">
            <h3>Embed Mode</h3>
            <div class="embedpostion" >
                <p class="gzformsembedmodecontent" data-index="1" data-id="${obj.campaign_id}" >
                    <span class="gzformsembedmodeicon">
                    <svg width="128" height="84" viewBox="0 0 128 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="127" height="83" rx="5.5" fill="white" stroke="${activemode == '1' ? "#2563EB":"#DCE0E4"}"/>
                    <rect opacity="0.4" x="24" y="15" width="54" height="3" rx="1.5" fill="${activemode == '1' ? "#2563EB":"#DCE0E4"}"/>
                    <rect opacity="0.4" x="24" y="66" width="32" height="3" rx="1.5" fill="${activemode == '1' ? "#2563EB":"#DCE0E4"}"/>
                    <rect x="24" y="23" width="80" height="38" rx="4" fill="${activemode == '1' ? "#2563EB":"#DCE0E4"}"/>
                    </svg>
                    
                    </span>
                    <span class="gzformsembedmodetype" style ="${(activemode == '1') ? "color:#3D5AF1;" : "color:#E0E0E0;"}"id="standard-p-${obj.campaign_id}" >Inline</span>
                </p>
                <p class="gzformsembedmodecontent" data-index="2" data-id="${obj.campaign_id}">
                    <span class="gzformsembedmodeicon">
                    <svg width="128" height="84" viewBox="0 0 128 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="127" height="83" rx="5.5" fill="white" stroke="${activemode == '2' ? "#2563EB":"#DCE0E4"}"/>
                    <rect x="12" y="12" width="104" height="60" rx="4" fill="${activemode == '2' ? "#2563EB":"#DCE0E4"}"/>
                    </svg>
                    </span>
                                       
                    <span class="gzformsembedmodetype" style ="${(activemode == '2') ? "color:#3D5AF1;" : "color:#E0E0E0;"}" id="popup-p-${obj.campaign_id}">Full page</span>
                </p>
                <p class="gzformsembedmodecontent" data-index="3" data-id="${obj.campaign_id}">
                    <span class="gzformsembedmodeicon">
                    <svg width="128" height="84" viewBox="0 0 128 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="127" height="83" rx="5.5" fill="white" stroke="${activemode == '3' ? "#2563EB":"#DCE0E4"}"/>
                    <rect x="24" y="20" width="80" height="44" rx="4" fill="${activemode == '3' ? "#2563EB":"#DCE0E4"}"/>
                    </svg>     
                    </span>

                    <span class="gzformsembedmodetype" style ="${(activemode == '3') ? "color:#3D5AF1;" : "color:#E0E0E0;"}" id="popup-p-${obj.campaign_id}">Popup</span>
                </p>
                <p class="gzformsembedmodecontent" data-index="4" data-id="${obj.campaign_id}">
                    <span class="gzformsembedmodeicon">
                    <svg width="128" height="84" viewBox="0 0 128 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="127" height="83" rx="5.5" fill="white" stroke="${activemode == '4' ? "#2563EB":"#DCE0E4"}"/>
                    <rect x="71" y="12" width="45" height="60" rx="4" fill="${activemode == '4' ? "#2563EB":"#DCE0E4"}"/>
                    </svg>
                    </span>
                                    
                    <span class="gzformsembedmodetype" style ="${(activemode == '4') ? "color:#3D5AF1;" : "color:#E0E0E0;"}" id="popup-p-${obj.campaign_id}">Side Panel</span>
                </p>
                <p class="gzformsembedmodecontent" data-index="5" data-id="${obj.campaign_id}">
                    <span class="gzformsembedmodeicon">
                    <svg width="128" height="84" viewBox="0 0 128 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="127" height="83" rx="5.5" fill="white" stroke="${activemode == '5' ? "#2563EB":"#DCE0E4"}"/>
                    <rect x="76" y="12" width="40" height="52" rx="4" fill="${activemode == '5' ? "#2563EB":"#DCE0E4"}"/>
                    <rect x="111" y="67" width="5" height="5" rx="2.5" fill="${activemode == '5' ? "#2563EB":"#DCE0E4"}"/>
                    </svg>
                    
                    </span>
                    <span class="gzformsembedmodetype" style ="${(activemode == '5') ? "color:#3D5AF1;" : "color:#E0E0E0;"}" id="slider-p-${obj.campaign_id}">Popover</span>
                </p>
                <p class="gzformsembedmodecontent"data-index="6" data-id="${obj.campaign_id}">
                <span class="gzformsembedmodeicon">

                    <svg width="128" height="84" viewBox="0 0 128 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="127" height="83" rx="5.5" fill="white" stroke="${activemode == '6' ? "#2563EB":"#DCE0E4"}"/>
                    <rect x="78" y="12" width="38" height="60" rx="4" fill="${activemode == '6' ? "#2563EB":"#DCE0E4"}"/>
                    <rect x="71" y="34" width="4" height="16" rx="2" fill="${activemode == '6' ? "#2563EB":"#DCE0E4"}"/>
                    </svg>
                    </span>

                    <span class="gzformsembedmodetype" style ="${(activemode == '6') ? "color:#3D5AF1;" : "color:#E0E0E0;"}" id="side-p-${obj.campaign_id}">Side Tap</span>
                </p>
            </div>
        </div>
        ${EdtorAppearance(activemode,obj.campaign_id)}


        ${CopyClip(obj,activemode)}
        `;

        const EdtorAppearance = ( mode=0, id="" ) => {


            const getActivemode = activemodelist[parseInt(mode)]

            const Enmberd = {
                "inline":`<div class="gzformapperancecontainer">
                <div class="gzformsembedapperanceinput">
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">W</span>
                    <div class="gzAppearanceinputval">
                        <input type="number" id="gzfinputwidth${id}" style="border:1px solid #d7d7d7" />
                        <div class="gzfparam" data-id="${id}" data-mode="width" data-active="deactive" >
                            <span class="gzfparamicon" id="gzfparamiconwidth${id}" style="margin: auto 8px;">%</span>
                            <span class="gzfparamicon"  style="margin: auto 8px;">
                                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.62558 0.610357L4.64041 3.59553L1.65523 0.610357C1.35517 0.310301 0.870466 0.310301 0.57041 0.610357C0.270353 0.910414 0.270353 1.39512 0.57041 1.69518L4.10184 5.22661C4.4019 5.52667 4.88661 5.52667 5.18666 5.22661L8.71809 1.69518C9.01815 1.39512 9.01815 0.910414 8.71809 0.610357C8.41804 0.317995 7.92564 0.310301 7.62558 0.610357Z" fill="#98989A"/>
                                </svg>
                            </span>${setparam(['px','rem','vw'],'width',id)}
                        </div>
                    </div>
                </div>
                <div class="gzformsembedapperanceinput" >
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">H</span>
                    <div class="gzAppearanceinputval">
                        <input type="number" id="gzfinputheight${id}" style="border:1px solid #d7d7d7" >
                        <div class="gzfparam" data-id="${id}" data-mode="height" data-active="deactive" >
                            <span class="gzfparamicon" id="gzfparamiconheight${id}" style="margin: auto 8px;">%</span>
                            <span class="gzfparamicon" style="margin: auto 8px;">
                                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.62558 0.610357L4.64041 3.59553L1.65523 0.610357C1.35517 0.310301 0.870466 0.310301 0.57041 0.610357C0.270353 0.910414 0.270353 1.39512 0.57041 1.69518L4.10184 5.22661C4.4019 5.52667 4.88661 5.52667 5.18666 5.22661L8.71809 1.69518C9.01815 1.39512 9.01815 0.910414 8.71809 0.610357C8.41804 0.317995 7.92564 0.310301 7.62558 0.610357Z" fill="#98989A"/>
                                </svg>
                            </span>`+`${setparam(['px','rem','vh'],'height',id)}`+`
                        </div>
                    </div>
                </div>`,
                "fullpage":``,
                "popup":`

                <div class="gzformsembedapperanceinput">
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">Size</span>
                    <div class="gzAppearanceinputval">
                        <input type="text" class="dropdowninput" id="gzfinputpopupsize${id}" style="border:1px solid #d7d7d7">
                        <div class="gzfparam" data-id="${id}" data-mode="popupsize" data-active="deactive">
                        <span class="gzfparamicon"  style="margin: auto 8px;">
                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.62558 0.610357L4.64041 3.59553L1.65523 0.610357C1.35517 0.310301 0.870466 0.310301 0.57041 0.610357C0.270353 0.910414 0.270353 1.39512 0.57041 1.69518L4.10184 5.22661C4.4019 5.52667 4.88661 5.52667 5.18666 5.22661L8.71809 1.69518C9.01815 1.39512 9.01815 0.910414 8.71809 0.610357C8.41804 0.317995 7.92564 0.310301 7.62558 0.610357Z" fill="#98989A"/>
                            </svg>
                        </span>`+`${setparam(['small','medium','large'],'popupsize',id)}`+`
                    </div>
                    </div>
                </div>
                `,
                "sidepanel":`<div class="gzformapperancecontainer">
                <div class="gzformsembedapperanceinput">
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">W</span>
                    <div class="gzAppearanceinputval">
                        <input type="number" id="gzfinputwidth${id}" style="border:1px solid #d7d7d7" />
                        <div class="gzfparam" data-id="${id}" data-mode="width" data-active="deactive" >
                            <span class="gzfparamicon" id="gzfparamiconwidth${id}" style="margin: auto 8px;">%</span>
                            <span class="gzfparamicon"  style="margin: auto 8px;">
                                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.62558 0.610357L4.64041 3.59553L1.65523 0.610357C1.35517 0.310301 0.870466 0.310301 0.57041 0.610357C0.270353 0.910414 0.270353 1.39512 0.57041 1.69518L4.10184 5.22661C4.4019 5.52667 4.88661 5.52667 5.18666 5.22661L8.71809 1.69518C9.01815 1.39512 9.01815 0.910414 8.71809 0.610357C8.41804 0.317995 7.92564 0.310301 7.62558 0.610357Z" fill="#98989A"/>
                                </svg>
                            </span>${setparam(['px','rem','vw'],'width',id)}
                        </div>
                    </div>
                </div>
                <div class="gzformsembedapperanceinput" >
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">H</span>
                    <div class="gzAppearanceinputval">
                        <input type="number" id="gzfinputheight${id}" style="border:1px solid #d7d7d7" >
                        <div class="gzfparam" data-id="${id}" data-mode="height" data-active="deactive" >
                            <span class="gzfparamicon" id="gzfparamiconheight${id}" style="margin: auto 8px;">%</span>
                            <span class="gzfparamicon" style="margin: auto 8px;">
                                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.62558 0.610357L4.64041 3.59553L1.65523 0.610357C1.35517 0.310301 0.870466 0.310301 0.57041 0.610357C0.270353 0.910414 0.270353 1.39512 0.57041 1.69518L4.10184 5.22661C4.4019 5.52667 4.88661 5.52667 5.18666 5.22661L8.71809 1.69518C9.01815 1.39512 9.01815 0.910414 8.71809 0.610357C8.41804 0.317995 7.92564 0.310301 7.62558 0.610357Z" fill="#98989A"/>
                                </svg>
                            </span>`+`${setparam(['px','rem','vw'],'height',id)}`+`
                        </div>
                    </div>
                </div>`,
                "popupover":`

            </div>
                <div class="gzformsembedapperanceinput">
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">Button Color</span>
                    <div class="gzAppearanceinputval">
                        <input type="text" id="gzfinputcolor${id}" width="100%" style="border-radius:8px;width:100%;border:1px solid #d7d7d7;" placeholder="EX: #0c7af0"  >

                    </div>
                </div>
                    <div class="gzformsembedapperanceinput">
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">Button Text Color</span>
                    <div class="gzAppearanceinputval">
                        <input type="text" id="gzfinputtc${id}" width="100%" style="border-radius:8px;width:100%;border:1px solid #d7d7d7;" placeholder="EX: #0c7af0" >

                    </div>
                </div>
                <div class="gzformsembedapperanceinput">
                <span class="gzAppearancelabel"  style="margin: auto 8px;">Button Text</span>
                <div class="gzAppearanceinputval">
                    <input type="text" id="gzfinputtext${id}"  width="100%" style="border-radius:8px;width:100%;border:1px solid #d7d7d7;" placeholder="Launch">

                </div>
            </div>
            <div class="gzformsembedapperanceinput">
                <span class="gzAppearancelabel"  style="margin: auto 8px;margin-right:28px;">Select direcion</span>
                    <div class="gzAppearanceinputval">
                        <input type="text" class="dropdowninput"  id="gzfinputsliderdir${id}" style="border:1px solid #d7d7d7"/>
                        <div class="gzfparam" data-id="${id}" data-mode="sliderdir" data-active="deactive" >
                            <span  style="margin: auto 8px;">
                                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.62558 0.610357L4.64041 3.59553L1.65523 0.610357C1.35517 0.310301 0.870466 0.310301 0.57041 0.610357C0.270353 0.910414 0.270353 1.39512 0.57041 1.69518L4.10184 5.22661C4.4019 5.52667 4.88661 5.52667 5.18666 5.22661L8.71809 1.69518C9.01815 1.39512 9.01815 0.910414 8.71809 0.610357C8.41804 0.317995 7.92564 0.310301 7.62558 0.610357Z" fill="#98989A"/>
                                </svg>
                            </span>${setparam(['left','right'],'sliderdir',id)}
                        </div>
                    </div>
                </div>
            </div>
                `,
                "sideTap":`

                <div class="gzformsembedapperanceinput">
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">Button Color</span>
                    <div class="gzAppearanceinputval">
                        <input type="text" id="gzfinputcolor${id}" width="100%" style="border-radius:8px;width:100%;border:1px solid #d7d7d7;" placeholder="EX: #0c7af0"  >

                    </div>
                </div>
                    <div class="gzformsembedapperanceinput">
                    <span class="gzAppearancelabel"  style="margin: auto 8px;">Button Text Color</span>
                    <div class="gzAppearanceinputval">
                        <input type="text" id="gzfinputtc${id}" width="100%" style="border-radius:8px;width:100%;border:1px solid #d7d7d7;" placeholder="EX: #0c7af0" >

                    </div>
                </div>
                <div class="gzformsembedapperanceinput">
                <span class="gzAppearancelabel"  style="margin: auto 8px;">Button Text</span>
                <div class="gzAppearanceinputval">
                    <input type="text" id="gzfinputtext${id}"  width="100%" style="border-radius:8px;width:100%;border:1px solid #d7d7d7;" placeholder="Launch">

                </div>
            </div>
            <div class="gzformsembedapperanceinput">
                <span class="gzAppearancelabel"  style="margin: auto 8px;margin-right:28px;">Select direcion</span>
                    <div class="gzAppearanceinputval">
                        <input type="text" class="dropdowninput"  id="gzfinputsliderdir${id}" style="border:1px solid #d7d7d7" />
                        <div class="gzfparam" data-id="${id}" data-mode="sliderdir" data-active="deactive" >
                            <span  style="margin: auto 8px;">
                                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.62558 0.610357L4.64041 3.59553L1.65523 0.610357C1.35517 0.310301 0.870466 0.310301 0.57041 0.610357C0.270353 0.910414 0.270353 1.39512 0.57041 1.69518L4.10184 5.22661C4.4019 5.52667 4.88661 5.52667 5.18666 5.22661L8.71809 1.69518C9.01815 1.39512 9.01815 0.910414 8.71809 0.610357C8.41804 0.317995 7.92564 0.310301 7.62558 0.610357Z" fill="#98989A"/>
                                </svg>
                            </span>${setparam(['left','right'],'sliderdir',id)}
                        </div>
                    </div>
                </div>
            </div>
                `

            }
            return `
            <div class="gzformsembedapperance">
            <h3>Appearance</h3>
            <div class="gzformapperancecontainer" id="gzformapperancecontainer${id}">
    
                ${
                    Enmberd[getActivemode]
                }
            
            </div>
            
            `

        }


        const CopyClip = ( obj,activemode ) => `
        <button class="chgcbutton gzengCodeDAta" data-id="${obj.campaign_id}" data-active="${activemodelist[parseInt(activemode)]}" >Click here to Get Code</button>
        
        <div class="gzformsembedcopicontent" id="gzfcc${obj.campaign_id}" data-current-mode="htmlcode">
        <input type="text" id="gozenembedformcode${obj.campaign_id}" name="shortcode" value="" data-shortcode="" data-html="" style="border:1px solid #d7d7d7" />
        <div class="gzformsembedcopiboardbnt" id="gzfcb${obj.campaign_id}" data-id="${obj.campaign_id}">
            <span class="gzformsembedcopiboardbnticon" data-id="${obj.campaign_id}">
                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15H1.66667V4.16667C1.66667 3.70833 1.29167 3.33333 0.833333 3.33333C0.375 3.33333 0 3.70833 0 4.16667V15C0 15.9167 0.75 16.6667 1.66667 16.6667H10C10.4583 16.6667 10.8333 16.2917 10.8333 15.8333C10.8333 15.375 10.4583 15 10 15ZM14.1667 11.6667V1.66667C14.1667 0.75 13.4167 0 12.5 0H5C4.08333 0 3.33333 0.75 3.33333 1.66667V11.6667C3.33333 12.5833 4.08333 13.3333 5 13.3333H12.5C13.4167 13.3333 14.1667 12.5833 14.1667 11.6667ZM12.5 11.6667H5V1.66667H12.5V11.6667Z" fill="white"/>
                </svg>
            </span>
            <p class="gzchangecodeem" id="gzchangecodeem${obj.campaign_id}" data-id="${obj.campaign_id}" data-active="deactive" data-code="html">
                <span id="gzfcontent${obj.campaign_id}">HTML Code</span>

                <span>
                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.62604 0.610418L4.64086 3.59559L1.65569 0.610418C1.35563 0.310362 0.870924 0.310362 0.570867 0.610418C0.270811 0.910475 0.270811 1.39518 0.570867 1.69524L4.1023 5.22667C4.40236 5.52673 4.88706 5.52673 5.18712 5.22667L8.71855 1.69524C9.01861 1.39518 9.01861 0.910475 8.71855 0.610418C8.4185 0.318056 7.9261 0.310362 7.62604 0.610418Z" fill="white"/>
                    </svg>
                </span>
            </p>
            <p class="gzfecontentop" id="gzfcontentop${obj.campaign_id}" data-id="${obj.campaign_id}">Direct Link</p>
        </div>
    </div>
`


        $.ajax({
            url: `${server_domain}/engage/wp/project/all`,
            method: "GET",
            headers: {
                "constent-type": "application/json",
                "authorization": `Bearer ${Token}`
            },

            success: (res) => {

                 Camp_list = res.data.campaigns;
                 WorkSpace = res.data.workspace;
                userinfo = res.data.user_info;

                render_campaign_block(Camp_list)
                render_workspace_block(WorkSpace)
                updateUserInfo(userinfo);
                InitFunc(Camp_list);

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


        function render_campaign_block(Camp = []) {

            Camp.map(list => {

                let campBlock = CampBlock(list);
                getCampaignParent.innerHTML += campBlock

            })

        }

        function render_workspace_block(workspace = []) {

            workspace.map(list => {

                let WSBlock = WorkspaceCard(list);
                getWorkSpaceParent.innerHTML += WSBlock


            })

        }

        const updateUserInfo = ( userInfo ) =>{

            $("#useremail").text(userInfo?.email)
            $("#username").text(userInfo?.first_name)
            $("#userimg-top-val").attr('src',userInfo?.engage_user_profile)
            
        }

        const ActiveEditor = ( IsActive=false, id ) => {

            const ActiveProp = {
                "display":"flex",
            }
            const notActiveProp = {
                "display":"none",
            }

            $(`#getcode${id}`).css(IsActive ? notActiveProp : ActiveProp)
            $(`#close${id}`).css(!IsActive ? notActiveProp : ActiveProp)
            $(`#gzee${id}`).css(!IsActive ? {...notActiveProp,"opacity":"0"} : {...ActiveProp,"opacity":"1"})

        }

        const renderClickProjectCamp = (project_id) => {

            $.ajax({
                url: `${server_domain}/engage/wp/campaigns/${project_id}`,
                method: "GET",
                headers: {
                    "constent-type": "application/json",
                    "authorization": `Bearer ${Token}`
                },
    
                success: (res) => {
    
                    Camp_list = res.data.campaigns;
                    WorkSpace = res.data.workspace;
                    userinfo = res.data.user_info;
                    render_campaign_block(Camp_list)
                    render_workspace_block(WorkSpace);
                    InitFunc(Camp_list);
                    updateUserInfo(userinfo);

                    
                },
                error: (err) => {
                    console.log(err,"uy");
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



        const LiveCamp = (Camp_id,status='diable') => {
            $.ajax({
                url: `${server_domain}/engage/wp/campaign/${status}`,
                method: "PUT",
                headers: {
                    "constent-type": "application/json",
                    "authorization": `Bearer ${Token}`
                },
                data:{
                    "campaign":{

                        "campaign_id":Camp_id
          }
                },
    
                success: (res) => {
                    console.log(res);

    
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

        const InitFunc = (CampInfo=[]) => {

            $(".gzengCodeDAta").each(function() {

                $(this).click(async function(e) {

                    const camp_id = $(this).attr('data-id');
                    const site_id = $(this).attr('data-site-id');
                    const primary_id = $(this).attr('data-primary_id');
                    const mode = $(this).attr('data-active');

                    //getprams
                    let width =$(`#gzfinputwidth${camp_id}`).val();
                    let wparam =$(`#gzfparamiconwidth${camp_id}`).text();
                    let height =$(`#gzfinputheight${camp_id}`).val();
                    let hparam =$(`#gzfparamiconheight${camp_id}`).text();
                    let popupsize =$(`#gzfinputpopupsize${camp_id}`).val()
                    let sliderdir =$(`#gzfinputsliderdir${camp_id}`).val()
                    let text =$(`#gzfinputtext${camp_id}`).val()
                    let tc =$(`#gzfinputtc${camp_id}`).val()
                    let color =$(`#gzfinputcolor${camp_id}`).val()
        
                    const getCode = await CodeContent( camp_id, site_id, primary_id, mode,`${width}${wparam}`,`${height}${hparam}`, popupsize, sliderdir, text, tc, color );
        
                    $(`#gozenembedformcode${camp_id}`).val(getCode);

                })
    
                
            } )
       
            $('.gzEngaageGetCode').each(function(){
                
                $(this).click(function(e) {
                    const Camp_id = $(this).attr('data-id');
                    const id = $(this).attr('id');
                    const check = `getcode${Camp_id}`;
                    const closeid = `close${Camp_id}`;

                    if( id == check )  ActiveEditor(true,Camp_id)
                    else ActiveEditor(false,Camp_id)

                })
            })

            $(`.Gzformsactivebutcon`).each(function() {
                $(this).click(function(e) {
                    
                    const IsActive = $(this).attr("data-active");
                    const Camp_id = $(this).attr("data-id");

                    if(IsActive == 'active') {
                        LiveCamp(Camp_id,'disable');
                         $(this).attr("data-active","deactive");
                        $(`#gzfab${Camp_id}`).css({"background":"#98989A"})
                        $(`#gzfas${Camp_id}`).css({"margin-left":"4px"})

                    }
                    else {
                        LiveCamp(Camp_id,'enable') ;
                        $(this).attr("data-active","active");
                        $(`#gzfab${Camp_id}`).css({"background":"#2563EB"})
                        $(`#gzfas${Camp_id}`).css({"margin-left":"24px"})
                    }




                })
            })

            $(`.EngWorkSpace`).each(function(){
                $(this).click(function(e){
                    const project_id = $(this).attr('data-id');
                getCampaignParent.innerHTML = ""

                    renderClickProjectCamp(project_id)

                })
            })

            $(`.gzformsembedmodecontent`).each(function(){
              
                $(this).click(function(e){
                    const id = $(this).attr('data-id');
                    const idindex = $(this).attr('data-index');
                    const findIndexCAmp = CampInfo?.findIndex(list => list?.campaign_id == id)
                    const obj = CampInfo[findIndexCAmp]
                    
                     const postion = CampEditor(obj,idindex);

                     $(`#gzee${id}`).html(postion);
                     InitFunc(CampInfo)


                })
            })
            $(".gzfparam").each( function(){
                $(this).click(function(e){
                    let bnt = $(this).attr('data-id');
                    let bntmode = $(this).attr('data-mode');
                    let butactive = $(this).attr('data-active');

                    if(butactive == 'active'){
                        $(`#gzfiop${bntmode}${bnt}`).css({'display':"none"})
                        $(`.gzfparamiconoptionlist`).css({'opacity':"0"})
                        $(this).css('border-radius','0px 8px 8px 0px')
                        $(this).attr('data-active','deactive')
                    }
                    else{
                        $(`#gzfiop${bntmode}${bnt}`).css({'display':"block"})
                        $(`.gzfparamiconoptionlist`).css({'opacity':"1"})
                        $(this).css('border-radius','0px 8px 0px 0px')
                        $(this).attr('data-active','active')
                    }
                })
            })
            $(`.gzfparamiconoptionlist`).each(function(){
                $(this).click(function(){
                    let bnt = $(this).attr('data-id');
                    let bntmode = $(this).attr('data-param');
                    let bnttext = $(this).text();
                    (bntmode == 'popupsize') ? $(`#gzfinput${bntmode}${bnt}`).val(`${bnttext}`) : (bntmode == 'sliderdir') ? $(`#gzfinput${bntmode}${bnt}`).val(`${bnttext}`) : $(`#gzfparamicon${bntmode}${bnt}`).text(`${bnttext}`) ;
                    $(`#gzfparamicon${bntmode}${bnt}`).text(`${bnttext}`)
                    $(`#gzfiopwidth${bnt}`).css({'display':"none"})
                    $(`#gzfiopheight${bnt}`).css({'display':"none"})
                    $(`.gzfparamiconoptionlist`).css({'opacity':"0"})
                    $(`gzfparamiconoptionlist`).attr('data-active','deactive')

                })
            })

            $(".gzchangecodeem").each( function (){
                console.log("chgcbutton")
                $(this).click(function(){
                    let psid = $(this).attr('data-id');
                    let psstatus = $(this).attr('data-active');
                    $(`#gzfcb${psid}`).css((psstatus == 'deactive')?{borderRadius:"0px 8px 0px 0px"}:{borderRadius:"0px 8px 8px 0px"})
                    $(`#gzfcontentop${psid}`).css((psstatus == 'deactive')?{display:"block"}:{display:"none"})
                    $(this).attr('data-active',(psstatus == 'deactive')?"active":"deactive");
                })
            })
            
            $(".gzfecontentop").each( function(){
                $(this).click(function(e){
                    let bnt = $(this).attr('data-id');
                    let bntcode = $(`#gzchangecodeem${bnt}`).attr('data-code');
                    let activecodeshort =$(`#gozenembedformcode${bnt}`).attr('data-shortcode');
                    let activecodehtml =$(`#gozenembedformcode${bnt}`).attr('data-html');
                    $(`#gzfcontent${bnt}`).text((bntcode == 'html')?'Direct Link':'HTML Code');
                    $(`#gzfcc${bnt}`).attr('data-current-mode',(bntcode == 'html')?'directlink':'htmlcode');
                    $(this).text((bntcode == 'html')?'HTML Code':'Direct Link');
                    $(`#gzchangecodeem${bnt}`).attr('data-code',(bntcode == 'html')?'link':'html');
                    $(`#gozenembedformcode${bnt}`).val((bntcode == 'html')?activecodeshort:activecodehtml);
                    $(`#gzfcb${bnt}`).css({borderRadius:"0px 8px 8px 0px"})
                    $(`#gzfcontentop${bnt}`).css({display:"none"})
                    $(`#gzchangecodeem${bnt}`).attr('data-active',"deactive");
                })
            })
        }



        const CodeContent = async ( Camp_id, site_id, primary_id, mode='inline', width = '100%', height='450px', popupsize="small", sliderdir="right", text='Lunch',textColor="#FFFFFF", background="#063EB" ) => {

            const codelist = {
            "inline":`<div  class="engage-block" data-gz-eng-type="inlineEmbed" data-gz-eng-cp-id="${Camp_id}" data-gz-eng-d-id="${site_id}" data-gz-eng-ps-id="${primary_id}" style="width:${width}; height:${height};" ></div>`,
            "fullpage":`<div  class="engage-block" data-gz-eng-type="fullPage" data-gz-eng-cp-id="${Camp_id}" data-gz-eng-d-id="${site_id}" data-gz-eng-ps-id="${primary_id}" ></div>`,
            "popup":`<div  class="engage-block" data-gz-eng-type="popup" data-gz-eng-cp-id="${Camp_id}" data-gz-eng-d-id="${site_id}" data-gz-eng-ps-id="${primary_id}" data-gz-eng-popup-size="${popupsize}" ></div>`,
            "sidepanel":`<div  class="engage-block" data-gz-eng-type="sidePanel" data-gz-eng-cp-id="${Camp_id}" data-gz-eng-d-id="${site_id}" data-gz-eng-ps-id="${primary_id}" style="width:${width}; height:${height};" ></div>`,
            "popupover":`<button  class="engage-block" data-gz-eng-type="popover" data-gz-eng-cp-id="${Camp_id}" data-gz-eng-d-id="${site_id}" data-gz-eng-ps-id="${primary_id}" style="cursor:pointer; border:none; padding: 8px 20px 8px 20px; border-radius:5px; color:${textColor}; background-color:${background};" data-gz-eng-side="${sliderdir}">${text}</button>`,
            "sideTap":` <div  class="engage-block" data-gz-eng-type="sideTab" data-gz-eng-cp-id="${Camp_id}" data-gz-eng-d-id="${site_id}" data-gz-eng-ps-id="${primary_id}" data-gz-eng-btnText="${text}" data-gz-eng-btnTxtColor="${textColor}" data-gz-eng-btnBgColor="${background}" data-gz-eng-side="${sliderdir}" ></div>`
    
            }

            return codelist[mode]
        }


        $("#user-profile").click( function() {
            let active = $("#user-profile").attr('data-active');
            active == 'active' ? $("#popup-menu").hide() : $("#popup-menu").show();
            $("#user-profile").attr('data-active',active == 'active'?'deactive':'active');
  
        } )
  
        $("#popup-menu").mouseleave(
            function (){
                $("#popup-menu").hide();
            }
        )
        $('#logout').click(function() {


            deleteCookie('gz_engage_access_token')
            return window.location.href = `${hostname}/wp-admin/admin.php?page=gozenengage`; 
        })

    })
})(jQuery);