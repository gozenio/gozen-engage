<?php

function gzEngageTemplateRender(){

?>

<div id="formContainer">


    <!-- Header  -->
    <div id="header">

    <!-- Gozen <span id="title_content">Froms</span> -->

        <h1><img src ="<?php echo esc_url(GOZEN_ENGAGE_URL.'asserts/gozen-engage.png') ?>" style="height:40px"></h1>

        <div id="navigator">

            <!-- <P>Forms</p> -->
            <p><a id="docs" href ="https://docs.gozen.io/gozen-engage-knowledge-base/" target="_black">Docs</a></p>

            <!-- User Profile Pop -->
            <div id="user-profile" data-active="deactive">
                <img id="userimg-top-val" src="">
                <!-- <p id="username-top-val"></P> -->
                <div id="popup-menu" data-active="false" hidden>
                    <p id="userbio"><span id="username">Viswa</span><span id="useremail">Viswa@gozen.io</span></p>
                    <p id="userplan">plan:<span id="currentplan">free</span></p>
                    <p id="logout"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-4 h-4 text-black" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path></svg><span>Logout</span></p>
                </div>
            </div>

        </div>
    </div>
    <!-- <div id="user-info">
        <h2>My Account:</h2>
        <div id="info">
            <p id="useremail">Email: <span id="useremail-val"></span></p>
            <p id="username">Username: <span id="username-val"></span></p>
            <p id="planinfo">Plan: <span id="planinfo-val"></span></p>
        </div>
    </div> -->
    <div id="gzformbody flex-col" >

        <div id="popContainer"  >
            <div id="createCampPop" >
                <label>Select WorkSpace</label>
                <div id="DropDownContainer" >
                    <p id="SelectedContent" >select</p>
                    <div id="listCondiner" class="customscroll">

                    </div>
                </div>
                <label>Campaign name</label>
                <input type="text" id="campaignName" placeholder="" defaultvalue="My Campaign" >
                <div id ="Actionbutcontainer" >
                    <button id ="TemplateCreateClose" >close</button>
                    <button id ="TemplateCreateCreate">Crete</button>
                </div>
             </div>
        </div>

        <div class ="CategoryBlock" >
            <div class="flex" >
                <p class="Categoryitem" data-id="games" >Games</p>
                <p class="Categoryitem" data-id="quizzes" >Quiz</p>
                <p class="Categoryitem" data-id="spinWheel" >Spin Wheel</p>
                <p class="Categoryitem" data-id="calculater" >Calculator</p>
                <p class="Categoryitem" data-id="poll" >poll</p>
                <p class="Categoryitem" data-id="ecommerce" >Ecommerece</p>
                <p class="Categoryitem" data-id="surveys" >Surveys</p>
            </div>
            <a class="Actiontriggerbut" href="https://app.engage.gozen.io/template" target="_blank" >More Template</a>
        </div>
        <div class ="EngTemplateGallery customscroll" id="EngTemplateGallery" >
            <!-- <div class="templateCard" >
                <div class="templateImgContainer" >
                    <img src="" />
                </div>
                <div class="flex justify-between" >
                    <p class="flex margin-y-auto templanameBlock" >Template Name</p>
                    <div class="flex marfin-y-auto" >
                        <a class="previewLink" >View</a>
                        <button class="useThisTemplate" >Use</button>
                    </div>
                </div>
            <div> -->

        </div>
    </div>

</div>

<?php
}

?>