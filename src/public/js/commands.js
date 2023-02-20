$('.categories li').on('click', setCategory); //Event Listener

function setCategory() {
    blank();
    $('.categories li').removeClass('active');

    const selected = $(this);
    selected.addClass('active');

    const categoryCommands = $(`.commands .${selected[0]}.id`);
    categoryCommands.show();

    //updateResultText(categoryCommands);
}

function blank() {
    $('.categories li').removeClass('Active');
    $('.commands li').hide();
}

$('#search + button').on('click', ()=>{
    const query = $('#search input').val();
    console.log(query);
    if(!query.trim()){
        updateResultText(commandz);
        return $('.commands li').show();
    }

    const results = new Fuse(commandz, {
        isCaseSensitive: false,
        keys: [
            {name: 'name', weight:1},
            {name: 'category', weight: 0.5}
        ]
    })
    .search(query)
    .map(r=>r.item)

    blank()

    console.log(results);

    for(const command of results)
        $(`#${command.name}Command`).show();

        updateResultText(results);
})

function updateResultText(arr) {

    $('#commandError').text(
        (arr.length <=0)
        ? 'There is nothing to see here.'
        : '');
    
}


    setCategory.bind($('.categories li')[0])()

/*
const - don't want to change the value of the variable
var
let
*/