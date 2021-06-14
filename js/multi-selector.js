let sourceList = ["item-x-z", "item2", "item3-m-z"];
let targetList = [];
const MultiSelector = function () {
    return {
        init() {
            $('#number').val(sourceList.join(', '));
            $('.ms-number i.oi-plus').click(e => {
                this.handleClick();
            });
            $( "#sortable1, #sortable2" ).sortable({
                connectWith: ".connectedSortable"
            }).disableSelection();
            $('#right-move').click(e => {
                this.handleRightMoveClick();
            })
            $('#left-move').click(e => {
                this.handleLeftMoveClick();
            })
            $('.btn-move-stock').click(e => {
                this.moveStock();
            })
            $('#filter-input').on('input', () => {
                this.filter();
            })
        },
        handleClick() {
            sourceList = $('#number').val().split(', ');
            var sourceString = $.map(sourceList, function(source) {
                return `<li class="ui-state-default" id=${source}>${source}</li>`
            }).join('')
            $('#sortable1').html(sourceString)
        },
        handleRightMoveClick() {
            $("#sortable1 > li").each(function () {
                if($(this).is(":visible")) {
                    targetList.push($(this).attr('id'));
                    var index = sourceList.indexOf($(this).attr('id'));
                    if (index > -1) {
                        sourceList.splice(index, 1);
                    }
                }
            })
            $('#filter-input').val('');
            var sourceString = $.map(sourceList, function(source) {
                return `<li class="ui-state-default" id=${source}>${source}</li>`
            }).join('')
            $('#sortable1').html(sourceString)
            var targetString = $.map(targetList, function(target) {
                return `<li class="ui-state-default" id=${target}>${target}</li>`
            }).join('')
            $('#sortable2').html(targetString)
        },
        handleLeftMoveClick() {
            while(targetList.length)
            {
                var target = targetList.pop();
                sourceList.push(target);
            }
            $('#filter-input').val('');
            var sourceString = $.map(sourceList, function(source) {
                return `<li class="ui-state-default" id=${source}>${source}</li>`
            }).join('')
            $('#sortable1').html(sourceString)
            var targetString = $.map(targetList, function(target) {
                return `<li class="ui-state-default" id=${target}>${target}</li>`
            }).join('')
            $('#sortable2').html(targetString)
        },
        moveStock() {
            var sortedIDs = $( "#sortable2" ).sortable( "toArray" );
            $('#number').val(sortedIDs.join(', '));
            $('#sortable2').html('')
            $('#dlg-sr-move-stock').modal('hide');
        },
        filter() {
            var value = $('#filter-input').val();
    
            $("#sortable1 > li").each(function() {
                if ($(this).text().search(value) > -1) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        }
    }
}();

$(document).ready(function () {
    MultiSelector.init();
});

