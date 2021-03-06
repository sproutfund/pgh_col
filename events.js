var badgeUrl = 'https://chicagocityoflearning.org/badge-details?id=';

function display(programs)
{
    var items = $('<div class="ui divided items>');

    jQuery.each(programs.result, function(i, program)
    {
        var item = $('<div class="item">');

        // image
        var image = $('<div class="image">');
        var logo = $('<img>').attr('src', program.logo_url);
        image.append(logo)

        // content
        var content = $('<div class="content">');
        var header = $('<a class="header">')
            .text(program.name)
            .attr('href', program.registration_url);
        var meta = $('<div class="meta">');
        var subtitle = $('<span class="sub-title">').text(program.start_date);
        meta.append(subtitle);
        var description = $('<div class="content">');
        var p = $('<p>').text(program.description);
        description.append(p);

        // extra
        var extra = $('<div class="extra">').text('Badges: ');
        jQuery.each(program.badges, function(i, badge)
        {
            var badge = $('<a class="ui label">')
                .attr('href', badgeUrl + badge.badge.id)
                .text(badge.badge.name);
            extra.append(badge);
        });

        // tie it together
        content.append(header);
        content.append(meta);
        content.append(description);
        content.append(extra);

        item.append(image, content);
        items.append(item);
    });
}

function log_error(a,b,c,d)
{
    console.log(a,b,c,d);
}

$(document).ready(function()
{
    jQuery.ajax(
        { url: './scheduled_programs.json'
        , dataType: 'json'
        , success: display
        , error: log_error
         }
    );
});
