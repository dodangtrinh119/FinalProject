/**
 * Created by nmtuan on 05-Jun-16.
 */
//Utilities
$.loadScript = function (url, callback) {
    $.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: false
    });
};

//Load managed scripts
$.loadScript('js/models/models.ini.js');
$.loadScript('js/app-core/app.module.js');
$.loadScript('js/app-controllers/controllers.module.js');
$.loadScript('js/backend-adapter/backend.module.js');