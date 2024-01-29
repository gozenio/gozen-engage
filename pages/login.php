<?php

function gzEngageRenderLoginPage () {
?>

<div id="container">    
    <div id="login_container">
        <h1 class="w-auto flex margin-x-auto" ><img src ="<?php echo esc_url(GOZEN_ENGAGE_URL.'asserts/gozen-engage.png') ?>" style="height:40px"></h1>
        <h2 class="w-auto flex margin-x-auto" >Login To Your Account</h2>
        <form method="POST" id="login_form">
            <div id="inputcontainer" class="w-auto flex flex-col margin-x-auto" >
                <label class="flex margin-x-auto w-auto" >API Access Key</label><br>
                <input type="text" name="accesskey" id="access-key" class="flex margin-x-auto" style="min-width:60%;padding:8px 12px;border-radius:10px;" name="api-key"><br>
                <label class="flex margin-x-auto w-auto">API Access Secret</label><br>
                <input type="text" name="accessSecret" id="access-secret" class="flex margin-x-auto" style="min-width:60%;padding:8px 12px;border-radius:10px;" name="api-key"><br>
                <input type="submit" id="submit" name="submit" class="flex margin-x-auto" value="Submit"> 
                <div class="flex flex-col w-auto " >
            <p class='flex' ><strong>Have an account?</strong> <a sty style="cursor:pointer;" href="https://app.engage.gozen.io/register" target="_black">Sign up</a></p>
            <p class='flex'>Get your GoZen Engage Access key from <a style="cursor:pointer;" href="https://app.engage.gozen.io/settings" target="_black">here</a>.</p>
        </div>
            </div>
        </form>
        <div id="error-container" hidden><?php ?></div>
        
    </div>

</div>

<?php
}
?>