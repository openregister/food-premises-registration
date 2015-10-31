var companyLookup = function(event) {

    var input = $("input[name='company-lookup']"),
        searchValue = input.val().trim();

    if(searchValue.length < 3){
        console.log('do nothing');
        $('#company-selector').hide();
        $('#companies').empty();
        return;
    }

    if(!searchValue){
        $('.message').text('You need to enter at least part of a company name');
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    $('#company-selector').hide();
    $('#companies').empty();
    $('.message').empty();

    $.ajax({
          type: 'GET',
          url: '/company-search?q='+searchValue,
          contentType: 'application/json',
          success: function(data) {
            $('#companies').empty();
            renderCompanies(data['companies']);
            $('#company-selector').show();
          },
          error: function(xhr, options, error) {
            console.log(error);
            $('#companies').empty();
            $('.message').text('No results');
        }
    });
};

var renderCompanies = function(companies) {
    $.each(companies, function(index, company) {
        debugger;
        var template = $.templates("#company-template"),
            html = template.render({
                'companyName': company.title,
                'companyNo': company.company_number,
                'address': company.snippet
            });
        $('#companies').append(html);
    });
};


$(document).ready(function(){
    $('#company-lookup').keyup(companyLookup);
});
