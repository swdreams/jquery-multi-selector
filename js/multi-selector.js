const MultiSelector = function () {
    return {
        init() {
            $('.ms-number i.oi-plus').click(e => {
                this.handleClick();
            });
        },
        handleClick() {
            alert('Please implement here....');
        },
    }
}();

$(document).ready(function () {
    MultiSelector.init();
});

