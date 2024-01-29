<?php

    /**
     * Script code content
     */
    function gzEngageRenderScript() {

        $popup_url = GOZEN_ENGAGE_EMBED_SCRIPT;

        ?>

        <script>
                !function (e, c) {
                    !function (e) {
                        const o = c.createElement("script");
                        o.async = "true",o.id="engage_script",
                            o.type = "application/javascript", o.src = e, c.body.appendChild(o)
                    }("<?php echo esc_url($popup_url) ?>")
                }(window, document);
            </script>

        <?php
    }


?>