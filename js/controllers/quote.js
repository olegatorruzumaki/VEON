let veonModule = angular.module("veon");

veonModule.controller("quote", function() {
    let ctrl = this;

    ctrl.quoteList = [];
    ctrl.showError = false;

    ctrl.quoteCurrent = '';

    ctrl.checkChanges = function() {
        ctrl.quoteBar = ctrl.quoteList.length;
        ctrl.showError = ctrl.quoteList.length > 9;
    };

    ctrl.loadQuotes = function() {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'quotes.json', false);
        xhr.send();

        if (xhr.status !== 200) {
            alert('Error ' + xhr.status + ': ' + xhr.statusText);
        } else {
            ctrl.quoteList = JSON.parse(xhr.responseText);
        }

        ctrl.checkChanges();
    };

    ctrl.loadQuotes();

    ctrl.updateRequest = function() {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'saveJson.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(ctrl.quoteList));
    };

    ctrl.sendQuote = function() {
        if (ctrl.quoteList.length < 10) {
            ctrl.showError = false;
            ctrl.quoteList.push({text: ctrl.quoteCurrent});
            ctrl.quoteCurrent = '';

            ctrl.updateRequest();
        }
        else {
            ctrl.showError = true;
        }

        ctrl.checkChanges();
    };

    ctrl.deleteQuote = function (item) {
        let index = ctrl.quoteList.indexOf(item);
        ctrl.quoteList.splice(index, 1);
        
        ctrl.updateRequest();

        ctrl.checkChanges();
    }
});