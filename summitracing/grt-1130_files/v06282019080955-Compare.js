//// Compare JavaScript File
var compareLayerId;
var compareLayerSKU;

function resetcompare() {
    var arrCompareLinks = $('.compareLink');
    for (var i = 0; i < arrCompareLinks.length; i++) {
        var s = arrCompareLinks[i];
        var sku = s.id.replace('labelLink_', '');
        labeltoggle(sku);
    }
}

function labeltoggle(labelSKU) {
    var compareLabelText = document.getElementById('labelText_' + labelSKU);
    var compareLabelLink = document.getElementById('labelLink_' + labelSKU);
    var compareCheckbox = document.getElementById('compareCheck_' + labelSKU);
    if (compareCheckbox.checked) {
        compareLabelText.style.display = "none";
        compareLabelLink.innerHTML = "<a title='View Compare' href='/compare'>Compare</a>";
        compareLabelLink.style.display = "inline";
    }
    else {
        compareLabelText.style.display = "inline";
        compareLabelLink.style.display = "none";
    }
}

function compare(cookieName, sku, action, checkbox) {
	//COOKIE DATA
    var _cookieName = cookieName;
    var _cookieValue = getCookie(_cookieName);
     var _cookieValueArray = [];
    if (typeof _cookieValue.split === 'function') {
        _cookieValueArray = _cookieValue.split("|");
    }

    switch (action) {
        case "add":
            add();
            break;
        case "remove":
            remove();
            break;
        case "removeAll":
            removeAll();
            break;
        case "toggle":
            toggle();
            labeltoggle(sku);
            break;
        case "replace":
            replaceOldest();
            add();
            break;
        case "verify":
            verify();
            break;
    }

    function add() {
        //Add SKU to compare cookie
        if (_cookieValue !== "" && _cookieValue !== null) {
            var x;

            if (_cookieValueArray.length > 9) {
                if (checkbox) {
                    checkbox.checked = false;
                }
                compareLayerSKU = sku;
                floatingLayerCompare(10, 10, compareLayerId, '#compareCheck_' + sku)
                return false;
            }
            for (x in _cookieValueArray) {
                if (_cookieValueArray[x] == sku) {
                    if (!checkbox) {
                        setCookie(_cookieName, _cookieValue, null);
                        redirect();
                    }
                    return false;
                }
            }
            setCookie(_cookieName, _cookieValue + '|' + sku, null);
        }
        else {
            setCookie(_cookieName, sku, null);
        }
        if (!checkbox) {
            redirect();
        }
        else {
            return true;
        }
    }

    function remove() {
        for (var i = 0; i < _cookieValueArray.length; i++) {
            if (_cookieValueArray[i] == sku) {
                //Remove SKU from Compare cookie
                _cookieValueArray.splice(i, 1)
            }
        }
        if (_cookieValueArray.length > 0) {
            //Rebuild _cookieValue String
            _cookieValue = _cookieValueArray.join("|");
            //Set Compare cookie to adjusted value
            setCookie(_cookieName, _cookieValue, null);
            if (!checkbox) {
                redirect();
            }
        }
        else {
            //Delete cookie
            setCookie(_cookieName, _cookieValue, -1000);
            if (!checkbox) {
                redirect();
            }
        }
    }

    function replaceOldest() {
        if (_cookieValueArray.length > 0) {
            //Remove oldest SKU from Compare cookie
            _cookieValueArray.splice(0, 1)
            //Rebuild _cookieValue String
            _cookieValue = _cookieValueArray.join("|");
            //Set Compare cookie to adjusted value
            setCookie(_cookieName, _cookieValue, null);
        }
        else {
            //Delete cookie
            setCookie(_cookieName, _cookieValue, -1000);
            if (!checkbox) {
                redirect();
            }
        }
    }

    function removeAll() {
        //Delete cookie
        setCookie(_cookieName, _cookieValue, -1000);
        redirect();
    }

    function toggle() {
        //Add/Remove SKU to/from compare cookie
        if (_cookieValue !== "" && _cookieValue !== null) {
            if (checkbox) {
                if (!checkbox.checked) {
                    remove();
                }
                else {
                    add();
                }
            }
        }
        else {
            add();
        }
    }
    function redirect() {
        var dan = window.location
        var path = "/compare";
        window.location = path;
    }

    function verify() {
        for (x in _cookieValueArray) {
            if (_cookieValueArray[x] == sku) {
                checkbox.prop('checked', 'checked');
                labeltoggle(sku);
                return false;
            }
        }
    }
}



function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path=/; secure";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");

        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);

            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function checkCompareCookie(cookieName) {
    if (getCookie(cookieName)) {
        return true;
    }
    else {
        alert('Please select at least one item to compare!');
        return false;
    }
}

function removeItem(index, sku) {
    var allCooks = document.cookie.split(';');
    alert(getCookie("sresid"));

    //        var item = 'table td:nth-child(' + index + ')'
    //        $(item).remove()

}

   

function checkDiff() {
    
    if ($("#checkcompare").prop("checked")==true) {


        $(document).ready(function () {

            var table = document.getElementById('content');
            var rows = table.getElementsByTagName('tr');

            for (i = 0; i < rows.length; i++) {
                if (rows[i].className.match('attribute') != null) {

                    var row = rows[i];
                    var values = new Array();
                    var cols = row.getElementsByTagName('td');

                    for (x = 0; x < cols.length; x++) {
                        if (cols[x].className.match('item') != null) {
                            if (navigator.userAgent.indexOf('MSIE') != -1) {
                                values.push(cols[x].innerText);
                            } else {
                                values.push(cols[x].innerHTML);
                            }
                            
                        }
                    }

                    var baseVal = values[0];

                    for (x in values) {
                        if (baseVal != values[x]) {
                            row.className = 'attribute active';
                        }
                    }
                }
            }
        });                
    } else {

        var table = document.getElementById('content');
        var     rows = table.getElementsByTagName('tr');

        for (i = 0; i < rows.length; i++) {
            if (rows[i].className.match('attribute active') != null) {
                rows[i].className = 'attribute';
            }
        }       
    }
}