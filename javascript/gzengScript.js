(function ($) {
    $(document).ready(() => {

        const server_domain = gzeng_url.payload.server_domain ;
        const hostname = gzeng_url.payload.hostname ;
        const Engagepage = gzeng_url.payload.Engagepage ;


        const test = localStorage.getItem("gz_engage_access_token");
        console.log("Engage Is Running", test);

        //Custom Cookie Setup.
        function SetCookie(key, value, expire = 2) {

            const CurrentDate = new Date();

            const setDate = new Date(CurrentDate.getTime() + (expire * 24 * 60 * 60 * 1000));

            let expires = "expires=" + setDate.toUTCString();

            document.cookie = key + "=" + value + ";" + expires + "path=" + window.location.href  ;

        };

        function deleteCookie (key){
            document.cookie= `${key}=''; expires = Thu, 01 Jan 1970 00:00:00 UTC`;
        }

        //Custom Form Submit Event
        $("#login_form").submit(function (e) {

            e.preventDefault();

            const access_key = $("#access-key").val();
            const access_secret = $("#access-secret").val();

            const payload = { access_key, access_secret };

            $.ajax({
                url: `${server_domain}/engage/wp/auth`,
                method: "POST",
                headers: {
                    "constent-type": "application/json",
                },
                data: payload,

                success: (res) => {

                    const { access_token } = res;

                    SetCookie("gz_engage_access_token", access_token, 5)

                    window.location.href = `${hostname}/wp-admin/admin.php?page=Workspace`; 

                },
                error: (err) => {
                    console.log(err);
                },
                statusCode: {
                    401: function (e) {
                        console.log("unauth user..!")
                        deleteCookie('gz_engage_access_token')
                        alert('unauthorized access');
                        return window.location.href = `${hostname}/wp-admin/admin.php?page=gozenengage`; 
                    }
                }
            })


        })




    })
})(jQuery);