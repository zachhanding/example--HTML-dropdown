var getObjects = function(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
};

function findBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-'+env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env
        }
    };
}
var  setCanvasSize_Responsive = function(canvasHolder, settings){
   /*  the width and height are a decimal that returns a percentatge of canvas container size
   if a break point is not listed, it's not resized,
     example:
     var canvas_responsive_settings= {
         breakpoints: {
             "xs": {width: .9,height: .9}
             },
             "sm": {width: .9,height: .9}
             },
             "md": {width: .9,height: .9}
         }
     }
     or to set it to an explicit value:
    var canvas_responsive_settings= {
    breakpoints: {
    "xs": {width: '96',height: '96'}
    },
    "sm": {width: '105',height: '105'}
    }
    }
    */
    //var bootstrap_class = !settings.class ? "xs":settings.class;; // make sure there is a compared breakpoint
   //var targetWidth = !settings.width ? 1 : settings.width;;   //we are looking for a decimal which is a percentage value, defaults to fill the canvas
    //var targetHeight = !settings.height ? 1 : settings.height;
    var targetBP = findBootstrapEnvironment();
    if(!settings.breakpoints[targetBP]){
        return "";
    }
    if(settings.breakpoints[targetBP].width < 1 ) { //we know it's a percentage
        canvasHolder.canvas.width = canvasHolder.canvas.parentElement.clientWidth * settings.breakpoints[targetBP].width; //so set the number directly
    }else {
        canvasHolder.canvas.width = settings.breakpoints[targetBP].width;  // it's a pixel setting
    };
    if(settings.breakpoints[targetBP].height < 1 ) { //we know it's a percentage
        canvasHolder.canvas.height = canvasHolder.canvas.parentElement.clientWidth * settings.breakpoints[targetBP].height; //so set the number directly
    }else {
        canvasHolder.canvas.height = settings.breakpoints[targetBP].height;  // it's a pixel setting
    }

        //$.custom.ctx_claims_paid_pie.canvas.width = '90';
        // $.custom.ctx_claims_paid_pie.canvas.height = '90';
}
var checkKey = function(e) {
try{
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        return('up')
    }
    else if (e.keyCode == '40') {
        // down arrow
        return('down')
    }
    else{
        if( e.keyCode = "not defined"){
            return e.type;
        }else {
            return e.keyCode;
        }
    }
}
catch(e){
        console.error("Error in the checkkey function in the utilityFunction.js library ",e);
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

/* Format a date to MM/DD/YYYY
********************************************************/
function formatDate(val) {
    var d = new Date(val),
    day = d.getDate(),
    month = d.getMonth() + 1,
    year = d.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return month + "/" + day + "/" + year;
}

/* Format a time to XX:XX AM/PM
********************************************************/
function formatTime(val) {
    var t = new Date(val),
    hours = t.getHours(),
    minutes = t.getMinutes(),
    period = '';

    hours >= 12 ? period = 'PM' : period = 'AM';
    hours > 12 ? hours = hours - 12 : hours == 0 ? hours = 12 : hours;
    minutes < 10 ? minutes = "0" + minutes : minutes;

    return hours + ":" + minutes + " " + period;
}

/* Get and return today's date 13 years ago in MM/DD/YYYY format
********************************************************/
function get13YearLimit() {
    var d = new Date(),
    day = d.getDate(),
    month = d.getMonth() + 1,
    year = d.getFullYear() - 13;

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return month + "/" + day + "/" + year;
}


/* Custom Validation Rules
 ********************************************************/

// custom validator for checking the 13 year age limit
$.fn.bootstrapValidator.validators.ageLimitMet = {
    validate: function(validator, $field, options) {
        var time = new Date($field.val());
        time = time.getTime();
        var limit = new Date(get13YearLimit());
        limit = limit.getTime();
        if (time > limit) {
            return false;
        }
        return true;        // or false
    }
};

// custom validator for member IDs
$.fn.bootstrapValidator.validators.memberID = {
    validate: function(validator, $field, options) {
        var value = $field.val();
        if (value.search(/^[A-Za-z0-9]{11,12}$/) == 0 || value.search(/^[A-Za-z0-9]{14,15}$/) == 0) {
            return true;
        }
        return false;
    }
};

//custom validator for usernames
function usernameValidationRules(value, $tooltip) {
    // The username does not repeat more than 2 characters in a row
    if (value.search(/([A-Za-z0-9~`!@#$%^&*_+-=\?.,\<\>\ ])\1{2}/) < 0) {
        $tooltip.find('li.val-repeat').addClass('valid');
    } else {
        $tooltip.find('li.val-repeat').removeClass('valid');
        return false;
    }

    // The username is between 6-20 characters
    if (value.search(/^.{6,20}$/) > -1) {
        $tooltip.find('li.val-length').addClass('valid');
    } else {
        $tooltip.find('li.val-length').removeClass('valid');
        return false;
    }

    // The username only contains letters or numbers
    if (value.search(/^[A-Za-z0-9]+$/) > -1) {
        $tooltip.find('li.val-chars').addClass('valid');
    } else {
        $tooltip.find('li.val-chars').removeClass('valid');
        return false;
    }

    return true;
}
$.fn.bootstrapValidator.validators.username = {
    validate: function(validator, $field, options) {
        var value = $field.val();
        var $tooltip = $('#'+$field.attr('aria-describedby'));

        return usernameValidationRules(value, $tooltip);
    }
};

 //custom validator for the password length
function passwordLengthRules(value, $tooltip) {
    // The password is between 8-20 characters
    if (value.search(/^.{8,20}$/) > -1) {
        $tooltip.find('li.val-length').addClass('valid');
    } else {
        $tooltip.find('li.val-length').removeClass('valid');
        return false;
    }

    return true;
}
$.fn.bootstrapValidator.validators.passwordLength = {
    validate: function(validator, $field, options) {
        var value = $field.val();
        var $tooltip = $('#'+$field.attr('aria-describedby'));

        return passwordLengthRules(value, $tooltip);
    }
};

//custom validator for password repeating characters
function passwordRepeatRules(value, $tooltip) {
    // The password does not repeat more than 2 characters in a row
    if (value.search(/([A-Za-z0-9~`!@#$%^&*_+-=\?.,\<\>\ ])\1{2}/) < 0) {
        $tooltip.find('li.val-repeat').addClass('valid');
    } else {
        $tooltip.find('li.val-repeat').removeClass('valid');
        return false;
    }

    return true;
}
$.fn.bootstrapValidator.validators.passwordRepeat = {
    validate: function(validator, $field, options) {
        var value = $field.val();
        var $tooltip = $('#'+$field.attr('aria-describedby'));

        return passwordRepeatRules(value, $tooltip);
    }
};

//custom validator for password character limitations
function passwordCharacterRules(value, $tooltip) {
    // The password MUST contains letters and numbers, and it CAN contain the approved special characters
    if (value.search(/^(?=.*[0-9])(?=.*[a-zA-Z])([A-Za-z0-9~`!@#$%^&*_+-=\?.,\<\>\ ]+)$/) > -1) {
        $tooltip.find('li.val-chars').addClass('valid');
    } else {
        $tooltip.find('li.val-chars').removeClass('valid');
        return false;
    }

    return true;
}
$.fn.bootstrapValidator.validators.passwordCharacters = {
    validate: function(validator, $field, options) {
        var value = $field.val();
        var $tooltip = $('#'+$field.attr('aria-describedby'));

        return passwordCharacterRules(value, $tooltip);
    }
};

//custom validator for password username matching
function passwordMatchUsernameRules(value, $tooltip) {
    // The password cannot be the same as your username
    var userValue = $('#reg-username').val();

    if (value != '' && value != userValue) {
        $tooltip.find('li.val-user').addClass('valid');
    } else {
        $tooltip.find('li.val-user').removeClass('valid');
        return false;
    }

    return true;
}
$.fn.bootstrapValidator.validators.passwordMatchUsername = {
    validate: function(validator, $field, options) {
        var value = $field.val();
        var $tooltip = $('#'+$field.attr('aria-describedby'));

        return passwordMatchUsernameRules(value, $tooltip);
    }
};

// custom validator for checking that the user
//   chooses something other than the default option
//   for <select> elements
$.fn.bootstrapValidator.validators.notSelectDefault = {
    validate: function(validator, $field, options) {
        var value = $field.val();

        // option cannot contain the word "Select"
        if (value.indexOf("Select") > -1) {
            return false;
        }

        return true;
    }
};


var toggleHelpBuble = function(target) {
    alert('we clicked '+ target)
    var targetBubble = $(target);
    targetBubble.modal('show');
};

//equalize heights between elements
function pluckHeight() {
    return $(this).outerHeight();
}
function resizeFeatures($features) {
    $features.css('height', 'auto');
    if ($(window).width() >= 768) {
        var heights = $features.map(pluckHeight).get();
        var max = Math.max.apply(this, heights);
        $features.css('height', max);
    }
}
function autoResizeFeatures($features) {
    if ($features.length > 0) {
        var throttleCallback = function(){resizeFeatures($features)};
        throttleCallback();
        $features.find('img').load(throttleCallback);
        $(window).resize($.throttle( 100, throttleCallback));
    }
}
