var addressLookup = function(event) {

    var input = $("input[name='search']"),
        searchValue = input.val().trim();

    if(!searchValue){
        $('.message').text('You need to search for a postcode or street name');
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    $('#address-selector').hide();
    $('#addresses').empty();
    $('.message').empty();

    $.ajax({
          type: 'GET',
          url: '/address-search?q='+searchValue+'&q.options={fields:["postcode","street"]}&sort=street asc',
          contentType: 'application/json',
          success: function(data) {
                renderAddresses(data);
                $('#address-selector').show();
                $('.address-link').click(stuffAddressInPage);
          },
          error: function(xhr, options, error) {
            console.log(error);
            $('#addresses').empty();
            $('.message').text('No results');
        }
    });
};

var stuffAddressInPage = function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#selected-address').text('');
    var template = $.templates("#selected-address-template"),
        data = $(event.currentTarget).data(),
        html = template.render({
            'address': event.currentTarget.text,
            'addressId': data.addressId
        });
    $('#selected-address').append(html);
    $('#address-selector').hide();
    $('#addresses').empty();
};

var renderAddresses = function(addresses) {
    $.each(addresses.hits.hit, function(index, address) {
        var template = $.templates("#address-template"),
            html = template.render({
                'address': address.fields.address,
                'property': address.fields.property,
                'street': address.fields.street,
                'town': address.fields.town,
                'postcode': address.fields.postcode
            });
        $('#addresses').append(html);
    });
};


$(document).ready(function(){
    $('#address-lookup').click(addressLookup);
});
